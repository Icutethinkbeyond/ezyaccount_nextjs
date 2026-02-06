import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('12345678', 12)

  await prisma.user.create({
    data: {
      userEmail: 'test@icutethink.com',
      userPassword: password,
      name: 'Admin',
      userStatus: 'Active',
    },
  })

  console.log('✅ Seed user created')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
