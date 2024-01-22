/**
 * 
 */
import CryptoJS from 'crypto-js';

export class Password {
    static async toHash(password: string) {
        let encryptPassword = CryptoJS.AES.encrypt(
            password,
            process.env.ENCRYPT_KEY!
        ).toString();

        return encryptPassword;
    }

    static async toMatch(
      storedPassword: string,
      suppliedPassword: string
    ): Promise<Boolean> {
        let decryptedPassword = CryptoJS.AES.decrypt(
            storedPassword,
            process.env.ENCRYPT_KEY!
        ).toString(CryptoJS.enc.Utf8);
            
        return decryptedPassword === suppliedPassword ? true : false;
    }
}
