import React, {useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { FaUserCheck, FaUserSlash } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './Users.css';
import { bloquearUser, deleteUser, desbloquearUser, getUsers, rolAdmin } from "../../actions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function User () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.allUsers);
    const [idUser, setUser] = useState(undefined);
    const [tooltip, setTooltip] = useState('');
    
    useEffect(
		() => {
		dispatch(getUsers());
		}, [dispatch]);

     //Estados para control de alertas Borrar
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackDelete, setSnackDelete] = useState(false);

   //Estados para control de alertas Promover
  const [openPromote, setOpenPromote] = useState(false);
  const [openSnackPromote, setSnackPromote] = useState(false);

  //Estados para control de alertas Promover
  const [openBloq, setOpenBloq] = useState(false);
  const [openSnackBloq, setSnackBloq] = useState(false);

  //Estados para control de alertas Promover
  const [openDes, setOpenDes] = useState(false);
  const [openSnackDes, setSnackDes] = useState(false);



  //Funciones control de alertas Borrar
  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
    setUser(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleDelete(idUser);
  };
  
  const handleSnackDelete = () => {
    setSnackDelete(false);
  };

   //Funciones control de alertas Promover
  const handleClickOpenPromote = (id) => {
    setOpenPromote(true);
    setUser(id);
  };

  const handleClosePromote = () => {
    setOpenPromote(false);
    handlePromote(idUser);
  };

  const handleSnackPromote = () => {
    setSnackPromote(false);
  }; 

   //Funciones control de alertas Bloquear
   const handleClickOpenBloq = (id) => {
    setOpenBloq(true);
    setUser(id);
  };

  const handleCloseBloq = () => {
    setOpenBloq(false);
    handleBloq(idUser);
  };

  const handleSnackBloq = () => {
    setSnackBloq(false);
  }; 

    //Funciones control de alertas Desbloquear

    const handleClickOpenDes = (id) => {
      setOpenDes(true);
      setUser(id);
    };
  
    const handleCloseDes = () => {
      setOpenDes(false);
      handleDesb(idUser);
    };
  
    const handleSnackDes = () => {
      setSnackDes(false);
    }; 
  // fin de alertas
  const handleDelete = id => {
    dispatch(deleteUser(id),
    setTooltip('Se eliminó el usuario'),
    setTimeout(() => setTooltip(''), 3000),
    setSnackDelete(true),
    [dispatch, setTooltip]);
};
  
const handleBloq = id => {
  dispatch(bloquearUser(id),
  setTooltip('Se bloqueo al usuario'),
  setTimeout(() => setTooltip(''), 3000),
  setSnackBloq(true),
  [dispatch, setTooltip]);
};

const handleDesb = id => {
  dispatch(desbloquearUser(id),
  setTooltip('Se desbloque al usuario'),
  setTimeout(() => setTooltip(''), 3000),
  setSnackDes(true),
  [dispatch, setTooltip]);
};
  const handlePromote = (id) => {
    dispatch(rolAdmin(id),
    setTooltip('Se eliminó el usuario'),
    setTimeout(() => setTooltip(''), 3000),
    setSnackPromote(true),
    [dispatch, setTooltip]);
  };

  return (
    <div classname="w-full h-screen relative" style={{ backgroundColor: "#cecece" }}>
    <Fragment>
      <div className="content">
        <div>
          <h3  style={{ color: "black" }}>Listado de Usuarios</h3>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>USUARIO</th>
                <th>EMAIL</th>
                <th>ROL</th>
                <th style={{ textAlign: "center" }}>CONTROL</th>
              </tr>
            </thead>
            <tbody>
              {user && user.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td style={{ textAlign: "center" , display: "flex" , justifyContent: "space-around"}}>
                              {/* Borrar - Promover */}
                      <Button
                      style={{ backgroundColor: "#aed581", color: "white" }}
                      variant="contained"
                      className="buttonDelete"
                      onClick={() => handleClickOpenPromote(user.id)}
                    >
                      Promover
                    </Button>
                    <Button
                      style={{ backgroundColor: "#ff8a65", color: "white" }}
                      variant="contained"
                      className="buttonDelete"
                      onClick={() => handleClickOpenBloq(user.id)}
                    >
                      <FaUserSlash />
                    </Button>
                    <Button
                      style={{ backgroundColor: "#aed581", color: "white" }}
                      variant="contained"
                      className="buttonDelete"
                      onClick={() => handleClickOpenDes(user.id)}
                    >
                      <FaUserCheck />
                    </Button>

                    <Button
                      style={{ backgroundColor: "#ff8a65", color: "white" }}
                      variant="contained"
                      className="buttonDelete"
                      onClick={() => handleClickOpenDelete(user.id)}
                    >
                      <AiFillDelete />
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
                    {/* Borrar al usuario */}
      <Dialog 
      open={openDelete} 
      onClose={handleCloseDelete} 
      aria-labelledby="alert-dialog-title" 
      aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres borrar el usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", paddingBottom: "5px" }}
          >
            Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDelete}
            color="primary"
            style={{ backgroundColor: "#ff8a65", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCloseDelete}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#aed581", color: "white" }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackDelete} autoHideDuration={6000} onClose={handleSnackDelete}>
        <Alert onClose={handleSnackDelete} severity="success" style={{backgroundColor: '#ffff5a', color: 'black'}}>
          El usuario fue borrado con exito
        </Alert> 
      </Snackbar>
              {/* Promover el usuario a admin */}
      <Dialog
        open={openPromote}
        onClose={handleClosePromote}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres promover el usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", paddingBottom: "5px" }}
          >
            Podrá acceder al Admin Panel junto con todas las funciones de un administrador.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePromote}
            color="primary"
            style={{ backgroundColor: "#ff8a65", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleClosePromote}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#aed581", color: "white" }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackPromote} autoHideDuration={6000} onClose={handleSnackPromote}>
        <Alert onClose={handleSnackPromote} severity="success" style={{backgroundColor: '#ffff5a', color: 'black'}}>
          El usuario fue promovido con exito
        </Alert> 
      </Snackbar>



            {/* Bloquer al usuario  */}
             <Dialog
        open={openBloq}
        onClose={handleCloseBloq}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres bloquear el usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", paddingBottom: "5px" }}
          >
            El usuario no podra volver a iniciar sesion en la pagina.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseBloq}
            color="primary"
            style={{ backgroundColor: "#ff8a65", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCloseBloq}
            color="primary"
            autoFocus

            style={{ backgroundColor: "#aed581", color: "white" }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackBloq} autoHideDuration={6000} onClose={handleSnackBloq}>
        <Alert onClose={handleSnackBloq} severity="success" style={{backgroundColor: '#ffff5a', color: 'black'}}>
          El usuario fue bloqueado con exito
        </Alert> 
      </Snackbar>

       {/* Desloquer al usuario  */}
       <Dialog
        open={openDes}
        onClose={handleCloseDes}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro que quieres desbloquear al usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center", paddingBottom: "5px" }}
          >
            El usuario podra acceder nuevamente a la pagina.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDes}
            color="primary"
            style={{ backgroundColor: "#ff8a65", color: "white" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCloseDes}
            color="primary"
            autoFocus
            style={{ backgroundColor: "#aed581", color: "white" }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackDes} autoHideDuration={6000} onClose={handleSnackDes}>
        <Alert onClose={handleSnackDes} severity="success" style={{backgroundColor: '#ffff5a', color: 'black'}}>
          El usuario fue desbloqueado con exito
        </Alert> 
      </Snackbar>
    </Fragment>
    </div>
  );
};
export default User;