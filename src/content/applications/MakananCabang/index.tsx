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
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { satuan } from 'src/vendor/satuan';

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
    mutasi_minus: 0,
    pakai: 0,
    stock_opname: 0,
    selisih: 0,
    input_stock: '',
    createdAt: new Date()
  });
  const [editData, setEditData] = useState({
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

  const [editKodeBB, setEditKodeBB] = useState("");
  const [editNamaBB, setEditNamaBB] = useState("");
  const [editSatuan, setEditSatuan] = useState("");
  const [editSaldoAwal, setEditSaldoAwal] = useState(0);
  const [editTPBB, setEditTPBB] = useState("");
  const [editTotalTerima, setEditTotalTerima] = useState(0);
  const [editBeli, setEditBeli] = useState(0);
  const [editBusuk, setEditBusuk] = useState(0);
  const [editMutasiPlus, setEditMutasiPlus] = useState(0);
  const [editPakai, setEditPakai] = useState(0);
  const [editStockOpname, setEditStockOpname] = useState(0);
  const [editSelisih, setEditSelisih] = useState(0);
  const [editInputStock, setEditInputStock] = useState("");
  const [editId, setEditId] = useState(0)

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


  const handleOpenEdit = (id: number, kodebb: string, nama_bb: string, satuan: string, saldo_awal: number, tp_bb: string, total_terima: number, beli: number, busuk: number, mutasi_plus: number, pakai: number, stock_opname: number, selisih: number, input_stock: string) => {
    setEditId(id)
    setEditKodeBB(kodebb)
    setEditNamaBB(nama_bb)
    setEditSatuan(satuan)
    setEditSaldoAwal(saldo_awal)
    setEditTPBB(tp_bb)
    setEditTotalTerima(total_terima)
    setEditBeli(beli)
    setEditBusuk(busuk)
    setEditMutasiPlus(mutasi_plus)
    setEditPakai(pakai)
    setEditStockOpname(stock_opname)
    setEditSelisih(selisih)
    setEditInputStock(input_stock)
    setIsModalEdit(false)
  }

  //Get Data
  async function getData() {
    setDataMakananCabang([])
    await axios
      .get(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan`, {
        headers: {
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        setDataMakananCabang(res.data.data);
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
    formData.append('mutasi_minus', newData.mutasi_plus.toString());

    formData.append('pakai', newData.pakai.toString());
    formData.append('stock_opname', newData.stock_opname.toString());
    formData.append('selisih', newData.selisih.toString());
    formData.append('input_stock', newData.input_stock);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalCreate(false);
          getData();
        }
      });
  }

  async function updateData(id: number) {

    let formData = new FormData();

    formData.append('kode_bb', editKodeBB);
    formData.append('nama_bb', editNamaBB);
    formData.append('satuan', editSatuan);
    formData.append('saldo_awal', editSaldoAwal.toString());
    formData.append('tp_bb', editTPBB);
    formData.append('total_terima', editTotalTerima.toString());
    formData.append('beli', editBeli.toString());
    formData.append('busuk', editBusuk.toString());
    formData.append('mutasi_plus', editMutasiPlus.toString());
    formData.append('pakai', editPakai.toString());
    formData.append('stock_opname', editStockOpname.toString());
    formData.append('selisih', editSelisih.toString());
    formData.append('input_stock', editInputStock);

    await axios
      .put(`${import.meta.env.VITE_API_URL}/v1/cabang/makanan/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsModalCreate(false);
          getData();
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
          getData();
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
              label="Mutasi Minus"
              type="number"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  mutasi_minus: parseInt(e.target.value)
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
              label="Saldo Awal"
              type="number"

              defaultValue={editSaldoAwal}
              onChange={(e) =>
                setEditSaldoAwal(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tp BB"
              type="text"

              defaultValue={editTPBB}
              onChange={(e) =>
                setEditTPBB(e.target.value)
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Total Terima"
              type="number"

              defaultValue={editTotalTerima}
              onChange={(e) =>
                setEditTotalTerima(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Beli"
              type="number"

              defaultValue={editBeli}
              onChange={(e) =>
                setEditBeli(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Busuk"
              type="number"

              defaultValue={editBusuk}
              onChange={(e) =>
                setEditBusuk(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Mutasi Plus"
              type="number"

              defaultValue={editMutasiPlus}
              onChange={(e) =>
                setEditMutasiPlus(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Pakai"
              type="number"

              defaultValue={editPakai}
              onChange={(e) =>
                setEditPakai(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Stock Opname"
              type="number"

              defaultValue={editStockOpname}
              onChange={(e) =>
                setEditStockOpname(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="selisih"
              type="number"
              defaultValue={editSelisih}
              onChange={(e) =>
                setEditSelisih(Number(e.target.value))
              }
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Input Stock"
              type="number"
              defaultValue={editInputStock}
              onChange={(e) =>
                setEditInputStock(e.target.value)
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
                      handleOpenEdit(data.id, data.kode_bb, data.nama_bb, data.satuan, data.saldo_awal, data.tp_bb, data.total_terima, data.beli, data.busuk, data.mutasi_plus, data.pakai, data.stock_opname, data.selisih, data.input_stock)
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
