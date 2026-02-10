import axios from "axios"
export function getJudge0LanguageId(language: string | number) {
  if (typeof language === "number") {
    return language;
  }

  // Language IDs for https://ce.judge0.com
  const languageMap: Record<string, number> = {
    PYTHON: 71, // Python (3.8.1) - Available
    JAVASCRIPT: 63, // JavaScript (Node.js 12.14.0) - Available. (Also 93 for 18.15.0, 102 for 22.08.0)
    JAVA: 62, // Java (OpenJDK 13.0.1) - Available. (Also 91 for JDK 17.0.6)
    CPP: 54, // C++ (GCC 9.2.0) - Available. (Also 105 for GCC 14.1.0)
    GOLANG: 60, // Go (1.13.5) - Available. (Also 107 for 1.23.5)
  };

  const key = language.trim().toUpperCase();
  const id = languageMap[key];

  if (!id) {
    throw new Error(`Unsupported language: ${language}`);
  }

  return id;
}

/**
 * Gets the correct placeholder comment for driver code replacement based on language
 */
export function getDriverCodePlaceholder(language: string | number): string {
  let languageKey: string;

  if (typeof language === "number") {
    const languageIdMap: Record<number, string> = {
      71: 'PYTHON',
      92: 'PYTHON',
      100: 'PYTHON',
      63: 'JAVASCRIPT',
      93: 'JAVASCRIPT',
      102: 'JAVASCRIPT',
      62: 'JAVA',
      91: 'JAVA',
      54: 'CPP',
      105: 'CPP',
      60: 'GOLANG',
      95: 'GOLANG',
      106: 'GOLANG',
    };
    languageKey = languageIdMap[language] || '';
  } else {
    languageKey = language.trim().toUpperCase();
  }

  // Python uses # for comments, others use //
  if (languageKey === 'PYTHON') {
    return '# @USER_CODE';
  }

  // Default to // for JavaScript, Java, C++, Go
  return '// @USER_CODE';
}

/**
 * Replaces the user code placeholder in driver code with actual user code
 * Handles both // @USER_CODE and # @USER_CODE placeholders for flexibility
 * Also handles variations with/without spaces
 */
export function replaceUserCodeInDriver(driverCode: string, userCode: string, language: string | number): string {
  if (!driverCode) {
    return userCode; // No driver code, return user code as-is
  }

  const placeholder = getDriverCodePlaceholder(language);

  // Try the language-specific placeholder first (exact match)
  if (driverCode.includes(placeholder)) {
    return driverCode.replace(placeholder, userCode);
  }

  // Try variations with different spacing and formatting
  const variations = [
    placeholder,
    placeholder.replace(' ', '  '), // double space
    placeholder.replace(' ', ''),  // no space
    placeholder.replace('@USER_CODE', '@USER_CODE '), // trailing space
    placeholder.replace('@USER_CODE', ' @USER_CODE'), // leading space
    placeholder.replace('@USER_CODE', '@USER_CODE\n'), // newline after
    placeholder.replace('@USER_CODE', '\n@USER_CODE'), // newline before
  ];

  for (const variant of variations) {
    if (driverCode.includes(variant)) {
      return driverCode.replace(variant, userCode);
    }
  }

  // Fallback: try both comment styles in case the driver code uses a different one
  const alternativePlaceholder = placeholder === '// @USER_CODE' ? '# @USER_CODE' : '// @USER_CODE';
  if (driverCode.includes(alternativePlaceholder)) {
    return driverCode.replace(alternativePlaceholder, userCode);
  }

  // Try alternative with variations
  const altVariations = [
    alternativePlaceholder,
    alternativePlaceholder.replace(' ', '  '),
    alternativePlaceholder.replace(' ', ''),
    alternativePlaceholder.replace('@USER_CODE', '@USER_CODE '),
    alternativePlaceholder.replace('@USER_CODE', ' @USER_CODE'),
  ];

  for (const variant of altVariations) {
    if (driverCode.includes(variant)) {
      return driverCode.replace(variant, userCode);
    }
  }

  // If no placeholder found, this is likely a configuration issue
  // Log a warning and return user code directly (safer than returning driver code without user code)
  console.warn(`No placeholder found in driver code for language ${language}. Placeholder expected: ${placeholder}. Using user code directly.`);
  return userCode;
}



