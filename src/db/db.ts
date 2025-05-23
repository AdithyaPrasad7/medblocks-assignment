import { worker } from "@electric-sql/pglite/worker";
import { IdbFs, PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { createTableQuery } from "../data/Queries";

worker({
  async init() {
    const pg = new PGlite({
      fs: new IdbFs("patients-db"),
      extensions: {
        live,
      },
    });
    await pg.exec(createTableQuery);
    return pg;
  },
});
