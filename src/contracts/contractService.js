import ContractModel from "./contractModel";

export default class ContractService {
  static async getContractById (id,userId) {
    return ContractModel.getContractById(id,userId)
  }

  static async getNonTerminatedContracts (userId) {
    return ContractModel.getNonTerminatedUserContracts(userId)
  }
}å