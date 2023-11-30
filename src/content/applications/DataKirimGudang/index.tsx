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
import { useState } from 'react';
import { CSVLink } from 'react-csv';

interface KirimGudang {
  id: number;
  krm_rm: string;
  krm_cabang: string;
  krm_nama: string;
  krm_qty: number;
  tanggal: string;
  nama_barang: string;
  satuan: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function DataKirimGudang() {
  const [dataKirimGudang, setDataKirimGudang] = useState<KirimGudang[]>([]);
  const [newData, setNewData] = useState({
    krm_rm: '',
    krm_cabang: '',
    krm_nama: '',
    krm_qty: 0,
    tanggal: '',
    nama_barang: '',
    satuan: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    krm_rm: '',
    krm_cabang: '',
    krm_nama: '',
    krm_qty: 0,
    tanggal: '',
    nama_barang: '',
    satuan: '',
    updatedAt: new Date()
  });

  //Modal Create
  const [isModalCreate, setIsModalCreate] = useState(false);

  //Modal Delete
  const [isModalDelete, setIsModalDelete] = useState(false);

  //Modal Edit
  const [isModalEdit, setIsModalEdit] = useState(false);

  const openModalCreate = () => setIsModalCreate(true);

  const closeModalCreate = () => setIsModalCreate(false);

  const openModalEdit = () => setIsModalEdit(true);

  const closeModalEdit = () => setIsModalEdit(false);

  const openModalDelete = () => setIsModalDelete(true);

  const closeModalDelete = () => setIsModalDelete(false);

  //Get Data
  async function getData() {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/gudang/data-kirim`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataKirimGudang(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

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
        <CSVLink
          data={dataKirimGudang}
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
              <TableCell align="left">Krm Rm</TableCell>
              <TableCell align="left">Krm Cabang</TableCell>
              <TableCell align="left">Krm Nama</TableCell>
              <TableCell align="left">Krm Quantity</TableCell>
              <TableCell align="left">Tanggal</TableCell>
              <TableCell align="left">Nama Barang</TableCell>
              <TableCell align="left">Satuan</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKirimGudang.map((data) => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.krm_rm}</TableCell>
                <TableCell align="left">{data.krm_cabang}</TableCell>
                <TableCell align="left">{data.krm_nama}</TableCell>
                <TableCell align="left">{data.krm_qty}</TableCell>
                <TableCell align="left">{data.tanggal}</TableCell>
                <TableCell align="left">{data.nama_barang}</TableCell>
                <TableCell align="left">{data.satuan}</TableCell>
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
