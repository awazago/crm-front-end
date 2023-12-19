import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      await axios.post('http://localhost:8080/api/clientes', {
        nome,
        cpf,
        email,
        telefone,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleCancelar = () => {
    setNome('');
    setCpf('');
    setEmail('');
    setTelefone('');
    setCep('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setEstado('');
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro de Cliente</h2>
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
            CPF:
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
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
          <label>
            Telefone:
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            CEP:
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Logradouro:
            <input
              type="text"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Número:
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Complemento:
            <input
              type="text"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Bairro:
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Cidade:
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Estado:
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
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

export default ClienteForm;
