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
import moment from 'moment';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

interface DataStockOpnameCabang {
  id: number;
  kode_bb: string;
  nama_bb: string;
  satuan: string;
  tempat_bb: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function StockOpnameCabang() {
  const [dataStockOpnameCabang, setStockOpnameCabang] = useState<
    DataStockOpnameCabang[]
  >([]);
  const [newData, setNewData] = useState({
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tempat_bb: '',
    total: 0,
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tempat_bb: '',
    total: 0,
    updatedAt: new Date()
  });

  return (
    <>
      <Typography
        variant="h1"
        sx={{ marginTop: 5, paddingLeft: 5, paddingBottom: 5 }}
      >
        Stock Opname Cabang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataStockOpnameCabang}
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Download CSV
        </CSVLink>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Kode BB</TableCell>
              <TableCell align="left">Nama BB</TableCell>
              <TableCell align="left">Satuan</TableCell>
              <TableCell align="left">Tempat BB</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataStockOpnameCabang.map((data) => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.kode_bb}</TableCell>
                <TableCell align="left">{data.nama_bb}</TableCell>
                <TableCell align="left">{data.satuan}</TableCell>
                <TableCell align="left">{data.tempat_bb}</TableCell>
                <TableCell align="left">{data.total}</TableCell>
                <TableCell align="left">
                  {moment(data.createdAt)
                    .utc()
                    .format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                <TableCell align="left">
                  {moment(data.createdAt)
                    .utc()
                    .format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
