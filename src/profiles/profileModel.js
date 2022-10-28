import sequelize from '../../config/sequellize.js';
import { Op } from 'sequelize';

import Job from '../jobs/jobSchema.js'
import Contract from '../contracts/contractSchema.js';
import Profile from '../profiles/profileSchema.js'

export default class ProfileModel {

  static async getClientUnpaidJobsSum(clientId) {
    return Job.sum('price', {
      where: {
        paid: false,
      },
      include: [
        {
          model: Contract,
          required: true,
          attributes: [],
          where: {
            status: 'in_progress',
            ClientId: clientId,
          },
        },
      ],
    });
  }

  static async moneyDeposit(clientId, amount) {
    const result = await sequelize.transaction(async (t) => {
      const client = await Profile.findByPk(clientId, { transaction: t });
      const thresholdAmount = 0.25

      if (!client || client.type !== 'client') {
        throw new error(404, 'Client not found')
      }

      const unpaidSum = await ProfileModel.getClientUnpaidJobsSum(clientId);
      const depositThreshold = unpaidSum * thresholdAmount;

      if (amount > depositThreshold) {
        throw new error(400, 'Deposit exceeds the threshold');
      }

      client.balance = parseFloat((client.balance + amount).toFixed(2));

      await client.save({ transaction: t });

      return client;
    });

    return result;
  }

  static async getBestProfession(startDate, endDate) {
    const jobs = await Job.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPaid']],
      order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
      group: ['Contract.Contractor.profession'],
      limit: 1,
      where: {
        paid: true,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Contract,
          attributes: ['createdAt'],
          include: [
            {
              model: Profile,
              as: 'Contractor',
              where: { type: 'contractor' },
              attributes: ['profession'],
            },
          ],
        },
      ],
    });

    if (!jobs.length) {
      return null;
    }

    const result = jobs[0].get({ plain: true });

    return {
      profession: result.Contract.Contractor.profession,
      totalPaid: result.totalPaid,
    };
  }

  static async getBestClients(startDate, endDate, limit = 2) {
    const results = await Job.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'paid']],
      order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
      group: ['Contract.Client.id'],
      limit,
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Contract,
          attributes: ['id'],
          include: [
            {
              model: Profile,
              as: 'Client',
              where: { type: 'client' },
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
    });

    return results.map((groupedJobs) => ({
      paid: groupedJobs.paid,
      id: groupedJobs.Contract.Client.id,
      fullName: `${groupedJobs.Contract.Client.firstName} ${groupedJobs.Contract.Client.lastName}`,
    }));
  }
}