export async function submitBatch(submissions: any) {
  try {
    console.log(`[submitBatch] Submitting ${submissions.length} submissions to Judge0`);
    console.log(`[submitBatch] Sample submission:`, {
      language_id: submissions[0]?.language_id,
      source_code_length: submissions[0]?.source_code?.length,
      stdin: submissions[0]?.stdin,
      has_source_code: !!submissions[0]?.source_code
    });

    // Validate submissions before sending
    for (let i = 0; i < submissions.length; i++) {
      const sub = submissions[i];
      if (!sub.source_code || sub.source_code.trim().length === 0) {
        throw new Error(`Submission ${i + 1}: source_code cannot be empty`);
      }
      if (sub.language_id === undefined || sub.language_id === null) {
        throw new Error(`Submission ${i + 1}: language_id is required`);
      }
    }

    const apiUrl = process.env.JUDGE0_API_URL;
    console.log(`[submitBatch] Using Judge0 API URL: ${apiUrl}`);

    if (!apiUrl) {
      console.error("[submitBatch] JUDGE0_API_URL is not defined in environment variables!");
    } else if (apiUrl.includes("localhost") || apiUrl.includes("127.0.0.1")) {
      console.warn("[submitBatch] WARNING: Using localhost for Judge0 API. Ensure Judge0 is running locally.");
    }

    const encodeB64 = (val: unknown) =>
      Buffer.from(String(val ?? ""), "utf8").toString("base64");

    const submitSingle = async (sub: any) => {
      const res = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false`,
        {
          language_id: sub.language_id,
          source_code: encodeB64(sub.source_code),
          stdin: sub.stdin ? encodeB64(sub.stdin) : undefined,
          expected_output: sub.expected_output ? encodeB64(sub.expected_output) : undefined,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    };

    const postBatch = async (base64Encoded: boolean, payload: any) => {
      return await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=${base64Encoded ? "true" : "false"}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    };

    const toBase64Submissions = (subs: any[]) =>
      subs.map((s) => ({
        ...s,
        source_code: encodeB64(s.source_code),
        stdin: s.stdin !== undefined ? encodeB64(s.stdin) : undefined,
        expected_output: s.expected_output !== undefined ? encodeB64(s.expected_output) : undefined,
      }));

    let data: any;
    try {
      const res = await postBatch(false, { submissions });
      data = res.data;
    } catch (error: any) {
      const message = String(error?.response?.data?.error || error?.response?.data?.message || error?.message || "");
      const isAuthError = error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404 || error.response?.status === 422;

      if (isAuthError) {
        console.log(`[submitBatch] Falling back to parallel single submissions due to error ${error.response?.status}`);
        try {
          const results = await Promise.all(submissions.map(submitSingle));
          return results.map((r: any) => ({ token: r.token }));
        } catch (singleError: any) {
          console.error("[submitBatch] Single submission fallback failed:", singleError.message);
          // If single also fails, throw original or single error. 
          // Throwing single error is better as it is the final attempt.
          throw singleError;
        }
      }

      // Judge0 returns this when any field can't be converted to UTF-8.
      const shouldRetryBase64 = message.toLowerCase().includes("utf-8") || message.toLowerCase().includes("base64_encoded=true");

      if (!shouldRetryBase64) throw error;

      console.warn("[submitBatch] UTF-8 conversion error; retrying with base64_encoded=true");
      const res = await postBatch(true, { submissions: toBase64Submissions(submissions) });
      data = res.data;
    }

    console.log("Batch submission response: ", data);

    // Judge0 batch endpoint returns an array directly, not wrapped in an object
    // Handle both formats for compatibility
    if (Array.isArray(data)) {
      return data;
    } else if (data.submissions && Array.isArray(data.submissions)) {
      return data.submissions;
    } else if (data.submission && Array.isArray(data.submission)) {
      return data.submission;
    }

    return data;
  } catch (error: any) {
    console.error("[submitBatch] Error submitting to Judge0:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });

    // Re-throw with more context
    throw new Error(
      `Judge0 API error: ${error.response?.status || 'Unknown'} - ${error.response?.data?.error || error.response?.data?.message || error.message
      }`
    );
  }
}

export async function pollBatchResults(tokens: any) {
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds timeout
  let useBase64 = false;

  while (attempts < maxAttempts) {
    try {
      const { data }: any = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: useBase64
          }
        }
      )

      const results = data.submissions || [];

      if (results.length === 0) {
        console.warn(`[pollBatchResults] No results returned for tokens: ${tokens.join(",")}`);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      const isAllDone = results.every(
        (r: any) => r.status && r.status.id !== 1 && r.status.id !== 2
      );

      if (isAllDone) {
        console.log(`[pollBatchResults] All submissions completed after ${attempts} attempts`);

        if (useBase64) {
          const decode = (str: string | null) => str ? Buffer.from(str, 'base64').toString('utf-8') : null;
          return results.map((r: any) => ({
            ...r,
            stdout: decode(r.stdout),
            stderr: decode(r.stderr),
            compile_output: decode(r.compile_output),
            message: decode(r.message),
          }));
        }

        return results;
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
      const msg = String(error?.response?.data?.error || error?.response?.data?.message || error?.message || "");
      const shouldRetryBase64 = !useBase64 && (msg.toLowerCase().includes("utf-8") || msg.toLowerCase().includes("base64_encoded=true"));
      if (shouldRetryBase64) {
        console.warn("[pollBatchResults] UTF-8 conversion error; retrying with base64_encoded=true");
        useBase64 = true;
        // don't count this as an attempt; retry immediately
        continue;
      }
      console.error("[pollBatchResults] Error polling results:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(
        `Failed to poll Judge0 results: ${error.response?.data?.error || error.message}`
      );
    }
  }

  throw new Error("Timeout waiting for Judge0 results");
}