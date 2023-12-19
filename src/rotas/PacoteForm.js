import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PacoteForm = () => {
  const [nome, setNome] = useState('');
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(null);

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('meses_disponiveis', JSON.stringify(mesesDisponiveis));
      formData.append('preco', preco);
      formData.append('imagem', imagem);

      await axios.post('http://localhost:8080/api/pacotes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/pacotes');
    } catch (error) {
      console.error('Erro ao cadastrar pacote:', error);
    }
  };

  const handleCancelar = () => {
    setNome('');
    setMesesDisponiveis([]);
    setPreco('');
    setImagem(null);
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro de Pacote</h2>
      <form>
        <div style={styles.inputContainer}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Meses Disponíveis:
            <input
              type="text"
              value={mesesDisponiveis.join(', ')}
              onChange={(e) => setMesesDisponiveis(e.target.value.split(', '))}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Preço:
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Imagem:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
              style={styles.input}
            />
          </label>
        </div>
        <button style={styles.button} type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
        <button style={styles.button} type="button" onClick={handleCancelar}>
          Cancelar
        </button>
      </form>
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
};

export default PacoteForm;
