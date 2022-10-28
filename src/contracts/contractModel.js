import { Op } from 'sequelize';
import Contract from './contractSchema'


export default class ContractModel {

  static async getContractById(id, userId) {
    return Contract.findOne({
      where: {
        id,
        [Op.or]: [
          { ClientId: userId }, { ContractorId: userId },
        ],
      },
    });
  }
  
  static async getNonTerminatedUserContracts(userId) {
    return Contract.findAll({
      where: {
        [Op.or]: [
          { ClientId: userId }, { ContractorId: userId },
        ],
        status: { [Op.ne]: 'terminated' },
      },
    });
  }
}