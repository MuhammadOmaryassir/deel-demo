import ProfileService from "./profileSerrvice.js";

export default class ProfileController {
  static async depositMoney(req, res) {
    // assume that anybody can deposit a balance for a client
    const clientId = req.params.userId;
    const { amount } = req.body;

    const profile = await ProfileService.depositMoney(Number(clientId), Number(amount));

    res.json(profile);
  }

  static async getBestProfession (req, res) {
    const { start, end } = req.query;
    const bestProfession = await ProfileService.getBestProfession(start, end);

    res.json(bestProfession);
  }

  static async getTopClients(req, res) {
    const { start, end, limit } = req.query;
    const bestClients = await ProfileService.getBestClients(start, end, limit);

    res.json(bestClients);
  }


}
