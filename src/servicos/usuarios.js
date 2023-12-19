import axios from "axios";

const usuariosAPI = axios.create({baseURL: "http://localhost:8080/api/usuarios"})

async function getUsuarios() {
    const response = await usuariosAPI.get('/')

    return response.data
}

async function deleteUsuario(id) {
    try {
        const response = await usuariosAPI.delete(`/${id}`)
        
        if (response.status === 200) {
          console.log(`Item com ID ${id} deletado com sucesso.`)
        } else {
          console.error(`Falha ao deletar o item com ID ${id}.`)
        }
      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
}

export {
    getUsuarios,
    deleteUsuario
}