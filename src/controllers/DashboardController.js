const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // total de horas pr dia de cada job em progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      // Somando a quantidade de estatus
      // Ex: quando status for done o valor done dentro de statusCount vai ser adicionado em um e o mesmo para progress
      statusCount[status] += 1;

      jobTotalHours += status === "progress" ? Number(job["daily-hours"]) : 0;

      return {
        // A idéa dos três pontos é a de espalhamento, ou seja, todos os elementos job vão ser retornados, bastando apenas pôr três pontos.
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // quantidade de horas que quero trabalhar MENOS quantidade de horas/dia de cada job em progress
    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile,
      statusCount,
      freeHours,
    });
  },
};
