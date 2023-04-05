import { Router } from 'express';
import shortController from './controllers/ShortController';
import authController from './controllers/AuthController';

// import testController from './controllers/TestController'

const router = Router();

router.post('/register', authController.create);
router.post('/login', authController.getOnce);
router.get('/users', authController.getAll);

router.get('/short/all', shortController.getAll);
router.get('/short/:hash', shortController.getByHash);
router.get('/short/id/:id', shortController.getById);
router.post('/short', shortController.create);

router.put('/short/update-hash/:id', shortController.updateHash);
router.put('/short/update-origin/:id', shortController.updateOrigin);
router.delete('/short/:id', shortController.delete);

export default router;
