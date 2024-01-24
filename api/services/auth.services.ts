import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { userRepo } from '../repositories';
import { JWT_SECRET, TIME_OUT } from '../config/constantes'
import { IAuth } from '../interfaces';
import { v1 as uuid } from "uuid";
import { passworBcrypt } from './../utils'
import emailApi from '../config/mail';

export const loginUser = async (email: string, password: string): Promise<IAuth | null> => {
  let user:any = await userRepo.findByMail(email);
  if (!user) {
    throw new Error('El user o pass son invalidos');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('El user o pass son invalidos');
  }
  const token = jwt.sign({ userId: user._id, user: user._doc }, JWT_SECRET, { expiresIn: TIME_OUT });
  return { ...user._doc , token };
};

export const forgotPasswordService = async (userEmail: string): Promise<Boolean> => {
  if (userEmail) {
    let user = await userRepo.findByMail(userEmail);
    if (user) {
      const tokenRecovery = uuid();
      const updatedUser = await userRepo.updateById(user._id, { passwordResetToken: tokenRecovery });
      if (updatedUser) {
        try {
          await emailApi.send({
            template: 'recovery',
            message: {
              from: `recovery@recovery.com`,
              to: userEmail,
            },
            locals: {
              url: tokenRecovery
            },
          });
        } catch (error) {
          throw Error('Error al enviar token');
        }
      } else {
        throw Error('Error al generar token');
      }
    }
  }
  return true;
}

export const changePasswordService = async (token: string, password: string): Promise<Boolean> => {
  const userData = await userRepo.validateTokenRecovery(token);
  if (userData === null) {
    throw Error('Token invalido');
  }
  await userRepo.updateById(userData._id, { password: await passworBcrypt(password) });
  return true;
}