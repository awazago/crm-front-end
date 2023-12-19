import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PacoteDetail = () => {
  const { id } = useParams();
  const [pacote, setPacote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedNome, setEditedNome] = useState('');
  const [editedMesesDisponiveis, setEditedMesesDisponiveis] = useState([]);
  const [editedPreco, setEditedPreco] = useState('');
  const [editedImagemUrl, setEditedImagemUrl] = useState('');

  useEffect(() => {
    const fetchPacote = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pacotes/${id}`);
        setPacote(response.data);
        setEditedNome(response.data.nome);
        setEditedMesesDisponiveis(response.data.meses_disponiveis);
        setEditedPreco(response.data.preco ? response.data.preco.$numberDecimal : '');
        setEditedImagemUrl(response.data.imagem_url);
      } catch (error) {
        console.error('Erro ao obter pacote:', error);
      }
    };

    fetchPacote();
  }, [id, editMode]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/pacotes/${id}`, {
        nome: editedNome,
        meses_disponiveis: editedMesesDisponiveis,
        preco: editedPreco,
        imagem_url: editedImagemUrl,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  if (!pacote) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Detalhes do Pacote</h2>
      <p>
        <strong>ID:</strong> {pacote._id}
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
            Meses Disponíveis:
            <input
              type="text"
              value={editedMesesDisponiveis.join(', ')}
              onChange={(e) => setEditedMesesDisponiveis(e.target.value.split(', '))}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Preço:
            <input
              type="text"
              value={editedPreco}
              onChange={(e) => setEditedPreco(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Imagem URL:
            <input
              type="text"
              value={editedImagemUrl}
              onChange={(e) => setEditedImagemUrl(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <button style={styles.button} onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {pacote.nome}
          </p>
          <p>
            <strong>Meses Disponíveis:</strong> {pacote.meses_disponiveis.join(', ')}
          </p>
          <p>
            <strong>Preço:</strong> {pacote.preco ? pacote.preco.$numberDecimal : ''}
          </p>
          <img
            src={`http://localhost:8080/${pacote.imagem_url}`}
            alt={pacote.nome}
            style={styles.image}
          />
          <button style={styles.button} onClick={handleEditToggle}>Editar</button>
        </>
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
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default PacoteDetail;




/*import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PacoteDetail = () => {
  const { id } = useParams();
  const [pacote, setPacote] = useState(null);

  useEffect(() => {
    const fetchPacote = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/pacotes/${id}`);
        setPacote(response.data);
      } catch (error) {
        console.error('Erro ao obter pacote:', error);
      }
    };

    fetchPacote();
  }, [id]);

  if (!pacote) {
    return <p>Carregando...</p>;
  }

  const preco = pacote.preco ? pacote.preco.$numberDecimal : '';

  return (
    <div style={styles.container}>
      <h2>Detalhes do Pacote</h2>
      <p>
        <strong>ID:</strong> {pacote._id}
      </p>
      <p>
        <strong>Nome:</strong> {pacote.nome}
      </p>
      <p>
        <strong>Meses Disponíveis:</strong> {pacote.meses_disponiveis.join(', ')}
      </p>
      <p>
        <strong>Preço:</strong> {preco}
      </p>
      <img
        src={`http://localhost:8080/${pacote.imagem_url}`}
        alt={pacote.nome}
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default PacoteDetail;*/
