import type { Patient } from "../../../data/Patient";
import * as Yup from "yup";

export const initialValues: Patient = {
  id: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
  gender: undefined,
  address: undefined,
  dob: undefined,
  created_date: undefined,
  updated_date: undefined,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter Patient's name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter Patient's email"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits")
    .required("Please enter Patient's phone number"),
  gender: Yup.string().required("Please select gender"),
  address: Yup.string().required("Please enter Patient's address"),
  dob: Yup.date().required("Please enter Patient's date of birth"),
});

export const LABELS = {
  dialogTitle: "Add Patient",
  name: "Name",
  email: "Email",
  phone: "Phone",
  gender: "Gender",
  address: "Address",
  dob: "Date of Birth",
  add: "Add",
  emailError: "Email already registered",
};
