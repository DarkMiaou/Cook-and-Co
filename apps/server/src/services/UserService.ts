import { UserModel, IUser } from '../models/UserModel';
import { config } from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    async singup (email : string, password : string )
    {
        const hash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ email, password: hash });
        const token = jwt.sign({ userId: user._id }, config.jwtSecret);
        return { token, user };
    }

    async login(email: string, password: string) 
    {
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error('Utilisateur non trouvé');
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error('Mot de passe invalide');
        const token = jwt.sign({ userId: user._id }, config.jwtSecret);
        return { token, user };
    }

    async findById(id: string) 
    {
        return UserModel.findById(id).select('-password');
    }
}