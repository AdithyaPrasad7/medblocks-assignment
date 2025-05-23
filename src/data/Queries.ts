const generateFourRandomNumbers = (min = 0, max = 100) => {
  return Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const randomNumbers = generateFourRandomNumbers();

const johnEmail = `john.doe${randomNumbers[0]}@example.com`;
const janeEmail = `jane.smith${randomNumbers[1]}@example.com`;
const aliceEmail = `alice.johnson${randomNumbers[2]}@example.com`;
const bobEmail = `bob.brown${randomNumbers[3]}@example.com`;
const charlieEmail = `charlie.davis${randomNumbers[4]}@example.com`;

export const dummyDataQuery = `INSERT INTO patients (name, email, phone, gender, address, dob, created_date) VALUES 
  ('John Doe', '${johnEmail}', '123-456-7890', 'Male', '123 Elm St, Springfield', '1985-06-15', CURRENT_TIMESTAMP),
  ('Jane Smith', '${janeEmail}', '987-654-3210', 'Female', '456 Oak St, Springfield', '1990-02-20', CURRENT_TIMESTAMP),
  ('Alice Johnson', '${aliceEmail}', '555-123-4567', 'Female', '789 Pine St, Springfield', '1988-11-05', CURRENT_TIMESTAMP),
  ('Bob Brown', '${bobEmail}', NULL, 'Male', '321 Maple St, Springfield', '1975-03-30', CURRENT_TIMESTAMP),
  ('Charlie Davis', '${charlieEmail}', '222-333-4444', 'Male', '654 Cedar St, Springfield', '1995-12-12', CURRENT_TIMESTAMP);
`;

export const insertPatientQuery = `INSERT INTO patients (name, email, phone, gender, address, dob, created_date, updated_date) VALUES ($1, $2, $3, $4, $5, $6, now(), now())`;

export const selectQuery = `SELECT * FROM patients ORDER BY created_date DESC`;

export const createTableQuery = `CREATE TABLE IF NOT EXISTS patients (
                                    id SERIAL PRIMARY KEY,
                                    name TEXT,
                                    email VARCHAR(50) UNIQUE NOT NULL,
                                    phone VARCHAR(20),
                                    gender VARCHAR(10),
                                    address TEXT,
                                    dob DATE,
                                    created_date TIMESTAMP,
                                    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                  );`;

export const validateEmailQuery = `SELECT * FROM patients WHERE email = $1`;
