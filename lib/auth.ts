import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
export const auth = betterAuth({
  database: prismaAdapter(prisma , {
    provider: 'postgresql'
  }),
  user: {
    additionalFields:{
      role: {
        type: ["user", "admin", "teacher"],
        defaultValue: "user",
        required: true,
        input: false
      }
    }
  },
  emailAndPassword: { 
    enabled: true, 
  }, 
});