import { RequestHandler } from "express";
import {
    errBadRequest,
    errInternalServer,
    errNotFound,
    successRes,
  } from "../utils";
import {RescheduleHistory, ClassSession, Class} from "../models";
import { ValidationError} from "sequelize";

export const createRescheduleHistory: RequestHandler = async (req, res, next) => {
    try{
        const{class_session_id, class_id, schedule} = req.body; 
        const classSessionData = await ClassSession.findByPk(class_session_id); 
        const classData = await Class.findByPk(class_id); 

        if(!classSessionData)
            return errNotFound(next, `Class Session with id ${class_session_id} not found`);
        if(!classData)
            return errNotFound(next, `Class with id ${class_id} not found`); 
        
        const data = await RescheduleHistory.create({
            schedule, 
            class_session_id, 
            class_id, 
        });

        return successRes(res, {
            id: data.id, 
            schedule: data.schedule, 
            class_session_id: data.class_session_id,
            class_id: data.class_id
        });
    }
    catch (err:any){
        if((err.name = "SequelizeValidationError")){
            const errors = err.errors?.map((error: ValidationError) => error.message);
            return errBadRequest(next, errors);
        }
        return errInternalServer(next);
    }
};

export const getRescheduleHistory: RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params; 
        const data = await RescheduleHistory.findOne({
            where:{
                id, 
            },
            attributes:{
                exclude:["createdAt", "updatedAt", "deleteAt"], 
                include:["approved"],
            },
        });
        if(!data)
            return errNotFound(next, `Reschedule History with id ${id} not found!`);
        return successRes(res, data);
    }
    catch (err:any){
        return errInternalServer(next);
    }
};

export const editRescheduleHistory: RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const RescheduleHistoryExist = await RescheduleHistory.findByPk(id); 
        
        if(!RescheduleHistoryExist)
            return errNotFound(next, `Reschedule History with id ${id} not found!`); 
        
        const {schedule, approved} = req.body;
        const data = await RescheduleHistory.update(
            {
                schedule, 
                approved,           
            },
            {
                where:{
                    id,
                },
            }
        );

        if(!data[0])
            return errBadRequest(next, `Failed to update Reschedule History with id ${id}`);
        return successRes(res, `Reschedule History Updated!`); 
    }
    catch (err:any){
        if((err.name = "SequelizeValidationError")){
            const error = err.errors?.map((error: ValidationError) =>error.message);
            return errBadRequest(next, error);
        }
        return errInternalServer(next);
    }
};

export const deleteRescheduleHistory: RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const rescheduleHistory = await RescheduleHistory.destroy({
            where:{
                id,
            }
        });

        if(!rescheduleHistory)
            return errNotFound(next, `Reschedule History with id ${id} not found!`); 
        return successRes(res, `Reschedule History with id ${id} successfully deleted!`); 
    }
    catch (err:any){
        return errInternalServer(next);
    }
};