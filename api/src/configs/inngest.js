import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../models/user.model.js";

export const inngest = new Inngest({ id: "lio-ecommerce" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user-created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}` || "User",
      imageUrl: event.data.image_url,
      addresses: [],
      wishlist: [],
    };

    await User.create(newUser);
  }
);

export const functions = [syncUser];
