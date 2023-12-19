import logo from '../../imagens/gerais/logo.svg'
import styled from 'styled-components'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
`
const LogoImage = styled.img`
    margin-right: 10px;
    width: ${props => props.largura || '300px'};
    height: ${props => props.altura || '300px'};
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage 
                src={logo} 
                alt='Logo' 
                className='logo-img'
            />
        </LogoContainer>
    )
}

export default Logo