import express from 'express';
import loginRouter from './login'
import logoutRouter from './logout';
import refreshRouter from './refresh';
import registerRouter from './register'

const router = express.Router();

router.post('/login', loginRouter);
router.post('/logout', logoutRouter);
router.post('/refresh', refreshRouter);
router.post('/register', registerRouter);

export default router;