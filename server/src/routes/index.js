import { Router } from 'express';
const chirpsRouter = require('./chirps');
const mentionRouter = require('./mentions');
let router = Router();

router.use('/chirps', chirpsRouter);
router.use('/mentions', mentionRouter);
export default router;