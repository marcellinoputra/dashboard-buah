import {
  Box,
  Button,
  FormControl,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

interface DataMutasiCabang {
  id: number;
  kode_bb: string;
  nama_bb: string;
  satuan: string;
  tanggal_mutasi: string;
  mutasi_terima: number;
  mutasi_kirim: number;
  keterangan: string;
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

export default function MutasiCabang() {
  const [dataMutasiCabang, setDataMutasiCabang] = useState<DataMutasiCabang[]>(
    []
  );
  const [newData, setNewData] = useState({
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tanggal_mutasi: '',
    mutasi_terima: 0,
    mutasi_kirim: 0,
    keterangan: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    kode_bb: '',
    nama_bb: '',
    satuan: '',
    tanggal_mutasi: '',
    mutasi_terima: 0,
    mutasi_kirim: 0,
    keterangan: '',
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
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/mutasi-cabang`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        return setDataMutasiCabang(res.data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function createData(e: any) {
    e.preventDefault();

    let formData = new FormData();

    formData.append('kode_bb', newData.kode_bb);
    formData.append('nama_bb', newData.nama_bb);
    formData.append('satuan', newData.satuan);
    formData.append('tanggal_mutasi', newData.tanggal_mutasi);
    formData.append('mutasi_terima', newData.mutasi_terima.toString());
    formData.append('mutasi_kirim', newData.mutasi_kirim.toString());
    formData.append('keterangan', newData.keterangan);

    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/v1/cabang/mutasi-cabang`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'ngrok-skip-browser-warning': 'any'
          }
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalCreate(false);
          window.location.reload();
        }
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
        Mutasi Cabang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
        onClick={openModalCreate}
      >
        Add Data
      </Button>
      <Modal
        open={isModalCreate}
        onClose={closeModalCreate}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10
        }}
      >
        <Box sx={boxStyle}>
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: '30'
            }}
            variant="h6"
            component="h2"
          >
            Masukan Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Kode BB"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, kode_bb: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="nama_bb"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, nama_bb: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Satuan"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, satuan: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tanggal Mutasi"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, tanggal_mutasi: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Mutasi Kirim"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  mutasi_kirim: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Mutasi Terima"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  mutasi_terima: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Keterangan"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, keterangan: e.target.value })
              }
              style={textFieldStyle}
            />

            <Button
              onClick={createData}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: 'blue',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: 'darkblue'
                }
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataMutasiCabang}
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
              <TableCell align="left">Tanggal Mutasi</TableCell>
              <TableCell align="left">Mutasi Terima</TableCell>
              <TableCell align="left">Mutasi Kirim</TableCell>
              <TableCell align="left">Keterangan</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataMutasiCabang.map((data) => (
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
                <TableCell align="left">{data.tanggal_mutasi}</TableCell>
                <TableCell align="left">{data.mutasi_terima}</TableCell>
                <TableCell align="left">{data.mutasi_kirim}</TableCell>
                <TableCell align="left">{data.keterangan}</TableCell>
                <TableCell align="left">
                  {moment(data.createdAt)
                    .utc()
                    .format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                <TableCell align="left">
                  {moment(data.updatedAt)
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
