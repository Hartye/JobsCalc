const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`
    CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    )`);

    await db.exec(`
    CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    )
    `);

    await db.run(`
    INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      hours_per_day,
      days_per_week,
      vacation_per_year,
      value_hour
    ) VALUES (
      "Hartye",
      "https://github.com/hartye.png",
      4000,
      5,
      5,
      8,
      36
    )`);

    await db.run(`
    INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Pizzaria benvenitto",
      4,
      14,
      1630682938705
    )
    `);

    await db.run(`
    INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Bolacharia lupão",
      1,
      15,
      1630682938705
    )
    `);

    await db.close();
  },
};

initDb.init();
