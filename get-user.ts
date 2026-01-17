
import db from "./lib/db"

async function main() {
    const user = await db.user.findFirst()
    console.log("User ID:", user?.id)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await db.$disconnect())
