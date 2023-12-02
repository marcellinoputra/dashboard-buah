import { Delete, Edit } from '@mui/icons-material';
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

interface DataMakananCabang {
  id: number;
  kode_bb: string;
  nama_bb: string;
  satuan: string;
  saldo_awal: number;
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

  //Modal Create
  const [isModalCreate, setIsModalCreate] = useState(false);

  //Modal Delete
  const [isModalDelete, setIsModalDelete] = useState(false);

  //Modal Edit
  const [isModalEdit, setIsModalEdit] = useState(false);

  const openModalCreate = () => setIsModalCreate(true);

  const closeModalCreate = () => setIsModalCreate(false);

  // const openModalEdit = () => setIsModalEdit(true);

  const closeModalEdit = () => setIsModalEdit(false);

  const openModalDelete = () => setIsModalDelete(true);

  const closeModalDelete = () => setIsModalDelete(false);

  //Get Data
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

  //Create Data
  async function createData(e: any) {
    e.preventDefault();

    let formData = new FormData();

    formData.append('kode_bb', newData.kode_bb);
    formData.append('nama_bb', newData.nama_bb);
    formData.append('satuan', newData.satuan);
    formData.append('saldo_awal', newData.saldo_awal.toString());
    formData.append('tp_bb', newData.tp_bb);
    formData.append('total_terima', newData.total_terima.toString());
    formData.append('beli', newData.beli.toString());
    formData.append('busuk', newData.busuk.toString());
    formData.append('mutasi_plus', newData.mutasi_plus.toString());
    formData.append('pakai', newData.pakai.toString());
    formData.append('stock_opname', newData.stock_opname.toString());
    formData.append('selisih', newData.selisih.toString());
    formData.append('input_stock', newData.input_stock);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalCreate(false);
          window.location.reload();
        }
      });
  }

  //Delete Data
  async function deleteData(id: number) {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200) {
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
        Makanan Cabang
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
              label="Nama BB"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, nama_bb: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="satuan"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, satuan: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Saldo Awal"
              type="number"
              onChange={(e) =>
                setNewData({ ...newData, saldo_awal: parseInt(e.target.value) })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tp BB"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, tp_bb: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Terima"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  total_terima: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Beli"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  beli: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Busuk"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  busuk: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Mutasi Plus"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  mutasi_plus: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Pakai"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  pakai: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Stock Opname"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  stock_opname: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="selisih"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  selisih: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Input Stock"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  input_stock: e.target.value
                })
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
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
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
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      // handleEditData();
                    }}
                  >
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => deleteData(data.id)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
