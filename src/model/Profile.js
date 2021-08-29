let data = {
  name: "Hartye",
  avatar: "https://github.com/hartye.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacation-per-year": 6,
  "value-hour": 75,
};

module.exports = {
  get() {
    return data;
  },

  update(newJob) {
    data = newJob;
  },
};
