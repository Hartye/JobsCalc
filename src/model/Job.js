let data = [
  {
    id: 1,
    name: "Teste",
    "daily-hours": 3,
    "total-hours": 4,
    created_at: Date.now(),
  },
];

module.exports = {
  get() {
    return data;
  },

  update(newValue) {
    data = newValue;
  },

  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },
};
