import { dbConnect } from "@/configs/database";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      console.log("Connected to database");

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({ name: user.name, email: user.email });
      }

      return true;
    },
    async session({ session, user }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
