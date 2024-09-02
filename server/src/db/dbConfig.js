import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

export async function connect() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGO_URI environment variable is not set');
        }
        
        await mongoose.connect(uri);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
  
    }
}



