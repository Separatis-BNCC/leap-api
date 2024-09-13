"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface RescheduleHistoryAttributes {
    id?: number;
    schedule: Date;
    approved?: number;
    class_session_id: number;
    class_id: number;

    updatedAt?: Date;
    deletedAt?: Date;
    createdAt?: Date;
}

class RescheduleHistory
    extends Model<RescheduleHistoryAttributes>
    implements RescheduleHistoryAttributes
{
    public id?: number;
    public schedule!: Date;
    public approved!: number;
    public class_session_id!: number;
    public class_id!: number;
    public readonly updatedAt?: Date;
    public readonly createdAt?: Date;
    public readonly deletedAt?: Date;
}

RescheduleHistory.init(
    {
        schedule: {
            allowNull: false,
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: "Schedule is required!",
                },
            },
        },
        class_session_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: {
                    msg: "Class Session ID must be a number!",
                },
                notEmpty: {
                    msg: "Class Session ID is required!",
                },
            },
        },
        class_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: {
                    msg: "Class ID must be a number!",
                },
                notEmpty: {
                    msg: "Class ID is required!",
                },
            },
        },
    },
    {
        sequelize: connection,
        modelName: "RescheduleHistory",
    }
);

export default RescheduleHistory;