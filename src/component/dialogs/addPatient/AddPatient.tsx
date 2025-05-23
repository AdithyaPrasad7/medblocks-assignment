import { ErrorMessage, Field, Formik } from "formik";
import { useState, type FC } from "react";
import { initialValues, validationSchema } from "./AddPatient.data";
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  DialogContent,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { LABELS } from "./AddPatient.data";
import CloseIcon from "@mui/icons-material/Close";
import type { Patient } from "../../../data/Patient";

interface AddPatientProps {
  onClose: () => void;
  handleAddPatient: (patient: Patient) => void;
  validateEmail: (email: string) => Promise<boolean>;
}

const AddPatient: FC<AddPatientProps> = ({
  onClose,
  handleAddPatient,
  validateEmail,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({
        values,
        handleChange,
        touched,
        errors,
        isValid,
        dirty,
        handleBlur,
        setFieldTouched,
      }) => {
        const onSubmit = () => {
          const patient: Patient = {
            ...values,
          };
          handleAddPatient(patient);
        };

        const [emailError, setEmailError] = useState(false);
        return (
          <Dialog open onClose={onClose} fullWidth>
            <DialogTitle p={0}>
              <Box display="flex" justifyContent="space-between" px={1} py={0}>
                <Typography variant="h4">{LABELS.dialogTitle}</Typography>
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container rowSpacing={1} columnSpacing={1.5}>
                <Grid size={6}>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid size={6}>
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    onBlur={async (e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      const email = e.target.value;
                      setFieldTouched("email", true);
                      const check = validateEmail(email);
                      if (await check) {
                        setEmailError(true);
                      } else {
                        setEmailError(false);
                      }
                    }}
                  />
                  {emailError && (
                    <FormHelperText error>{LABELS.emailError}</FormHelperText>
                  )}
                </Grid>
                <Grid size={6}>
                  <Field
                    name="phone"
                    as={TextField}
                    label="Phone"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={<ErrorMessage name="phone" />}
                  />
                </Grid>
                <Grid size={6}>
                  <Field
                    name="dob"
                    as={TextField}
                    label="Date of Birth"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="date"
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    error={touched.dob && Boolean(errors.dob)}
                    helperText={<ErrorMessage name="dob" />}
                  />
                </Grid>
                <Grid size={12}>
                  <Field
                    name="address"
                    as={TextField}
                    label="Address"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    error={touched.address && Boolean(errors.address)}
                    helperText={<ErrorMessage name="address" />}
                  />
                </Grid>
                <Grid size={10}>
                  <FormLabel>{LABELS.gender}</FormLabel>
                  <RadioGroup
                    name="gender"
                    row
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                  {touched.gender && errors.gender && (
                    <FormHelperText error>{errors.gender}</FormHelperText>
                  )}
                </Grid>

                <Grid size={2} mt={3}>
                  <Button
                    size="medium"
                    onClick={onSubmit}
                    disabled={!isValid || !dirty || emailError}
                  >
                    {LABELS.add}
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        );
      }}
    </Formik>
  );
};

export default AddPatient;
