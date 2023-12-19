import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UsuarioDetail = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedNome, setEditedNome] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`);
        setUsuario(response.data);
        setEditedNome(response.data.nome);
        setEditedEmail(response.data.email);
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    };

    fetchUsuario();
  }, [id, editMode]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/usuarios/${id}`, {
        nome: editedNome,
        email: editedEmail,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Detalhes do Usuário</h2>
      <p>
        <strong>ID:</strong> {usuario._id}
      </p>
      {editMode ? (
        <>
          <label>
            Nome:
            <input
              type="text"
              value={editedNome}
              onChange={(e) => setEditedNome(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <button style={styles.button} onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <button style={styles.button} onClick={handleEditToggle}>Editar</button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '15px',
    boxSizing: 'border-box',
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

export default UsuarioDetail;
