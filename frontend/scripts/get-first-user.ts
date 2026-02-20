
import 'dotenv/config'
import { prisma } from '../lib/db'

async function main() {
    const user = await prisma.user.findFirst()
    if (user) {
        console.log(`User ID: ${user.id}`)
    } else {
        console.log('No users found')
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
