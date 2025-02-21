import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// User creation function
export const syncUserCreation = inngest.createFunction(
    { id: "quickcart-next-sync-user-creation", 
        batchEvents:{
            maxSize:5,
            timeout:'5s'
        }
    }, // Unique function ID
    { event: "clerk/user.created" },
    async ({ event }) => {
        try {
            await connectDB();
            const { id, first_name = "", last_name = "", email_addresses, image_url } = event.data;

            const userData = {
                _id: id,
                email: email_addresses?.[0]?.email_address || "",
                name: `${first_name} ${last_name}`.trim(),
                imageUrl: image_url || ""
            };

            await User.create(userData);
        } catch (error) {
            console.error("Error syncing user creation:", error);
            throw error;
        }
    }
);

// User update function
export const syncUserUpdation = inngest.createFunction(
    { id: "quickcart-next-sync-user-updation" }, // Unique function ID
    { event: "clerk/user.updated" },
    async ({ event }) => {
        try {
            await connectDB();
            const { id, first_name = "", last_name = "", email_addresses, image_url } = event.data;

            const userData = {
                email: email_addresses?.[0]?.email_address || "",
                name: `${first_name} ${last_name}`.trim(),
                imageUrl: image_url || ""
            };

            await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
        } catch (error) {
            console.error("Error syncing user update:", error);
            throw error;
        }
    }
);

// User deletion function
export const syncUserDeletion = inngest.createFunction(
    { id: "quickcart-next-sync-user-deletion" }, // Unique function ID
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        try {
            await connectDB();
            await User.findByIdAndDelete(event.data.id);
        } catch (error) {
            console.error("Error syncing user deletion:", error);
            throw error;
        }
    }
);


// inngest function to create users order in database

export const syncOrderCreation = inngest.createFunction(
    { id: "quickcart-next-sync-order-creation" }, // Unique function ID
    { event: "order/created" }, // Event triggered when an order is created
    async ({ event }) => {
      try {
        await connectDB();
        
        // Extract order data from event
        const { userId, items, amount, address, status = "order placed", date = Date.now() } = event.data;
  
        // Prepare the order data to be saved in the database
        const orderData = {
          userId,  // Assuming userId is a string or ObjectId
          items,  // The items array would be passed from the event
          amount,  // The total amount of the order
          address,  // The address associated with the order
          status,  // The order status (default is "order placed")
          date,  // The date the order was placed
        };
  
        // Create and save the order to the database
        await Order.create(orderData);
        
      } catch (error) {
        console.error("Error syncing order creation:", error);
        throw error;
      }
    }
  );