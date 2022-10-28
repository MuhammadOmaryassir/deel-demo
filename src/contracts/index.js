import express from 'express';
import ContractController from './contractController.js';
import getProfile from '../middleware/getProfile.js'


const router = express.Router();

router.get(
  '/contracts/:id',
  getProfile,
  ContractController.getContractById
)

router.get(
  '/contracts',
  getProfile,
  ContractController.getNonTerminatedContracts
)



export default router;



