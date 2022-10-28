import express from 'express';
import ProfileController from './profileController.js';


const router = express.Router();

router.post(
  '/balances/deposit/:userId',
  ProfileController.depositMoney
);

router.get(
  '/admin/best-profession',
  ProfileController.getBestProfession
);

router.get(
  '/admin/best-clients',
  ProfileController.getTopClients
);


export default router;



