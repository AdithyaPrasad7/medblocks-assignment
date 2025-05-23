// import db from "./db";

// export async function runMigrations() {
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS patients (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       email VARCHAR(50),
//       phone VARCHAR(20),
//       gender VARCHAR(10),
//       address TEXT,
//       dob DATE,
//       created_date TIMESTAMP,
//       updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `);
// }

// worker({
//   async init() {
//     const pg = new PGlite({
//       fs: new IdbFs("my-pgdata"),
//       extensions: {
//         // vector, // Removed because 'vector' is not exported from '@electric-sql/pglite'
//       },
//     });
//     await pg.exec(`
//       CREATE TABLE IF NOT EXISTS patients (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         email VARCHAR(50),
//         phone VARCHAR(20),
//         gender VARCHAR(10),
//         address TEXT,
//         dob DATE,
//         created_date TIMESTAMP,
//         updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);
//     return pg;
//   },
// });

// worker({
//   async init() {
//     return new PGlite();
//   },
// });
