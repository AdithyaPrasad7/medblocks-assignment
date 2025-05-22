import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import { useCallback } from "react";
import type { Patient } from "../data/Patient";

const pg = new PGliteWorker(
  new Worker(new URL("db.ts", import.meta.url), {
    type: "module",
  }),
  {
    extensions: {
      live,
    },
  }
);
export function useDatabase() {
  const insertPatient = useCallback(async (patient: Patient) => {
    const { name, email, phone, gender, address, dob } = patient;
    await pg.query(
      `INSERT INTO patients (name, email. phone, gender, adderss, dob, created_date, updated_date)
       VALUES ($1, $2, $3, $4, $5, $6, now(), now())`,
      [name, email, phone, gender, address, dob]
    );
  }, []);

  const customQuery = useCallback(async (query: string) => {
    const data = await pg.query(query);
    console.log(data);
    return data;
  }, []);

  return {
    insertPatient,
    customQuery,
  };
}
