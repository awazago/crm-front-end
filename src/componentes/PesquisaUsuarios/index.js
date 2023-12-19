import { Input } from '../Input'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getUsuarios } from '../../servicos/usuarios'



const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #00F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 270px;
    width: 100%
`
const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

function PesquisaUsuarios (){
    const [UsuariosPesquisados, setUsuariosPesquisados] = useState([])
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
       fetchUsuarios() 
    }, [])

    async function fetchUsuarios() {
        const usuariosDaAPI = await getUsuarios()
        setUsuarios(usuariosDaAPI)
    }

    return (
        <PesquisaContainer>
            <Input 
                placeholder="Que usuário procura?"
                onBlur={evento => {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = usuarios.filter( usuario => usuario.nome.includes(textoDigitado))
                    setUsuariosPesquisados(resultadoPesquisa)
                }}
            />
            {
                UsuariosPesquisados.map( usuario => (
                    <Resultado>
                        <p>{usuario.nome}</p>
                    </Resultado>
                ))
            }
        </PesquisaContainer>
    )
}

export default PesquisaUsuarios