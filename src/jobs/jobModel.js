import { Op } from 'sequelize'
import sequelize from '../../config/sequellize.js';
import Job from './jobSchema.js'
import Contract from '../contracts/contractSchema.js';
import Profile from '../profiles/profileSchema.js'

export default class JobModel {

  static async getUserUnpaidJobs(userId) {
    return Job.findAll({
      where: {
        paid: false,
      },
      include: [
        {
          model: Contract,
          required: true,
          attributes: [],
          where: {
            [Op.or]: [
              {
                ClientId: userId,
              },
              {
                ContractorId: userId,
              },
            ],
            status: 'in_progress',
          },
        },
      ],
    });
  }

  static async payJob(jobId, clientId) {
    const result = await sequelize.transaction(async (t) => {
      const jobWithDetails = await Job.findOne(
        {
          where: {
            id: jobId,
          },
          include: [
            {
              model: Contract,
              required: true,
              attributes: ['ContractorId'],
              where: {
                ClientId: clientId,
              },
            },
          ],
        },
        { transaction: t }
      );
  
      if (!jobWithDetails) {
        throw new error(404, 'Job not found');
      }
  
      if (jobWithDetails.paid) {
        throw new error(409, 'Job is already paid');
      }
  
      const [client, contractor] = await Promise.all([
        Profile.findByPk(clientId, { transaction: t }),
        Profile.findByPk(jobWithDetails.Contract.ContractorId, {
          transaction: t,
        }),
      ]);
  
      if (client.balance < jobWithDetails.price) {
        throw new error(400, 'Insufficient funds');
      }
  
      client.balance = client.balance - jobWithDetails.price;
      contractor.balance = contractor.balance + jobWithDetails.price;
      jobWithDetails.paid = true;
      jobWithDetails.paymentDate = new Date()
  
      await Promise.all([
        client.save({ transaction: t }),
        contractor.save({ transaction: t }),
        jobWithDetails.save({ transaction: t }),
      ]);
  
      return jobWithDetails;
    });
  
    return result;
  }
}

