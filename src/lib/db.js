import mongoose from 'mongoose';

const connectionDB = async () => {
    try {
        // Check if there is an existing connection
        if (mongoose.connection.readyState === 1) {
            return;
        }

        // Establish a new connection if there is no previous connection
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database Connected...");

        // Event listener for disconnects
        mongoose.connection.on('disconnected', () => {
            console.log("Database disconnected. Reconnecting...");
            // You might want to attempt to reconnect here.
        });

    } catch (err) {
        console.error(`${err} did not connect`);
    }
}

export default connectionDB;
