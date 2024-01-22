/**
 * 
 */

import Joi, { Schema,ObjectSchema } from 'joi';

export enum schemaType {
    Welcome = 'welcome',
    Verify = 'verify'
}



export const validatationSchema = {
    verify:  Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: {allow:["com", "net"]}})
            .required()
            .min(5)
            .max(30),

        subject: Joi.string().required().max(20),

        template: Joi.string().required().min(3).max(30),
  
    }),

    welcome: Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow:['com','net']}})
            .required()
    }),
}





