import { Router } from 'express';
import { UserService } from '../services/UserService';
import { authMiddleware } from '../utils/auth';

const router = Router();
const svc = new UserService();

router.post('/signup', async (req, res, next) => {

    try {
        const {token, user} = await svc.singup(req.body.email, req.body.password);
        res.status(201).json({token, user});
    } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
    try {
        const { token, user } = await svc.login(req.body.email, req.body.password);
        res.json({ token, user });
    } catch (err) { next(err); }
});

router.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const user = await svc.findById((req as any).user.userId);
        res.json(user);
    } catch (err) { next(err); }
});
