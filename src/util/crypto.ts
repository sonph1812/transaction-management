import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return  bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return  bcrypt.compare(password, hashedPassword);
}

function md5(input: string): Buffer {
  return crypto.createHash('md5').update(input).digest();
}

export function encrypt3DES(payload: any, uid: string): string {
  let secretKey = md5(uid);
  secretKey = Buffer.concat([secretKey, secretKey.slice(0, 8)]);
  const cipher = crypto.createCipheriv('des-ede3', secretKey, '');
  const encrypted = cipher.update(payload, 'utf8', 'base64');

  return encrypted + cipher.final('base64');
}


export function decrypt3DES(encryptedBase64: string, uid: string): string {
  let secretKey = md5(uid);
  secretKey = Buffer.concat([secretKey, secretKey.slice(0, 8)]);
  const decipher = crypto.createDecipheriv('des-ede3', secretKey, '');
  let decrypted = decipher.update(encryptedBase64, 'base64');
  decrypted += decipher.final() as any;
  return decrypted.toString();
}

