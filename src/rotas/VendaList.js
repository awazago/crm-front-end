import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';

const VendaList = () => {
  const [vendas, setVendas] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vendas');
        setVendas(response.data);
      } catch (error) {
        console.error('Erro ao obter vendas:', error);
      }
    };

    fetchVendas();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/vendas/${id}`);
      const updatedVendas = vendas.filter((venda) => venda._id !== id);
      setVendas(updatedVendas);
    } catch (error) {
      console.error('Erro ao excluir venda:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendas = vendas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={styles.container}>
      <h2>Lista de Vendas</h2>
      <ul style={styles.list}>
        {currentVendas.map((venda) => (
          <li key={venda._id} style={styles.listItem}>
            {venda.cliente.nome} - {venda.mes}
            <div style={styles.buttonsContainer}>
              <Link to={`/vendas/${venda._id}`}>
              <button style={styles.editButton}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>
              <button style={styles.deleteButton}  onClick={() => handleDeleteClick(venda._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={vendas.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />

    <Link to="/vendas/cadastro" style={styles.buttonLink}>
       <button style={styles.button}>Nova Venda</button>
    </Link>
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
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
  },
};

export default VendaList;
