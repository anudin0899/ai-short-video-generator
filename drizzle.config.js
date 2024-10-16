import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./config/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL   
  }
});