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

interface DataKodeSupplierCabang {
  id: number;
  kode: string;
  nama: string;
  kelompok: number;
  alamat: string;
  notelp: number;
  sp_kota: string;
  createdAt: Date;
  updatedAt: Date;
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: 'scroll',
  height: 500,
  p: 4
};

const textFieldStyle = {
  marginBottom: 10,
  marginTop: 10
};

export default function KodeSupplierCabang() {
  const [dataKodeSupllier, setDataKodeSupplier] = useState<
    DataKodeSupplierCabang[]
  >([]);
  const [newData, setNewData] = useState({
    kode: '',
    nama: '',
    kelompok: 0,
    alamat: '',
    notelp: 0,
    sp_kota: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    kode: '',
    nama: '',
    kelompok: 0,
    alamat: '',
    notelp: 0,
    sp_kota: '',
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

  async function getData() {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/gudang/kode-supplier`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataKodeSupplier(res.data.data);
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
        Kode Supplier Cabang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataKodeSupllier}
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
              <TableCell align="left">Kode</TableCell>
              <TableCell align="left">Nama</TableCell>
              <TableCell align="left">Kelompok</TableCell>
              <TableCell align="left">Alamat</TableCell>
              <TableCell align="left">No Telepon</TableCell>
              <TableCell align="left">Sp Kota</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataKodeSupllier.map((data) => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.kode}</TableCell>
                <TableCell align="left">{data.nama}</TableCell>
                <TableCell align="left">{data.kelompok}</TableCell>
                <TableCell align="left">{data.alamat}</TableCell>
                <TableCell align="left">{data.notelp}</TableCell>
                <TableCell align="left">{data.sp_kota}</TableCell>
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
