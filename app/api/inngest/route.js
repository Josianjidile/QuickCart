import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion,syncOrderCreation } from "@/config/inngest";

// Create an API that serves Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation, // Fixed: Added the missing update function
    syncUserDeletion,
    syncOrderCreation
  ],
});
