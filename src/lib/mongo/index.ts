import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

export default async function connectToDB() {
    try {
        await mongoose.connect(mongoURI || "");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
}
