import express from 'express';
import ContractController from './contractController';
const {getProfile} = require('../middleware/getProfile')


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



