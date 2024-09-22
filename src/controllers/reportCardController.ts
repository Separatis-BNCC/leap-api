import { RequestHandler } from "express";
import {
    errBadRequest,
    errInternalServer,
    errNotFound,
    successRes,
  } from "../utils";
import {ReportCard, Credential} from "../models";
import { ValidationError} from "sequelize";


export const createReportCard: RequestHandler = async (req, res, next) => {
    try {
        const { credential_id } = req.body;
        const credentialData = await Credential.findByPk(credential_id);
        if (!credentialData)
            return errNotFound(next, `Credential with id ${credential_id} not found!`);
        const { document_url, desc } = req.body;
        const data = await ReportCard.create({
            document_url,
            desc,
            credential_id,
        });
        return successRes(res, {
            id: data.id,
            document_url: data.document_url,
            desc: data.desc,
            credential_id: data.credential_id,
        });
    }
    catch (err: any) {
        if ((err.name = "SequelizeValidationError")) {
          const errors = err.errors?.map((error: ValidationError) => error.message);
    
          return errBadRequest(next, errors);
        }
    
        return errInternalServer(next);
      }
};

export const getReportCard: RequestHandler = async (req, res, next) => {
    try{
        const {id} =req.params
        const data = await ReportCard.findOne({
            where:{
                id,
            },
            attributes:{
                exclude:["createdAt","updatedAt", "deletedAt"],
            },
        });
        if (!data)
            return errNotFound(next, `Report Card with id ${id} not found!`);
        return successRes(res, data);
    }
    catch (err: any) {
        return errInternalServer(next);
      }
};

export const editReportCard: RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const ReportCardExist = await ReportCard.findByPk(id);
        if (!ReportCardExist)
            return errNotFound(next, `Report Card with id ${id} not found!`);
        const {document_url, desc} = req.body;
        const data = await ReportCard.update(
            {
                document_url, 
                desc, 
            }, 
            {
                where:{
                    id,
                },
            }
        );

        if(!data[0])
            return errBadRequest(next, `Failed to update Report Card with the id ${id}`);
        return successRes(res, `Report Card Updated`);
    }
    catch(err:any){
        if((err.name = "SequelizeValidationError")){
            const error = err.errors?.map((error: ValidationError)=>error.message);
            return errBadRequest(next, error)
        }
        return errInternalServer(next);
    }
};

export const deleteReportCard: RequestHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const reportCard = await ReportCard.destroy({
            where:{
                id, 
            }
        });

        if(!reportCard)
            return errNotFound(next, `Report Card with id ${id} not found!`);
        return successRes(res, `Report Card with id ${id} successfully deleted!`);
    }
    catch(err:any){
        return errInternalServer(next);
    }
}