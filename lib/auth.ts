import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch("http://localhost:8080/api/user/refresh-token", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  console.log("refreshed");

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.message);
  }

  // console.log("refreshToken function resposne", {
  //   ...token,
  //   backendTokens: response,
  // });

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.BACKEND_URL}/user/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("there's a user");
        // console.log("if user return", { ...token, ...user });
        return { ...token, ...user };
      }

      console.log(new Date().getTime());
      console.log(token.backendTokens.expiresAt * 1000); // from unix timestamp to milliseconds
      if (new Date().getTime() < token.backendTokens.expiresAt * 1000) {
        console.log("token not expired");
        return token;
      }

      console.log("token expired");
      return await refreshToken(token);
    },

    async session({ session, token, user }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
};
