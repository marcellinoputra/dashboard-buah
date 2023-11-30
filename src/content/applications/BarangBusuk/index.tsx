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

interface DataBarangBusukCabang {
  id: number;
  kode_bb: string;
  nama_bb: string;
  satuan: string;
  tanggal_bb: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function BarangBusuk() {
  const [dataBbusukCabang, setDataBbusukCabang] = useState<
    DataBarangBusukCabang[]
  >([]);
  const [newData, setNewData] = useState({
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tanggal_bb: '',
    total: 0,
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tanggal_bb: '',
    total: 0,
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
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/busuk-cabang`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataBbusukCabang(res.data.data);
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
        Barang Busuk
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataBbusukCabang}
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
              <TableCell align="left">Kode Barang Busuk</TableCell>
              <TableCell align="left">Nama Barang Busuk</TableCell>
              <TableCell align="left">Satuan</TableCell>
              <TableCell align="left">Tanggal Barang Busuk</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBbusukCabang.map((data) => (
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
                <TableCell align="left">{data.tanggal_bb}</TableCell>
                <TableCell align="left">{data.total}</TableCell>
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
