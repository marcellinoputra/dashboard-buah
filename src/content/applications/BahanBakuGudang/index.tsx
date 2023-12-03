import { Edit } from '@mui/icons-material';
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
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { satuan } from 'src/vendor/satuan';

interface DataBbGudang {
  id: number;
  rm_kode: string;
  rm_nama: string;
  rm_satuan: string;
  rm_konversi: number;
  rm_ket: string;
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
    rm_ket: '',
    cek: '',
    rm_satuan: '',
    help_mutasi: '',
    gdg: '',
    createdAt: new Date()
  });

  const [editId, setEditId] = useState(0)
  const [editRmKode, setEditRmKode] = useState<string>("")
  const [editRmName, setEditRmNama] = useState<string>("")
  const [editRmKonversi, setEditRmKonversi] = useState(0)
  const [editRmKet, setEditRmKet] = useState<string>("")
  const [editRmSatuan, setEditRmSatuan] = useState<string>("")
  const [editCek, setEditCek] = useState<string>("")
  const [editHelpMutasi, setEditHelpMutasi] = useState<string>("")
  const [editGdg, setEditGdg] = useState("")

  //Modal Create
  const [isModalCreate, setIsModalCreate] = useState(false);

  //Modal Delete
  const [isModalDelete, setIsModalDelete] = useState(false);

  //Modal Edit
  const [isModalEdit, setIsModalEdit] = useState(false);

  const openModalCreate = () => setIsModalCreate(true);

  const closeModalCreate = () => setIsModalCreate(false);

  const openModalEdit = (rm_kode: string, rm_nama: string, rm_konversi: number, rm_ket: string, cek: string, help_mutasi: string, gdg: string, rm_satuan: string, id: number) => {

    setEditRmKode(rm_kode)
    setEditRmNama(rm_nama)
    setEditRmKonversi(rm_konversi)
    setEditRmKet(rm_ket)
    setEditCek(cek)
    setEditHelpMutasi(help_mutasi)
    setEditGdg(gdg)
    setEditId(id)
    setEditRmSatuan(rm_satuan)
    setIsModalEdit(true);
  }

  const closeModalEdit = () => setIsModalEdit(false);

  const openModalDelete = () => setIsModalDelete(true);

  const closeModalDelete = () => setIsModalDelete(false);

  //Get Data
  async function getData() {
    setDataBbGudang([])
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/gudang/bahan-baku`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        setDataBbGudang(res.data.data);
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
    formData.append('rm_konversi', newData.rm_konversi.toString());
    formData.append('rm_satuan', newData.rm_satuan)
    formData.append('rm_ket', newData.rm_ket);
    formData.append('cek', newData.cek);
    formData.append('help_mutasi', newData.help_mutasi);
    formData.append('gdg', newData.gdg);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/v1/gudang/bahan-baku`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          closeModalCreate()
          getData()
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  async function updateData(id: number) {

    let formData = new FormData();

    formData.append('rm_kode', editRmKode);
    formData.append('rm_nama', editRmName);
    formData.append('rm_konversi', editRmKonversi.toString());
    formData.append('rm_ket', editRmKet);
    formData.append('rm_satuan', editRmSatuan)
    formData.append('cek', editCek);
    formData.append('help_mutasi', editHelpMutasi);
    formData.append('gdg', editGdg);

    await axios
      .put(`${import.meta.env.VITE_API_URL}/v1/gudang/bahan-baku/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalEdit(false);
          getData()
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  //Delete Data
  async function deleteData(id: number) {
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/v1/cabang/bahan-baku/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          getData()
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
        Bahan Baku Gudang
      </Typography>
      <Button
        variant="contained"
        sx={{ float: 'right', marginRight: 3, marginBottom: 3 }}
        onClick={openModalCreate}
      >
        Add Data
      </Button>
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
      {/* Modal Create  */}
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
            <InputLabel id="demo-simple-select-autowidth-label">
              Rm Satuan
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={(e) =>
                setNewData({ ...newData, rm_satuan: e.target.value })
              }
              autoWidth
              label="Rm Satuan"
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
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Rm Kode"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_kode: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Rm Satuan"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_kode: e.target.value })
              }
              style={textFieldStyle}
            />

            <TextField
              required
              id="outlined"
              label="Rm Nama"
              type="text"
              onChange={(e) =>
                setNewData({ ...newData, rm_nama: e.target.value })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="RM Konversi"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  rm_konversi: parseInt(e.target.value)
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Rm Keterangan"
              type="text"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  rm_ket: e.target.value
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Cek"
              type="text"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  cek: e.target.value
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Help Mutasi"
              type="text"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  help_mutasi: e.target.value
                })
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="GDG"
              type="text"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  gdg: e.target.value
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
      {/* Modal Edit */}
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
            <InputLabel id="demo-simple-select-autowidth-label">
              Rm Satuan
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              onChange={(e) =>
                setEditRmSatuan(e.target.value)
              }
              autoWidth
              label="Rm Satuan"
              defaultValue={editRmSatuan}
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
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Rm Kode"
              type="text"
              defaultValue={editRmKode}
              onChange={(e) =>
                setEditRmKode(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Rm Nama"
              type="text"
              defaultValue={editRmName}
              onChange={(e) =>
                setEditRmNama(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="RM Konversi"
              type="number"
              defaultValue={editRmKonversi}
              onChange={(e) =>
                setEditRmKonversi(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Rm Keterangan"
              type="text"
              defaultValue={editRmKet}
              onChange={(e) =>
                setEditRmKet(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Cek"
              type="text"
              defaultValue={editRmKet}
              onChange={(e) =>
                setEditCek(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Help Mutasi"
              defaultValue={editHelpMutasi}
              type="text"
              onChange={(e) =>
                setEditHelpMutasi(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="GDG"
              type="text"
              defaultValue={editGdg}
              onChange={(e) =>
                setEditGdg(e.target.value)
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
              <TableCell align="left">Actions</TableCell>
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
                <TableCell align='left'>
                  <Button
                    onClick={() => {
                      // rm_kode: string, rm_nama: string, rm_konversi: number, rm_ket: string, cek: string, help_mutasi: string, gdg: string, id: number
                      openModalEdit(data.rm_kode, data.rm_nama, data.rm_konversi, data.rm_ket, data.cek, data.help_mutasi, data.gdg, data.rm_satuan, data.id);
                    }}>
                    <Edit />

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
