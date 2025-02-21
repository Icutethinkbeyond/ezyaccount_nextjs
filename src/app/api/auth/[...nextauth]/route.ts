import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare, hash } from "bcryptjs";
import { PrismaClient, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

// ขยายประเภท User ใน NextAuth
declare module "next-auth" {
  interface User {
    customerId?: string;
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
            userPassword: true,
            userEmail: true,
            userId: true,
            role: { select: { name: true } },
            profile: { select: { profileName: true, profileSurname: true } },
            customerId: true,
          },
          where: {
            userEmail: email,
            userStatus: UserStatus.Active,
          },
        });

        if (!user || !user.userPassword) {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }

        const isPasswordValid = await compare(password, user.userPassword);
        if (isPasswordValid) {
          return {
            id: user.userId.toString(),
            email: user.userEmail,
            role: user.role?.name,
            name: user.profile?.profileName,
            customerId: user.customerId?.toString(),
          };
        } else {
          throw new Error("โปรดตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { userEmail: user.email! },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              userEmail: user.email!,
              userPassword: await hash(Math.random().toString(36).slice(-8), 10),
              userStatus: UserStatus.Active,
              role: { connect: { name: "User" } },
              profile: {
                create: {
                  profileName: user.name?.split(" ")[0] || "",
                  profileSurname: user.name?.split(" ")[1] || "",
                },
              },
              customerId: user.email!,  
            },
            include: { role: true, profile: true },
          });

          user.id = newUser.userId.toString();
          user.customerId = newUser.customerId || ""; 
        } else {
          user.id = existingUser.userId.toString();
          user.customerId = existingUser.customerId || ""; 
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
        token.name = user.name;
        token.customerId = (user as { customerId?: string }).customerId || ""; 
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
          name: token.name,
          customerId: token.customerId, 
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
