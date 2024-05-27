import mongoose from 'mongoose';

// Switch off VPN when connecting to MongoDB Atlas locally
export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.info(`MongoDB connected: ${connection.host}`);

        return connection;
    } catch (e) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
    }
};