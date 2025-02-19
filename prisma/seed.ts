import { PrismaClient, RoleName, UserStatus } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

  const createDeveloperUser = async (roleId: string) => {
    let developerUserAlready = await prisma.user.findFirst({
      where: { role: { name: RoleName.Developer } }
    })

    if (!developerUserAlready) {
      const password = await hash('12345678', 12)

      await prisma.user.create({
        data: {
          userEmail: 'test@mail.com',
          userPassword: password,
          username: 'developerUser', 
          roleId: roleId,
          userStatus: UserStatus.Active
        }
      })
    }
  }

  let developerRoleAlready = await prisma.role.findFirst({ where: { name: { equals: 'Developer' } } })

  if (!developerRoleAlready) {
    let roleData = await prisma.role.create({
      data: {
        name: "Developer",
        description: 'สามารถเข้าใช้งานทุกโมดูลในระบบ',
      }
    })

    
    await createDeveloperUser(roleData.roleId)
  } else {
    console.log('Developer Role is already')

    
    await createDeveloperUser(developerRoleAlready.roleId)
  }

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
