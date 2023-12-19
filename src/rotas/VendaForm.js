import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const VendaForm = () => {
  const { user } = useContext(AuthContext);

  const [clientes, setClientes] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [todosUsuarios, setTodosUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    cliente: '',
    pacote: '',
    usuario: '',
    mes: '',
    dias: '',
    preco: '',
  });
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao obter clientes:', error);
      }
    };

    const fetchPacotes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pacotes');
        setPacotes(response.data);
      } catch (error) {
        console.error('Erro ao obter pacotes:', error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios');
        setTodosUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchClientes();
    fetchPacotes();
    fetchUsuarios();
  }, []);

  const handlePacoteChange = (e) => {
    const pacoteSelecionado = e.target.value;
    const pacoteEncontrado = pacotes.find((pacote) => pacote.nome === pacoteSelecionado);

    if (pacoteEncontrado) {
      setMesesDisponiveis(pacoteEncontrado.meses_disponiveis);
    } else {
      setMesesDisponiveis([]);
    }

    setFormData({
      ...formData,
      pacote: pacoteSelecionado,
      mes: '', // Limpar o campo de mês ao selecionar um novo pacote
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Procurar o cliente pelo nome
      const clienteEncontrado = clientes.find((cliente) => cliente.nome === formData.cliente);

      // Procurar o pacote pelo nome
      const pacoteEncontrado = pacotes.find((pacote) => pacote.nome === formData.pacote);

      if (clienteEncontrado && pacoteEncontrado) {
        const vendaData = {
          cliente: clienteEncontrado._id,
          pacote: pacoteEncontrado._id,
          usuario: formData.usuario,
          mes: formData.mes,
          dias: formData.dias,
          preco: formData.preco,
        };

        await axios.post('http://localhost:8080/api/vendas', vendaData);
        navigate('/vendas');
      } else {
        console.error('Cliente ou pacote não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro de Venda</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label>
            Cliente:
            <select
              name="cliente"
              value={formData.cliente}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente.nome}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Pacote:
            <select
              name="pacote"
              value={formData.pacote}
              onChange={handlePacoteChange}
              style={styles.input}
            >
              <option value="">Selecione um pacote</option>
              {pacotes.map((pacote) => (
                <option key={pacote._id} value={pacote.nome}>
                  {pacote.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Usuário:
            <select
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="">Selecione um usuário</option>
              {todosUsuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={styles.inputContainer}>
        <label>
            Mês:
            <select
            name="mes"
            value={formData.mes}
            onChange={handleInputChange}
            style={styles.input}
            >
            <option value="">Selecione um mês</option>
            {mesesDisponiveis.map((mes) => (
                <option key={mes} value={mes}>
                {mes}
                </option>
            ))}
            </select>
        </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Dias:
            <input
              type="text"
              name="dias"
              value={formData.dias}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputContainer}>
          <label>
            Preço:
            <input
              type="text"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              style={styles.input}
            />
          </label>
        </div>
        <button style={styles.button} type="submit">
          Cadastrar
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

export default VendaForm;
