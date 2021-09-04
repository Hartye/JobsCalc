module.exports = {
  remainingDays(job) {
    // ajustes no jobs
    // calcuo de tempo restante
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

    // createdDate não está em milisegundos
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();

    // Transformar milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs);

    // Restam x dias
    return dayDiff;
  },

  calculateBudget(job, valueHour) {
    return valueHour * job["total-hours"];
  },
};
