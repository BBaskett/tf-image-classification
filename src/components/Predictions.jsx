import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Predicitions({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Classification(s)</TableCell>
            <TableCell align="right">Probability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((p, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {p.className}
              </TableCell>
              <TableCell component="th" scope="row">
                {(p.probability * 100).toString().slice(0, 6)}&nbsp;%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Predicitions;
