import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI || "";

export async function connectToDB() {
    try {
        await mongoose.default.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
    }
}
