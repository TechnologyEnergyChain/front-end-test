import * as fs from "node:fs";
import * as path from "node:path";

export default defineEventHandler(async () => {
    const dir = path.join(process.cwd(),  "/static/gl/gl.json");
    const data = JSON.parse(await fs.promises.readFile(dir, 'utf8'))
    const randomIndex = Math.floor(Math.random() * (data.length - 0 + 1))
    return {
        word: data[randomIndex]
    }
})

// , {maxAge: getRemainingTimeInCurrentDay()}
// function getRemainingTimeInCurrentDay(): number {
//     const now = new Date();
//     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0); // Set tomorrow to midnight
//
//     return tomorrow.getTime() - now.getTime();
// }