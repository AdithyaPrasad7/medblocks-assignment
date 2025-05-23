import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import { useCallback } from "react";
import type { Patient } from "../data/Patient";
import {
  dummyDataQuery,
  insertPatientQuery,
  selectQuery,
  validateEmailQuery,
} from "../data/Queries";

export const pg = new PGliteWorker(
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
    try {
      await pg.query(insertPatientQuery, [
        name,
        email,
        phone,
        gender,
        address,
        dob,
      ]);

      return true;
    } catch (error) {
      console.error("Insert failed:", error);
      return false;
    }
  }, []);

  const customQuery = useCallback(async (query: string) => {
    const data = await pg.query(query);
    return data;
  }, []);

  const addDummyData = useCallback(async () => {
    await pg.exec(dummyDataQuery);
  }, []);

  const getData = useCallback(async () => {
    const data = await pg.query(selectQuery);
    return data;
  }, []);

  const validateEmail = useCallback(async (email: string) => {
    const data = await pg.query(validateEmailQuery, [email]);
    console.log(data);

    return data.rows.length > 0;
  }, []);

  return {
    insertPatient,
    getData,
    addDummyData,
    customQuery,
    validateEmail,
  };
}
