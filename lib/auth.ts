import { createNewUser, getUser } from "@/lib/data-services";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: unknown }) {
      return !!auth;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);

        if (!existingUser)
          await createNewUser({ name: user.name, email: user.email });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const user = await getUser(session.user.email);
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
