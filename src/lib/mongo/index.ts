import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage }from "multer-gridfs-storage";

const mongoURI = process.env.MONGODB_URI || "";

export async function connectToDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}