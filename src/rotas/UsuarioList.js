import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './estilos/style.css'

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const itemsPerPage = 10;
/*const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;*/

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  //Inicio delete
  const handleDeleteClick = (usuario) => {
    setSelectedUsuario(usuario);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/usuarios/${selectedUsuario._id}`);
      setShowConfirmation(false);
      // Recarregar a lista após a exclusão
      const response = await axios.get('http://localhost:8080/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedUsuario(null);
  };
  //Fim delete

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={styles.container}>
      <h2>Lista de Usuários</h2>
      <ul style={styles.list}>
        {currentUsuarios.map((usuario) => (
          <li key={usuario._id} style={styles.listItem}>
            <span>{usuario.nome}</span>
            <div style={styles.buttonsContainer}>
              <Link to={`/usuarios/${usuario._id}`} style={styles.link}>
              <button style={styles.editButton}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>
              <button style={styles.deleteButton} onClick={() => handleDeleteClick(usuario)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div style={styles.paginationContainer}>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={usuarios.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          innerClass="pagination"
          activeClass="active"
          style={styles.paginationItem}
        />
      </div>
      <Link to="/usuarios/cadastro" style={styles.buttonLink}>
        <button style={styles.button}>Adicionar Usuário</button>
      </Link>

      {/* Pop-up de confirmação */}
      {showConfirmation && (
        <div style={styles.confirmationContainer}>
          <p>Deseja realmente excluir o usuário {selectedUsuario?.nome}?</p>
          <button onClick={handleConfirmDelete} style={styles.confirmationButton}>
            Confirmar
          </button>
          <button onClick={handleCancelDelete} style={styles.confirmationButton}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
    container: {
      backgroundColor: 'white',
      maxWidth: '400px',
      margin: '30px auto ',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: '#333',
    },
    editButton: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '8px',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '16px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '8px',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '16px',
      },
    buttonLink: {
      textDecoration: 'none',
    },
    button: {
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '16px',
      marginRight: '10px',
    },
    confirmationContainer: {
        maxWidth: '300px',
        margin: '20px auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      confirmationButton: {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '8px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        marginRight: '5px',
      },
    
  };

export default UsuarioList;
