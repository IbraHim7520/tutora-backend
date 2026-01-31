import { prisma } from "../lib/prisma";

const connectDB = async() =>{
    try {
        await prisma.$connect()
        console.log("Connected to database!");
    } catch (error) {
        console.log("Error on connection!, ", error)
        await prisma.$disconnect()
        process.exit(1);        
    }
}

export default connectDB;