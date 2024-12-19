import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/refresh-token`,
      {
        method: "POST",
        headers: {
          authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      }
    );
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }
    return {
      ...token,
      backendTokens: response,
    };
  } catch (error: Error | any) {
    console.error(error.message);
    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    };
  }
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

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      const currentTimeInMilliseconds = Date.now();
      const expirationTimeInMilliseconds = token.backendTokens.expiresAt * 1000;

      if (currentTimeInMilliseconds < expirationTimeInMilliseconds) {
        return token; // return previous token
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.backendTokens = token.backendTokens;
        if (token.error) {
          session.error = token.error;
        }
      }

      return session;
    },
  },
};
