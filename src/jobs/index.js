import express from 'express';
import JobController from './jobController';
const {getProfile} = require('../middleware/getProfile')


const router = express.Router();

router.get(
  '/jobs/unpaid',
  getProfile,
  JobController.getUnpaidJobs
)

router.post(
  '/jobs/:id/pay',
  getProfile,
  JobController.payJob
);



export default router;



