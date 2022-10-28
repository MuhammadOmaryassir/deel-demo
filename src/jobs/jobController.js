import JobService from "./jobService";

export default class JobController {
  static async getUnpaidJobs(req, res) {
    const userId = req.profile.id;
    const jobs = await JobService.getUnpaidJobs(Number(userId))

    res.json(jobs);
  }

  static async payJob(req,res) {
    const jobId = req.params.id;
    const clientId = req.profile.id;
    const updatedJob = await JobService.payJob(Number(jobId), Number(clientId));

    res.json(updatedJob);
  }

}
