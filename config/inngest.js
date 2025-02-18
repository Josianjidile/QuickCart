import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data to the database
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk"
    },
    {
        event: "clerk/user.created"
    },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;

            const userData = {
                _id: id,
                email: email_addresses[0]?.email_address, 
                name: `${first_name} ${last_name}`,
                ImageUrl: image_url
            };

            await connectDB();
            await User.create(userData);
        } catch (error) {
            console.error("Error syncing user creation:", error);
        }
    }
);

// Inngest function to update user data in the database
export const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk"
    },
    {
        event: "clerk/user.updated"
    },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;

            const userData = {
                email: email_addresses[0]?.email_address,
                name: `${first_name} ${last_name}`,
                ImageUrl: image_url
            };

            await connectDB();
            await User.findByIdAndUpdate(id, userData);
        } catch (error) {
            console.error("Error syncing user update:", error);
        }
    }
);

// Inngest function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk"
    },
    {
        event: "clerk/user.deleted"
    },
    async ({ event }) => {
        try {
            const { id } = event.data;

            await connectDB();
            await User.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error syncing user deletion:", error);
        }
    }
);
