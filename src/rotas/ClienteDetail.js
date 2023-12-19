import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClienteDetail = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedNome, setEditedNome] = useState('');
  const [editedCpf, setEditedCpf] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedTelefone, setEditedTelefone] = useState('');
  const [editedCep, setEditedCep] = useState('');
  const [editedLogradouro, setEditedLogradouro] = useState('');
  const [editedNumero, setEditedNumero] = useState('');
  const [editedComplemento, setEditedComplemento] = useState('');
  const [editedBairro, setEditedBairro] = useState('');
  const [editedCidade, setEditedCidade] = useState('');
  const [editedEstado, setEditedEstado] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/clientes/${id}`);
        setCliente(response.data);
        setEditedNome(response.data.nome);
        setEditedCpf(response.data.cpf);
        setEditedEmail(response.data.email);
        setEditedTelefone(response.data.telefone);
        setEditedCep(response.data.cep);
        setEditedLogradouro(response.data.logradouro);
        setEditedNumero(response.data.numero);
        setEditedComplemento(response.data.complemento);
        setEditedBairro(response.data.bairro);
        setEditedCidade(response.data.cidade);
        setEditedEstado(response.data.estado);
      } catch (error) {
        console.error('Erro ao obter cliente:', error);
      }
    };

    fetchCliente();
  }, [id, editMode]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/clientes/${id}`, {
        nome: editedNome,
        cpf: editedCpf,
        email: editedEmail,
        telefone: editedTelefone,
        cep: editedCep,
        logradouro: editedLogradouro,
        numero: editedNumero,
        complemento: editedComplemento,
        bairro: editedBairro,
        cidade: editedCidade,
        estado: editedEstado,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  if (!cliente) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Detalhes do Cliente</h2>
      <p>
        <strong>ID:</strong> {cliente._id}
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
            CPF:
            <input
              type="text"
              value={editedCpf}
              onChange={(e) => setEditedCpf(e.target.value)}
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
          <label>
            Telefone:
            <input
              type="text"
              value={editedTelefone}
              onChange={(e) => setEditedTelefone(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            CEP:
            <input
              type="text"
              value={editedCep}
              onChange={(e) => setEditedCep(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Logradouro:
            <input
              type="text"
              value={editedLogradouro}
              onChange={(e) => setEditedLogradouro(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Número:
            <input
              type="text"
              value={editedNumero}
              onChange={(e) => setEditedNumero(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Complemento:
            <input
              type="text"
              value={editedComplemento}
              onChange={(e) => setEditedComplemento(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Bairro:
            <input
              type="text"
              value={editedBairro}
              onChange={(e) => setEditedBairro(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Cidade:
            <input
              type="text"
              value={editedCidade}
              onChange={(e) => setEditedCidade(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Estado:
            <input
              type="text"
              value={editedEstado}
              onChange={(e) => setEditedEstado(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <button style={styles.button} onClick={handleSave}>Salvar</button>
        </>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {cliente.nome}
          </p>
          <p>
            <strong>CPF:</strong> {cliente.cpf}
          </p>
          <p>
            <strong>Email:</strong> {cliente.email}
          </p>
          <p>
            <strong>Telefone:</strong> {cliente.telefone}
          </p>
          <p>
            <strong>CEP:</strong> {cliente.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {cliente.logradouro}
          </p>
          <p>
            <strong>Número:</strong> {cliente.numero}
          </p>
          <p>
            <strong>Complemento:</strong> {cliente.complemento}
          </p>
          <p>
            <strong>Bairro:</strong> {cliente.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {cliente.cidade}
          </p>
          <p>
            <strong>Estado:</strong> {cliente.estado}
          </p>
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
};

export default ClienteDetail;
