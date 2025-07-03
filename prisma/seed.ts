
import { PrismaClient} from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

    // const password = await hash('12345678', 12)

    // await prisma.user.create({
    //   data: {
    //     email: 'test@icutethink.com',
    //     password,
    //   }
    // })

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })