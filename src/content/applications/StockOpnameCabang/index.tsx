import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { satuan } from 'src/vendor/satuan';

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

  const [editKodeBB, setEditKodeBB] = useState("")
  const [editNamaBB, setEditNamaBB] = useState("")
  const [editSatuan, setEditSatuan] = useState("")
  const [editTempatBb, setEditTempatBB] = useState("")
  const [editTotal, setEditTotal] = useState(0)
  const [editId, setEditId] = useState(0)

  const handleModalEdit = (kode: string, nama: string, satuan: string, tempat: string, total: number, id: number) => {
    setEditKodeBB(kode)
    setEditNamaBB(nama)
    setEditSatuan(satuan)
    setEditTempatBB(tempat)
    setEditTotal(total)
    setEditId(id)
  }

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

  async function getData() {
    setStockOpnameCabang([])
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/so-cabang`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        setStockOpnameCabang(res.data.data);
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
    formData.append('tempat_bb', newData.tempat_bb);
    formData.append('total', newData.total.toString());

    await axios
      .post(`${import.meta.env.VITE_API_URL}/v1/cabang/so-cabang`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalCreate(false);
          getData();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function updateData(id: number) {

    let formData = new FormData();

    formData.append('kode_bb', editKodeBB);
    formData.append('nama_bb', editNamaBB);
    formData.append('satuan', editSatuan);
    formData.append('tempat_bb', editTempatBb);
    formData.append('total', editTotal.toString());

    await axios
      .put(`${import.meta.env.VITE_API_URL}/v1/cabang/so-cabang/${id}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalEdit(false);
          getData();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  //Delete Data
  async function deleteData(id: number) {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/v1/cabang/so-cabang/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          getData();
        }
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
        Stock Opname Cabang
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
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Satuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) =>
                  setNewData({ ...newData, satuan: e.target.value })
                }
                autoWidth
                label="Satuan"
                defaultValue=""
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {satuan.map((satuan) => (
                  <MenuItem key={satuan.key} value={satuan.value}>
                    {satuan.render}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Tempat BB"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, tempat_bb: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total"
              type="number"
              onChange={(e) =>
                setNewData({ ...newData, total: parseInt(e.target.value) })
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

      {/* Edit Modal */}
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
              defaultValue={editKodeBB}
              onChange={(e) =>
                setEditKodeBB(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Nama BB"
              type="text"
              defaultValue={editNamaBB}
              onChange={(e) =>
                setEditNamaBB(e.target.value)
              }
              style={textFieldStyle}
            />
            <FormControl style={textFieldStyle}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Satuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onChange={(e) =>
                  setEditSatuan(e.target.value)
                }
                autoWidth
                label="Satuan"
                defaultValue={editSatuan}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {satuan.map((satuan) => (
                  <MenuItem key={satuan.key} value={satuan.value}>
                    {satuan.render}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined"
              label="Tempat BB"
              type="text"
              defaultValue={editTempatBb}
              onChange={(e) =>
                setEditTempatBB(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total"
              type="number"
              defaultValue={editTotal}
              onChange={(e) =>
                setEditTotal(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <Button
              onClick={() => updateData(editId)}
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
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
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
