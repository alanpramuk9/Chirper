import { Router } from 'express';
//import peopleRouter from './people';
const chirpsRouter = require('./chirps');
const mentionRouter = require('./mentions');
let router = Router();

router.use('/chirps', chirpsRouter);
router.use('/mentions', mentionRouter);
export default router;