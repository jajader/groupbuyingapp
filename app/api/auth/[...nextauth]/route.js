import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {NextResponse} from "next/server";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return "/"
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };