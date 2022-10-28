import ProfileModel from './profileModel.js'

export default class ProfileService {
  static async depositMoney(clientId, amount) {
    try {
      return ProfileModel.moneyDeposit(clientId, amount)
    } catch (err) {
      return err
    }

  }

  static async getBestProfession(startDate, endDate) {
    return ProfileModel.getBestProfession(startDate, endDate)
  }

  static async getBestClients(startDate,endDate,limit) {
    return ProfileModel.getBestClients(startDate, endDate, limit)

  }

}