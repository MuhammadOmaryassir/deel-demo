import JobModel from "./jobModel"


export default class JobService {
  static async getUnpaidJobs(userId) {
    return JobModel.getUserUnpaidJobs(userId)
  }

  static async payJob(jobId, clientId) {
    try {
      return JobModel.payJob(jobId, clientId)
    } catch (err) {
      return err
    }
  }

}