import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            id?: string;
        };
    }
}

const handler = NextAuth({
    providers: [
        Credentials({
            id: "Credentials",
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                },
                email: {
                    label: "Email",
                    type: "email",
                }
            },
            async authorize(credentials) {
                try {

                    if (!credentials?.email || !credentials.name) {
                        return null;
                    }

                    const slatRound = await bcrypt.genSalt(10);
                    const userId = await bcrypt.hash(credentials.email, slatRound);

                    return ({
                        id: userId,
                        name: credentials.name,
                        email: credentials.email,
                    })

                } catch (err) {
                    console.log(err);
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id as string;
                session.user.email = token.email;
            }
            return session;
        },
    },
})

export { handler as GET, handler as POST };