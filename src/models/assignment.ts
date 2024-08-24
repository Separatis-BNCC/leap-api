"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "./connection";

interface AssignmentAttributes {
    id?: number;
    url: string;
    deadline: Date;
    status?: number;
    course_id: number;

    createdAt?: Date,
    updatedAt?: Date,
}

class Assignment extends Model<AssignmentAttributes> implements AssignmentAttributes {
    public id!: number;
    public url!: string;
    public deadline!: Date;
    public status!: number;
    public course_id!: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Assignment.init(
    {
        url: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Assignment URL required!",
                },
            },
        },
        deadline: {
            allowNull: false,
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: "Assignment deadline required!",
                },
                isDate: {
                    msg: "Asignment deadline must be a date",
                    args: true,
                }
            },
        },
        status: {
            allowNull: false,
            defaultValue: 1,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: "Assignment status required!",
                },
            },
        },
        course_id: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: {
                    msg: "Status must be a number!",
                },
            },
        },
    },
    {
        sequelize: connection,
        modelName: "Assignment",
    }
);

export default Assignment;
