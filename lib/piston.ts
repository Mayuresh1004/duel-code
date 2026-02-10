import axios from "axios";

const PISTON_API_URL = "https://emkc.org/api/v2/piston";

export function getPistonLanguage(language: string | number): string {
    if (typeof language === "string") {
        const lang = language.trim().toLowerCase();
        if (lang === "python" || lang === "python3") return "python";
        if (lang === "javascript" || lang === "js" || lang === "node") return "javascript";
        if (lang === "java") return "java";
        if (lang === "cpp" || lang === "c++") return "c++";
        if (lang === "go" || lang === "golang") return "go";
        return lang;
    }

    // Map Judge0 IDs if passed
    const idMap: Record<number, string> = {
        71: "python",
        63: "javascript",
        62: "java",
        54: "c++",
        60: "go",
    };

    const mapped = idMap[language];
    if (!mapped) {
        throw new Error(`Unsupported Piston language ID: ${language}`);
    }
    return mapped;
}

/**
 * Gets the correct placeholder comment for driver code replacement based on language
 * Copied from judge0.ts to maintain compatibility
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
 * Copied from judge0.ts to maintain compatibility
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

    console.warn(`No placeholder found in driver code for language ${language}. Placeholder expected: ${placeholder}. Using user code directly.`);
    return userCode;
}

export async function executePiston(sourceCode: string, language: string, stdin: string, args: string[] = []) {
    try {
        const response = await axios.post(`${PISTON_API_URL}/execute`, {
            language: language,
            version: "*",
            files: [
                {
                    content: sourceCode
                }
            ],
            stdin: stdin,
            args: args,
            compile_timeout: 10000,
            run_timeout: 3000,
        });

        return response.data;
    } catch (error: any) {
        console.error("Piston Execution Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to execute code on Piston");
    }
}
