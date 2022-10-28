import express from 'express';
import JobController from './jobController.js';
import getProfile from '../middleware/getProfile.js'


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



