import axios from "axios"
export function getJudge0LanguageId(language: string | number) {
  // If it's already a number, trust it
  if (typeof language === "number") {
    return language;
  }

  const languageMap: Record<string, number> = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
    CPP: 54,
    GOLANG: 60,
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
      63: 'JAVASCRIPT',
      62: 'JAVA',
      54: 'CPP',
      60: 'GOLANG',
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

    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      { submissions },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

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
      `Judge0 API error: ${error.response?.status || 'Unknown'} - ${
        error.response?.data?.error || error.response?.data?.message || error.message
      }`
    );
  }
}

export async function pollBatchResults(tokens: any) {
  let attempts = 0;
  const maxAttempts = 60; // 60 seconds timeout

  while (attempts < maxAttempts) {
    try {
      const { data }: any = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false
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
        return results;
      }

      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error: any) {
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