
import { submitBatch, pollBatchResults } from "../lib/judge0";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";

dotenv.config();

const LOG_FILE = path.join(process.cwd(), "verification_log.txt");

const log = (msg: any) => {
    const message = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : String(msg);
    console.log(message);
    try {
        fs.appendFileSync(LOG_FILE, message + "\n");
    } catch (e) {
        // ignore
    }
};

const verifyJudge0 = async () => {
    try {
        fs.writeFileSync(LOG_FILE, "Starting Verification...\n");
    } catch (e) {
        console.error("Could not write to log file");
    }

    log("Verifying Judge0 Integration...");
    log(`JUDGE0_API_URL: ${process.env.JUDGE0_API_URL}`);

    const testSubmission = {
        language_id: 71, // Python
        source_code: "print('Hello Judge0')",
        stdin: "",
        expected_output: "Hello Judge0"
    };

    // Try Batch first
    try {
        log("Submitting batch...");
        const submissionTokens = await submitBatch([testSubmission]);
        log(`Submission Tokens: ${JSON.stringify(submissionTokens)}`);

        if (!submissionTokens || submissionTokens.length === 0) {
            throw new Error("No tokens received");
        }

        const tokens = submissionTokens.map((s: any) => s.token);
        log(`Polling results for tokens: ${tokens}`);

        if (tokens.length === 0) {
            throw new Error("No valid tokens extracted");
        }

        const results = await pollBatchResults(tokens);
        log(`Results: ${JSON.stringify(results, null, 2)}`);

        const firstResult = results[0];
        const stdout = firstResult.stdout ? firstResult.stdout.trim() : "";
        const statusId = firstResult.status.id;

        log(`Batch Decoded stdout: "${stdout}"`);
        log(`Batch Status ID: ${statusId} (${firstResult.status.description})`);

        const passed = statusId === 3 && stdout === "Hello Judge0";

        if (passed) {
            log("✅ Batch Verification SUCCESS!");
        } else {
            log("❌ Batch Verification FAILED.");
        }

    } catch (error: any) {
        log(`❌ Batch Verification FAILED with error: ${error.message}`);
        if (error.response) {
            log(`Batch Response Status: ${error.response.status}`);
            log(`Batch Response Data: ${JSON.stringify(error.response.data)}`);
        }

        // Try Single Submission
        try {
            log("\nAttempting single submission fallback...");
            const simpleSubmission = {
                language_id: 71,
                source_code: "print('Hello Single')",
                stdin: ""
            };

            // Use axios directly since we don't have a helper for single submission in lib/judge0 anymore (or maybe we do but I didn't check)
            const url = `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`;
            log(`Posting to: ${url}`);

            const res = await axios.post(url, simpleSubmission, {
                headers: { 'Content-Type': 'application/json' }
            });

            log(`Single Submission Result: ${JSON.stringify(res.data, null, 2)}`);

            if (res.data.stdout && res.data.stdout.trim() === "Hello Single") {
                log("✅ Single Verification SUCCESS!");
            } else {
                log("❌ Single Verification FAILED (Output mismatch or other)");
            }

        } catch (e: any) {
            log(`❌ Single Submission FAILED: ${e.message}`);
            if (e.response) {
                log(`Single Response Status: ${e.response.status}`);
                log(`Single Response Data: ${JSON.stringify(e.response.data)}`);
                log(`Single Response Headers: ${JSON.stringify(e.response.headers)}`);
            }
        }
    }
};

verifyJudge0();
