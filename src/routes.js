const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Hartye",
    avatar: "https://github.com/hartye.png",
    "month-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 2,
    "vacation-per-year": 6,
    "value-hour": 75,
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data });
    },

    update(req, res) {
      // req.body para pegar os dados
      const data = req.body;

      // definir quantas semanas tem num ano: 52
      const weeksPerYear = 52;

      // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

      // quantas horas por semana estou trabalhando
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

      // total de horas trabalhadas por mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      // qualserá o valor da minha hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour,
      };

      return res.redirect("/profile");
    },
  },
};

const Job = {
  data: [],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";

        return {
          // A idéa dos três pontos é a de espalhamento, ou seja, todos os elementos job vão ser retornados, bastando apenas por três pontos.
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
        };
      });

      return res.render(views + "index", { jobs: updatedJobs });
    },

    create(req, res) {
      return res.render(views + "job");
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(),
      });

      return res.redirect("/");
    },

    show(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("id não encontrado");
      }

      job.budget = Job.services.calculateBudget(
        job,
        Profile.data["value-hour"]
      );

      return res.render(views + "job-edit", { job });
    },

    update(req, res) {
      const jobId = req.params.id;

      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("id não encontrado");
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }

        return job;
      });

      res.redirect("/");
    },

    delete(req, res) {
      const jobId = req.params.id;

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

      return res.redirect("/");
    },
  },

  services: {
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
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      // Restam x dias
      return dayDiff;
    },

    calculateBudget(job, valueHour) {
      return valueHour * job["total-hours"];
    },
  },
};

// req(request), res(response)
routes.get("/", Job.controllers.index);
routes.get("/job", Job.controllers.create);
routes.post("/job", Job.controllers.save);
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.post("/job/delete/:id", Job.controllers.delete);
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

// Mesma idéia de exportar uma função, module é uma propriedade de express.
module.exports = routes;
