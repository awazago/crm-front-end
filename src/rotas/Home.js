import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: #1f628e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  .App {
    text-align: center;
  }

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  
  .App-link {
    color: #61dafb;
  }
`

function Home() {
  return (
    <AppContainer>
      
    </AppContainer>
  );
}

export default Home;
