
import dotenv from "dotenv";
import path from "path";

console.log("Current working directory:", process.cwd());
const result = dotenv.config();
console.log("Dotenv config result:", result);
console.log("JUDGE0_API_URL:", process.env.JUDGE0_API_URL);
