import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
const client_id = "756223324932-bmlh9g1va0hosvgul73kdc9r8s08htvv.apps.googleusercontent.com"
const client_secret = "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"

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        })
      ]
})