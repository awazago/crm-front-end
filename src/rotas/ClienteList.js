import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao obter clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDeleteClick = (cliente) => {
    setSelectedCliente(cliente);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${selectedCliente._id}`);
      setShowConfirmation(false);
      const response = await axios.get('http://localhost:8080/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedCliente(null);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientes = clientes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={styles.container}>
      <h2>Lista de Clientes</h2>
      <ul style={styles.list}>
        {currentClientes.map((cliente) => (
          <li key={cliente._id} style={styles.listItem}>
            <span>{cliente.nome}</span>
            <div style={styles.buttonsContainer}>
              <Link to={`/clientes/${cliente._id}`} style={styles.link}>
                <button style={styles.editButton}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>
              <button style={styles.deleteButton} onClick={() => handleDeleteClick(cliente)}>
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
          totalItemsCount={clientes.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          innerClass="pagination"
          activeClass="active"
          style={styles.paginationItem}
        />
      </div>
      <Link to="/clientes/cadastro" style={styles.buttonLink}>
        <button style={styles.button}>Adicionar Cliente</button>
      </Link>

      {showConfirmation && (
        <div style={styles.confirmationContainer}>
          <p>Deseja realmente excluir o cliente {selectedCliente?.nome}?</p>
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
    maxWidth: '400px',
    backgroundColor: 'white',
    margin: '30px auto',
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

export default ClienteList;
