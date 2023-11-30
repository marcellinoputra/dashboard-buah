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

interface DataBbGudang {
  id: number;
  rm_kode: string;
  rm_nama: string;
  rm_satuan: string;
  rm_konversi: number;
  rm_ket: number;
  cek: string;
  help_mutasi: string;
  gdg: string;
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

export default function BahanBakuGudang() {
  const [dataBbGudang, setDataBbGudang] = useState<DataBbGudang[]>([]);
  const [newData, setNewData] = useState({
    rm_kode: '',
    rm_nama: '',
    rm_konversi: 0,
    rm_ket: 0,
    cek: '',
    help_mutasi: '',
    gdg: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    rm_kode: '',
    rm_nama: '',
    rm_konversi: 0,
    rm_ket: 0,
    cek: '',
    help_mutasi: '',
    gdg: '',
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
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/bahan-baku`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataBbGudang(res.data.data);
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
        Bahan Baku Gudang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataBbGudang}
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
              <TableCell align="left">Rm Kode</TableCell>
              <TableCell align="left">Rm Nama</TableCell>
              <TableCell align="left">Rm Satuan</TableCell>
              <TableCell align="left">Rm Konversi</TableCell>
              <TableCell align="left">Rm Keterangan</TableCell>
              <TableCell align="left">Cek</TableCell>
              <TableCell align="left">Help Mutasi</TableCell>
              <TableCell align="left">GDG</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBbGudang.map((data) => (
              <TableRow
                key={data.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.rm_kode}</TableCell>
                <TableCell align="left">{data.rm_nama}</TableCell>
                <TableCell align="left">{data.rm_satuan}</TableCell>
                <TableCell align="left">{data.rm_konversi}</TableCell>
                <TableCell align="left">{data.rm_ket}</TableCell>
                <TableCell align="left">{data.cek}</TableCell>
                <TableCell align="left">{data.help_mutasi}</TableCell>
                <TableCell align="left">{data.gdg}</TableCell>
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
