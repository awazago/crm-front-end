import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PacoteList = () => {
  const [pacotes, setPacotes] = useState([]);

  useEffect(() => {
    const fetchPacotes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pacotes');
        setPacotes(response.data);
      } catch (error) {
        console.error('Erro ao obter pacotes:', error);
      }
    };

    fetchPacotes();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Lista de Pacotes</h2>
      <ul style={styles.list}>
        {pacotes.map((pacote) => (
          <li key={pacote._id} style={styles.listItem}>
            <span>{pacote.nome}</span>
            <Link to={`/pacotes/${pacote._id}`} style={styles.link}>
              Detalhes
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/pacotes/cadastro" style={styles.buttonLink}>
        <button style={styles.button}>Adicionar Pacote</button>
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
};

export default PacoteList;
