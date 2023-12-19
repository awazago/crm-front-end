import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Opcoes = styled.ul` 
  display: flex;
`

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  min-width: 120px;
  cursor: pointer;
  font-weight: bold;
  padding: 14px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  color: #000;
  
`

const textoOpcoes = ['HOME', 'USUARIOS', 'CLIENTES', 'PACOTES', 'VENDAS']

function OpcoesHeader() {
  return (
    <Opcoes>
        { textoOpcoes.map( (texto) => (
            <Link to={`/${texto.toLowerCase()}`} ><Opcao><p>{texto}</p></Opcao></Link>
        ) ) }
    </Opcoes>
  )
}

export default OpcoesHeader