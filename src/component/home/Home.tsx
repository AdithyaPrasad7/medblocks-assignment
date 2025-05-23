import { useEffect, useState, type FC } from "react";
import Header from "../header/Header";
import { Alert, Box, Button, ButtonGroup, Snackbar } from "@mui/material";
import SqlEditor from "../sqlEditor/SqlEditor";
import { useStyles } from "./HomeStyles";
import { LABELS } from "./Home.data";
import Papa from "papaparse";
import AddPatient from "../dialogs/addPatient/AddPatient";
import { useDatabase } from "../../db/useDataBase";
import type { Patient } from "../../data/Patient";
import PatientTable from "../patientTable/PatientTable";
import RefreshIcon from "@mui/icons-material/Refresh";
import { broadcastChannel } from "../../utils/broadcast";

const Home: FC = () => {
  const classes = useStyles();

  const [sqlQuery, setSqlQuery] = useState<string>(
    `-- Enter your SQL query here\n`
  );
  const { insertPatient, getData, addDummyData, customQuery, validateEmail } =
    useDatabase();

  const [openDialog, setOpenDialog] = useState<Boolean>(false);
  const handleQueryChange = (sqlQuery: string | undefined) => {
    setSqlQuery(sqlQuery ?? "");
  };

  const handleQueryRun = async () => {
    setIsLoading(true);
    try {
      const result = await customQuery(sqlQuery);

      setPatients(result.rows as Patient[]);
    } catch (error) {
      console.error("Error running query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  useEffect(() => {
    broadcastChannel().listenToBroadcastChannel((msg: { type: string }) => {
      if (msg.type === "refreshPatients") {
        fetchPatients();
      }
    });
  }, []);
  useEffect(() => {
    fetchPatients();
  }, []);
  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const result = await getData();
      setPatients(result.rows as Patient[]);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const csv = Papa.unparse(patients);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.setAttribute("download", `data_${timestamp}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddPatient = async (patient: Patient) => {
    const result = await insertPatient(patient);
    if (result) {
      setSnackbar(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Patient added successfully");
      toggleDialog();
      fetchPatients();
    }
  };

  const handleValidateEmail = (email: string) => {
    return validateEmail(email);
  };

  return (
    <Box>
      <Header />
      <ButtonGroup size="large" className={classes.buttonGroup}>
        <Button
          onClick={() => {
            addDummyData();
            fetchPatients();
          }}
        >
          {LABELS.addDummyData}
        </Button>
        <Button onClick={toggleDialog}>{LABELS.addPatient}</Button>
        <Button onClick={handleDownload}>{LABELS.exportData}</Button>
        <Button
          variant="outlined"
          disableElevation
          loading={isLoading}
          loadingPosition="end"
          onClick={fetchPatients}
          endIcon={!isLoading && <RefreshIcon />}
        >
          {LABELS.refresh}
        </Button>
      </ButtonGroup>
      <Box display={"flex"} gap={2} py={1} px={3} height={"70vh"}>
        <Box width={"40%"} height={"60vh"}>
          <SqlEditor query={sqlQuery} onChange={handleQueryChange} />
          <ButtonGroup size="medium" className={classes.buttonGroup}>
            <Button onClick={handleQueryRun}>{LABELS.runQuery}</Button>
            <Button onClick={fetchPatients}>{LABELS.reset}</Button>
          </ButtonGroup>
        </Box>
        <Box flexGrow={1} sx={{ overflowY: "auto !important" }}>
          <PatientTable isLoading={isLoading} patients={patients} />
        </Box>
      </Box>
      {openDialog && (
        <AddPatient
          onClose={toggleDialog}
          handleAddPatient={handleAddPatient}
          validateEmail={handleValidateEmail}
        />
      )}
      <Snackbar
        open={snackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={snackbarSeverity === "success" ? 4000 : 6000}
        onClose={() => {
          setSnackbar(false);
        }}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
