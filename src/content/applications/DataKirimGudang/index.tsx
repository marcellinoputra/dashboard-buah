import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { CSVLink } from 'react-csv';

function createData(
  id: string,
  tanggal_permintaan: string,
  tanggal_terima: string,
  keterangan: string,
  aksi: string,
  status: string
) {
  return { id, tanggal_permintaan, tanggal_terima, keterangan, aksi, status };
}

const rows = [
  createData(
    'TR201123001',
    '20/11/2023',
    '21/11/2023',
    'Regular',
    'Cek',
    'Selesai'
  ),
  createData(
    'TR201123001',
    '22/11/2023',
    '23/11/2023',
    'Regular',
    'Cek',
    'Proses'
  )
];

export default function DataKirimGudang() {
  return (
    <>
      <Typography
        variant="h1"
        sx={{ marginTop: 5, paddingLeft: 5, paddingBottom: 5 }}
      >
        Data Kirim Gudang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink data={rows} style={{ color: 'white', textDecoration: 'none' }}>
          Download CSV
        </CSVLink>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID Order</TableCell>
              <TableCell align="left">Tanggal Permintaan</TableCell>
              <TableCell align="left">Tanggal Terima</TableCell>
              <TableCell align="left">Keterangan</TableCell>
              <TableCell align="left">Aksi</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.tanggal_permintaan}</TableCell>
                <TableCell align="left">{row.tanggal_terima}</TableCell>
                <TableCell align="left">{row.keterangan}</TableCell>
                <TableCell align="left">{row.aksi}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
