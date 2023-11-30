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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

interface DataMakananCabang {
  id: number;
  kode_bb: string;
  nama_bb: string;
  satuan: string;
  saldo_awal: string;
  tp_bb: string;
  total_terima: number;
  beli: number;
  busuk: number;
  mutasi_plus: number;
  mutasi_minus: number;
  pakai: number;
  stock_opname: number;
  selisih: number;
  input_stock: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function MakananCabang() {
  const [dataMakananCabang, setDataMakananCabang] = useState<
    DataMakananCabang[]
  >([]);
  const [newData, setNewData] = useState({
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    saldo_awal: 0,
    tp_bb: '',
    total_terima: 0,
    beli: 0,
    busuk: 0,
    mutasi_plus: 0,
    pakai: 0,
    stock_opname: 0,
    selisih: 0,
    input_stock: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    saldo_awal: 0,
    tp_bb: '',
    total_terima: 0,
    beli: 0,
    busuk: 0,
    mutasi_plus: 0,
    pakai: 0,
    stock_opname: 0,
    selisih: 0,
    input_stock: '',
    updatedAt: new Date()
  });

  async function getData() {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataMakananCabang(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        sx={{ marginTop: 5, paddingLeft: 5, paddingBottom: 5 }}
      >
        Makanan Cabang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataMakananCabang}
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
              <TableCell align="left">Saldo Awal</TableCell>
              <TableCell align="left">Tp BB</TableCell>
              <TableCell align="left">Total Terima</TableCell>
              <TableCell align="left">Beli</TableCell>
              <TableCell align="left">Busuk</TableCell>
              <TableCell align="left">Mutasi Plus</TableCell>
              <TableCell align="left">Mutasi Minus</TableCell>
              <TableCell align="left">Pakai</TableCell>
              <TableCell align="left">Stock Opname</TableCell>
              <TableCell align="left">Selisih</TableCell>
              <TableCell align="left">Input Stock</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataMakananCabang.map((data) => (
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
                <TableCell align="left">{data.saldo_awal}</TableCell>
                <TableCell align="left">{data.tp_bb}</TableCell>
                <TableCell align="left">{data.total_terima}</TableCell>
                <TableCell align="left">{data.beli}</TableCell>
                <TableCell align="left">{data.busuk}</TableCell>
                <TableCell align="left">{data.mutasi_plus}</TableCell>
                <TableCell align="left">{data.mutasi_minus}</TableCell>
                <TableCell align="left">{data.pakai}</TableCell>
                <TableCell align="left">{data.stock_opname}</TableCell>
                <TableCell align="left">{data.selisih}</TableCell>
                <TableCell align="left">{data.input_stock}</TableCell>
                <TableCell align="left">{data.createdAt}</TableCell>
                <TableCell align="left">{data.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
