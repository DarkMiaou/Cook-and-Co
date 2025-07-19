import { Router } from 'express';
import { RecipeService, UserService } from '../services/RecipeService';
import { authMiddleware } from '../utils/auth';

const router = Router();
const svc = new RecipeService();

router.get('/', async (req, res, next) => {
    try {
        const skip = Number(req.query.skip) || 0;
        const take = Number(req.query.take) || 10;
        res.json(await svc.list({ skip, take }));
    } catch (err) { next(err); }
});

router.post('/', authMiddleware, async (req, res, next) => {
    try {
        const recipe = await svc.create({
            title: req.body.title,
            description: req.body.description,
            author: (req as any).user.userId
        });
        res.status(201).json(recipe);
    } catch (err) { next(err); }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
    try {
        res.json(await svc.update(req.params.id, req.body));
    } catch (err) { next(err); }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        await svc.delete(req.params.id);
        res.sendStatus(204);
    } catch (err) { next(err); }
});

export default router;