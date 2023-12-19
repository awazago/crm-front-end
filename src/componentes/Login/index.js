import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validarEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fazerLogin = async () => {
    console.log('Entrou no fazerLogin');
    try {
      if (!validarEmail()) {
        console.error('E-mail inválido');
        setShowError(true);
        return;
      }

      const response = await axios.post('http://localhost:8080/login', {
        email: email,
        senha: senha,
      });

      const token = response.data.token;
      console.log('Pegou o Token ' + token);
      login(token);

      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setShowError(true); // Mostra o pop-up de erro
    }
  };

  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setShowError(false); // Limpa o pop-up de erro ao limpar os campos
  };

  return (
    <div style={styles.container}>
      <h2>Autenticação</h2>
      <div style={styles.inputContainer}>
        <label htmlFor="email">Usuário:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
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
      <button style={styles.button} onClick={fazerLogin}>
        Fazer Login
      </button>
      <button style={styles.button} onClick={limparCampos}>
        Cancelar
      </button>

      {showError && (
        <div style={styles.error}>
          Login não bem-sucedido. Verifique suas credenciais.
        </div>
      )}
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
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
