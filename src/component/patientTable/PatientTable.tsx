import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material";
import type { FC } from "react";
import { tableHeader } from "./PatientTable.data";
import type { Patient } from "../../data/Patient";

interface PatientTableProps {
  isLoading: boolean;
  patients: Patient[];
}

const PatientTable: FC<PatientTableProps> = ({ isLoading, patients }) => {
  return (
    <Box flexGrow={1} sx={{ overflowY: "auto !important" }}>
      <Paper>
        <TableContainer
          component={Box}
          border={`"2px" solid #EEE"`}
          borderRadius="8px"
          pl={1}
        >
          <Table
            stickyHeader
            padding={"checkbox"}
            style={{
              fontSize: "0.95rem",
            }}
          >
            <TableHead>
              <TableHeader />
            </TableHead>
            <TableBody>
              {isLoading
                ? [...Array(7)].map((_, index) => <SkeletonRow key={index} />)
                : patients?.map((patient, index) => (
                    <TableRow key={patient.id} sx={{ height: 50 }}>
                      <TableCell style={{ width: "5%" }}>{index}</TableCell>
                      <TableCell style={{ width: "15%" }}>
                        {patient.name}
                      </TableCell>
                      <TableCell style={{ width: "30%" }}>
                        {patient.email}
                      </TableCell>
                      <TableCell style={{ width: "15%" }}>
                        {patient.phone}
                      </TableCell>
                      <TableCell style={{ width: "10%" }}>
                        {patient.gender}
                      </TableCell>
                      <TableCell style={{ width: "40%" }}>
                        {patient.address}
                      </TableCell>
                      <TableCell>
                        {patient.dob
                          ? patient.dob instanceof Date
                            ? patient.dob.toLocaleDateString()
                            : new Date(patient.dob).toLocaleDateString()
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const SkeletonRow = () => (
  <TableRow sx={{ height: 50 }}>
    {Array.from({ length: 7 }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton height={50} />
      </TableCell>
    ))}
  </TableRow>
);

const TableHeader = () => {
  return (
    <TableRow>
      {tableHeader.map((header, index) => (
        <TableCell
          key={index}
          style={{
            backgroundColor: "#0C7181",
            height: 40,
          }}
        >
          {header.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default PatientTable;
