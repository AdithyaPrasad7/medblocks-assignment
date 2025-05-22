import { worker } from "@electric-sql/pglite/worker";
import { IdbFs, PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";

worker({
  async init() {
    const pg = new PGlite({
      fs: new IdbFs("patients-db"),
      extensions: {
        live,
      },
    });
    await pg.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT,
          email VARCHAR(50),
          phone VARCHAR(20),
          gender VARCHAR(10),
          address TEXT,
          dob DATE,
          created_date TIMESTAMP,
          updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    return pg;
  },
});
