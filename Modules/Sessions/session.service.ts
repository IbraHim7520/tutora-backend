import { prisma } from "../../lib/prisma";
interface IsessionData  {
            name: string,
            category : string,
            date: Date,
            fromTime: Date,
            toTime: Date,
            teacherEmail: string,
            maxStudent: number,
            image: string,
            description: string,
            teacherId: string
}
const sessionPost = async(payload:IsessionData)=>{
    try {
        const Postresponse = await prisma.teachingsessions.create({
            data: payload
        })
        
        return Postresponse;
    } catch (error) {
        return Promise.reject(error);
    }
}

const getAllSessions = async(teacherId: string)=>{
    try {
        return await prisma.teachingsessions.findMany({
            where: {
                teacherId: teacherId
            }
        })
    } catch (error) {
        return error
    }
}


const allSessionsForAdmin = async()=>{
    try {
        return await prisma.teachingsessions.findMany();
    } catch (error) {
        return error
    }
}

export const sessionService = {
sessionPost,
getAllSessions,
allSessionsForAdmin
}