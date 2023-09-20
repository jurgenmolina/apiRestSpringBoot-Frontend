import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [prioridad, setPrioridad] = useState('')
  const [usuarioEdit, setUsuarioEdit] = useState({
    id: null,
    nombre: "",
    email: "",
    prioridad: ""
  });


  const handleClick = (e) => {
    e.preventDefault()
    const usuario = { nombre, email, prioridad }
    console.log(usuario)
    fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)

    }).then(() => {
      console.log("Nuevo usuario Agregado")
      setOpen(false);
      cargarUsuarios();
    })
  }

  const handleClickEdit = (e) => {
    e.preventDefault()
    const id = usuarioEdit.id; // Lee la propiedad 'id' de usuarioEdit
    const nombre = usuarioEdit.nombre; // Lee la propiedad 'nombre' de usuarioEdit
    const email = usuarioEdit.email; // Lee la propiedad 'email' de usuarioEdit
    const prioridad = usuarioEdit.prioridad; // Lee la propiedad 'prioridad' de usuarioEdit

    const usuario = { id, nombre, email, prioridad }; // Crea un nuevo objeto 'usuario' con las propiedades

    console.log(usuario)
    fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)

    }).then(() => {
      console.log("Usuario actualizado con exito")
      setOpenEdit(false);
      cargarUsuarios();
    })
  }

  const cargarUsuarios = () => {
    fetch("http://localhost:8080/usuario")
      .then((res) => res.json())
      .then((result) => {
        setUsuarios(result);
        console.log(result);
      });
  };

  useEffect(() => {
    // Cargar la lista de usuarios inicialmente
    cargarUsuarios();
  }, []);

  const handleEdit = (usuario) => {
    setUsuarioEdit(usuario);
    setOpenEdit(true);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>Agregar Usuario</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth
              value={nombre} required
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
              value={email} required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField id="outlined-basic" label="Edad" variant="outlined" fullWidth
              value={prioridad} required
              onChange={(e) => setPrioridad(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Nombre" variant="outlined" fullWidth
              value={usuarioEdit.nombre} required
              onChange={(e) => setUsuarioEdit({ ...usuarioEdit, nombre: e.target.value })}
            />
            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
              value={usuarioEdit.email} required
              onChange={(e) => setUsuarioEdit({ ...usuarioEdit, email: e.target.value })}
            />
            <TextField id="outlined-basic" label="Edad" variant="outlined" fullWidth
              value={usuarioEdit.prioridad} required
              onChange={(e) => setUsuarioEdit({ ...usuarioEdit, prioridad: e.target.value })}
            />
            <Button variant="contained" color="secondary" onClick={handleClickEdit}>
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">NOMBRE</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell align="center">EDAD</StyledTableCell>
              <StyledTableCell align="center">Modificar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.nombre}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.prioridad}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={() => handleEdit(row)}>Editar</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
