/**
 *
 */
import jwt, { JwtPayload } from 'jsonwebtoken';
import {  config } from '../../config/index.config';
const { accessToken, refleshToken } = config.token;

interface userPayloadI{
    id:string,
    displayName: string,
    email:string,
    pictures: string,
    iat?: number,
    exp?: number
}

function verifyTokenExpires(token: string) {
    try {
        const _token = jwt.decode(token) as JwtPayload;
        if (!_token) return false;

        const expiressionTime = _token.exp as number;
        const nowTime = Math.floor(Date.now() / 1000);

        if (expiressionTime < nowTime) return false;
        return true;
    } catch (error) {
        return false;
    }
}

export const AccessToken = {
    genarate: (payload: userPayloadI): string => {
        return jwt.sign(payload, accessToken.secretKey, {
            expiresIn: `${accessToken.expires}m`,
        });
    },

    verify: async (token: string, user: userPayloadI): Promise<boolean> => {
        if (!await verifyTokenExpires(token)){
            return false;
        }

        const tokenUser = (await jwt.verify(
            token,
            accessToken.secretKey
        )) as userPayloadI;

        if (tokenUser.email !== user.email) return false;
        return true;
    },
};

export const RefleshToken = {
    genarete: (payload:userPayloadI):string => {
        return jwt.sign(payload, refleshToken.secretKey, {
          expiresIn: `${refleshToken.expires}m`,
        });
    },

    verify: async (token: string, user:userPayloadI) => {
        if (!await verifyTokenExpires(token)) return false;
        const tokenUser = await jwt.verify(token, refleshToken.secretKey) as userPayloadI;
        if (tokenUser.email !== user.email) return false;
        return true;
    }
}
