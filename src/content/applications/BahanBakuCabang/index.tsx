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
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import moment from 'moment';

interface DataBbCabang {
  id: number;
  rm_nama: string;
  rm_kode: string;
  rm_satuan: string;
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

export default function BahanBakuCabang() {
  const [dataBbCabang, setDataBbGudang] = useState<DataBbCabang[]>([]);
  const [newData, setNewData] = useState({
    rm_kode: '',
    rm_nama: '',
    rm_satuan: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
    id: 0,
    rm_kode: '',
    rm_nama: '',
    rm_satuan: '',
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

  function handleEditData() {
    const updateData = {};

    setIsModalEdit(true);
  }

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

  //Create Data
  async function createData(e: any) {
    e.preventDefault();

    let formData = new FormData();

    formData.append('rm_kode', newData.rm_kode);
    formData.append('rm_nama', newData.rm_nama);
    formData.append('rm_satuan', newData.rm_satuan);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/v1/cabang/bahan-baku`, formData, {
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
      })
      .catch((err) => {
        alert(err);
      });
  }

  //Update Data
  async function submitEdit(e: any) {
    e.preventDefault();

    let formData = new FormData();

    formData.append('rm_kode', newData.rm_kode);
    formData.append('rm_nama', newData.rm_nama);
    formData.append('rm_satuan', newData.rm_satuan);

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/v1/cabang/bahan-baku/${editData.id}`,
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
          setIsModalEdit(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function deleteData() {
    await axios
      .delete(
        `${import.meta.env.VITE_API_URL}/v1/cabang/bahan-baku/${editData.id}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'any'
          }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
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
        Bahan Baku Cabang
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
              label="rm_kode"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_kode: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="rm_nama"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_nama: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="rm_satuan"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_satuan: e.target.value })
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
      <Modal
        open={isModalEdit}
        onClose={closeModalEdit}
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
              marginBottom: '10'
            }}
            variant="h6"
            component="h2"
          >
            Edit Data Product
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="rm_kode"
              type="text"
              onChange={(e) =>
                setEditData({ ...editData, rm_kode: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="rm_nama"
              type="text"
              onChange={(e) =>
                setEditData({ ...editData, rm_nama: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="rm_satuan"
              type="text"
              onChange={(e) =>
                setEditData({ ...editData, rm_satuan: e.target.value })
              }
              style={textFieldStyle}
            />
          </FormControl>
        </Box>
      </Modal>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
      >
        <CSVLink
          data={dataBbCabang}
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
              <TableCell align="left">RM Kode</TableCell>
              <TableCell align="left">RM Nama</TableCell>
              <TableCell align="left">RM Satuan</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataBbCabang.map((data) => {
              return (
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
                        handleEditData();
                      }}
                    >
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
