import Router from 'koa-router';

import cinemaController from '../controllers/cinema';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', cinemaController.getAll);
router.post('/', validator.cinema, cinemaController.create);

export default router;
