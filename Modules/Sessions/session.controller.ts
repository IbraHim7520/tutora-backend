import { Request, Response } from "express";
import { sessionService } from "./session.service";

const sessionPostControle = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = req.user;

    const fromTime = new Date(`${data.Date}T${data.FromTime}:00`);
    const toTime = new Date(`${data.Date}T${data.ToTime}:00`);

    const sessionData = {
      name: data.SessionName,
      category: data.Category,

      date: new Date(data.Date),
      fromTime: fromTime,
      toTime: toTime,

      teacherEmail: user?.email as string,
      maxStudent: Number(data.MaxStudents),
      image: data.Image,
      description: data.Description,
      teacherId: user?.id as string,
    };

    const result = await sessionService.sessionPost(sessionData);

    return res.status(200).json({
      success: true,
      message: "Session submitted successfully.",
      response: result,
    });
  } catch (error) {
    console.error("Session create error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

const getAllSessionControl = async(req:Request , res:Response)=>{
  try {
    const teacherid = req.user?.id as string;
    if(!teacherid) return res.status(404).send({success: false , message: "You're Unauthorized"});

    const resData = await sessionService.getAllSessions(teacherid)
    return res.status(200).send({
      success : true,
      data: resData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : error,
    });
  }
}

const allAdminSessionControll = async(req:Request , res:Response)=>{
  try {
    const result = await sessionService.allSessionsForAdmin()

    return res.status(200).send({
      success : true,
      data: result || []
    })
  } catch (error) {
      return res.status(500).send({
      success : false,
      message: "Internal Error!",
      data: error
    })
  }
}
export const sessionController = {
  sessionPostControle,
  getAllSessionControl,
  allAdminSessionControll

};
