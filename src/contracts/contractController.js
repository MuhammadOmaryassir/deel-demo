import ContractService from "./contractService"

export default class ContractController {
  static async getContractById(req, res) {
    const { id } = req.params
    const userId = req.profile.id;
    const contract = await ContractService.getContractById(Number(id),Number(userId))
    if(!contract) return res.status(404).end()
    res.json(contract)
  }

  static async getNonTerminatedContracts(req, res) {
    const userId = req.profile.id;
    const contracts = await ContractService.getNonTerminatedContracts(Number(userId))
    res.json(contracts);
  }
}
