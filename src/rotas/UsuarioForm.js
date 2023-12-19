import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const UsuarioForm = ({ history }) => {
  const UsuarioForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      await axios.post('http://localhost:8080/api/usuarios', {
        nome,
        email,
        senha,
      });
      //history.push('/usuarios');
      navigate('/usuarios'); 
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleCancelar = () => {
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro de Usuário</h2>
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
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
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

export default UsuarioForm;
