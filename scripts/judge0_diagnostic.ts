
import axios from "axios";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "judge0_diagnostic_log.txt");

const log = (msg: string | object) => {
    const message = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : String(msg);
    console.log(message);
    try {
        fs.appendFileSync(LOG_FILE, message + "\n");
    } catch (e) { }
};

async function testEndpoint(baseUrl: string) {
    log(`\n--- Testing ${baseUrl} ---`);

    // 1. Test /about
    try {
        log(`GET ${baseUrl}/about`);
        const res = await axios.get(`${baseUrl}/about`);
        log(`✅ Success: ${JSON.stringify(res.data)}`);
    } catch (e: any) {
        log(`❌ Failed /about: ${e.message} ${e.response?.status}`);
    }

    // 2. Test /languages
    try {
        log(`GET ${baseUrl}/languages`);
        const res = await axios.get(`${baseUrl}/languages`);
        log(`✅ Success: Found ${res.data.length} languages.`);
        // log(`Sample: ${JSON.stringify(res.data.slice(0, 3))}`);
    } catch (e: any) {
        log(`❌ Failed /languages: ${e.message} ${e.response?.status}`);
    }

    // 3. Test Submission
    try {
        log(`POST ${baseUrl}/submissions (Single)`);
        const payload = {
            source_code: "print('hello')",
            language_id: 71, // Python
            stdin: ""
        };
        const res = await axios.post(`${baseUrl}/submissions?wait=true`, payload);
        log(`✅ Success: ${JSON.stringify(res.data)}`);
    } catch (e: any) {
        log(`❌ Failed /submissions: ${e.message} ${e.response?.status}`);
        if (e.response?.data) log(`Response Data: ${JSON.stringify(e.response.data)}`);
    }
}

async function run() {
    fs.writeFileSync(LOG_FILE, "Starting Diagnostic...\n");

    await testEndpoint("https://ce.judge0.com");
    await testEndpoint("https://extra-ce.judge0.com");
}

run();
