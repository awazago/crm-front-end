import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VendaDetail = () => {
  const { id } = useParams();
  const [venda, setVenda] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    cliente: '',
    pacote: '',
    usuario: '',
    mes: '',
    dias: '',
    preco: '',
  });

  useEffect(() => {
    const fetchVenda = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/vendas/${id}`);
        setVenda(response.data);
        setFormData({
          cliente: response.data.cliente._id,
          pacote: response.data.pacote._id,
          usuario: response.data.usuario._id,
          mes: response.data.mes,
          dias: response.data.dias,
          preco: response.data.preco,
        });
      } catch (error) {
        console.error('Erro ao obter venda:', error);
      }
    };

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
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchVenda();
    fetchClientes();
    fetchPacotes();
    fetchUsuarios();
  }, [id, editMode]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/vendas/${id}`, formData);
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  if (!venda) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Detalhes da Venda</h2>
      <p>
        <strong>ID:</strong> {venda._id}
      </p>
      {editMode ? (
        <>
          <label>
            Cliente:
            <select
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione um Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Pacote:
            <select
              value={formData.pacote}
              onChange={(e) => setFormData({ ...formData, pacote: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione um Pacote</option>
              {pacotes.map((pacote) => (
                <option key={pacote._id} value={pacote._id}>
                  {pacote.nome}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Usuário:
            <select
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
              style={styles.input}
            >
              <option value="">Selecione um Usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                  {usuario.nome}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Mês:
            <input
              type="text"
              value={formData.mes}
              onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Dias:
            <input
              type="text"
              value={formData.dias}
              onChange={(e) => setFormData({ ...formData, dias: e.target.value })}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Preço:
            <input
              type="text"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              style={styles.input}
            />
          </label>
          <br />
          <button style={styles.button} onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <p>
            <strong>Cliente:</strong> {venda.cliente.nome}
          </p>
          <p>
            <strong>Pacote:</strong> {venda.pacote.nome}
          </p>
          <p>
            <strong>Usuário:</strong> {venda.usuario.nome}
          </p>
          <p>
            <strong>Mês:</strong> {venda.mes}
          </p>
          <p>
            <strong>Dias:</strong> {venda.dias}
          </p>
          <p>
            <strong>Preço:</strong> {venda.preco}
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

export default VendaDetail;
