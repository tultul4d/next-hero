import NextAuth from "next-auth";
import CredentialsProvider from'next-auth/providers/credentials'
const handler = NextAuth({
   session: {
    strategy: 'jwt'
   },
   providers: [
      CredentialsProvider({
         credentials: {
            email: { label: "Email", type: "text", required: true, placeholder: "your email" },
            password: { label: "Password", type: "password", required: true, placeholder: "your password" },
         },
         async authorize(credentials) {
            const { email, password } = credentials;

            // Find the user by email
            const currentUser = users.find((user) => user.email === email);
            
            // Check if user exists and password matches
            if (currentUser && currentUser.password === password) {
               return currentUser; // Return user if authenticated
            }
            return null; // Return null if authentication fails
         },
      }),
   ],
  
});

const users = [
   {
      id: 1,
      name: "Hamid",
      email: "tultul@gmail.com",
      password: "password"
   },
   {
      id: 2,
      name: "Hamid",
      email: "tultuleee@gmail.com",
      password: "password"
   }
]

export {handler as GET, handler as POST}