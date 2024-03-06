import CredentialsProvider from "next-auth/providers/credentials";
import nextAuth from "next-auth";
import axios from "axios";

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.API_BASE_URL}/api/auth/login`,
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const user = response.data;

          if (user.status === "success") {
            console.log("user>>>", user);
            const userData = user.data;
            return userData;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error while logging in:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
