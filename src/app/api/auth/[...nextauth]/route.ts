import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
// import client from "@/../../lib/mongoClient";
import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60 // 1 hours
  },
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("โปรดกรอกอีเมลและรหัสผ่าน");
        }

        let user = await prisma.user.findFirst({
          select: {
            userPassword: true, // เลือก password
            userEmail: true,
            userId: true,
            role: {
              select: {
                name: true,
              },
            },
            profile: {
              select: {
                profileName: true,
                profileSurname: true
              }
            }
          }, where: {
            userEmail: {
              equals: email
            },
            userStatus: {
              equals: UserStatus.Active
            }
          },
        })

        console.log(user)

        if (!user || !user.userPassword) {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }

        const isPasswordValid = await compare(
          password,
          user.userPassword
        )

        if (user && isPasswordValid) {
          // return user;
          return {
            email: user.userEmail,
            role: user.role?.name,
            id: user.userId.toString(),
            name: user.profile?.profileName,
            url: '/protected/dashboard'
          }
        } else {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          email: token.email,
          name: token.name
        }
      }
    },
  },
};
// })


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

