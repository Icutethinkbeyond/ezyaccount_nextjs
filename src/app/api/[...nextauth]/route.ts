import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
// import client from "@/../../lib/mongoClient";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60 // 1 hours
  },
  pages: {
    signIn: "/auth/sign-in"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usereEmail: {},
        userPassword: {},
      },
      

      async authorize(credentials) {

        const { usereEmail, userPassword } = credentials ?? {};

        if (!usereEmail || !userPassword) {
          throw new Error("โปรดกรอกอีเมลและรหัสผ่าน");
        }

        // const _client = await client;
        // const usersCollection = client.db().collection("User");
        // const user = await usersCollection.findOne({ email });

        // let user = await prisma.user.findFirst({
        //   select: {
        //     password: true, // เลือก password
        //     email: true,
        //     userId: true,
        //     name: true,
        //     roles: {
        //       select: {
        //         name: true,
        //       },
        //     },
        //   }, where: {
        //     email: {
        //       equals: email
        //     }
        //   },

        // })

        // if (!user) {
        //   throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        // }

        // const isPasswordValid = await compare(
        //   password,
        //   user.password
        // )

        // if (user && isPasswordValid) {
        //   // return user;
        //   return {
        //     email: user.email,
        //     role: user.roles?.name,
        //     id: user.userId.toString(),
        //     name: user.name,
        //     url: '/protected/dashboard'
        //   }
        // } else {
        //   throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        // }

        return null;
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

