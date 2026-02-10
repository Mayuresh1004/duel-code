
import axios from "axios";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "judge0_languages.json");

async function fetchLanguages() {
    try {
        const res = await axios.get("https://ce.judge0.com/languages");
        fs.writeFileSync(LOG_FILE, JSON.stringify(res.data, null, 2));
        console.log("Languages saved to " + LOG_FILE);
    } catch (e: any) {
        console.error("Failed to fetch languages:", e.message);
    }
}

fetchLanguages();
