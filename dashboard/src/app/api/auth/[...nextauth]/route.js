import OktaProvider from "next-auth/providers/okta";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      issuer: process.env.OKTA_ISSUER,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };