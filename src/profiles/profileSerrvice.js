import ProfileModel from './profileModel'

export default class ProfileService {
  static async depositMoney(clientId, amount) {
    try {
      return ProfileModel.moneyDeposit(clientId, amount)
    } catch (err) {
      return err
    }

  }

  static async getBestProfession(startDate, endDate) {
    return ProfileModel.getBestClients(startDate, endDate)
  }

  static async getBestClients() {
    return ProfileModel.getBestClients(startDate, endDate, limit)

  }

}