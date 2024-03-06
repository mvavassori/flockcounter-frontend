import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
    };

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}
