import styled from "styled-components";

export const Input = styled.input`
    order: 1px solid #FFF;
    background: transparent;
    border: 1px solid #FFF;    
    padding: ${props => props.margem_interna || '20px 140px'};
    border-radius: 50px;
    width: ${props => props.largura || '100px'};
    color: ${props => props.cor || '#FFF'};
    font-size: ${props => props.tamanho_fonte || '16px'};
    margin-bottom: 10px;
    display: ${props => props.disposicao || 'flex'};
    margin-top: ${props => props.margem_superior || '1px'};

    &::placeholder {
        color: #CCC;
        font-size: 16px;
    }
`