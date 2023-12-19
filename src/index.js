import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './rotas/Home';
import UsuarioList from './rotas/UsuarioList';
import UsuarioForm from './rotas/UsuarioForm';
import UsuarioDetail from './rotas/UsuarioDetail';
import ClienteList from './rotas/ClienteList';
import ClienteForm from './rotas/ClienteForm';
import ClienteDetail from './rotas/ClienteDetail';
import PacoteList from './rotas/PacoteList';
import PacoteForm from './rotas/PacoteForm';
import PacoteDetail from './rotas/PacoteDetail';
import Authentication from './rotas/Authentication';
import AuthContext, { AuthProvider } from './contexts/AuthContext';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './componentes/Header';
import VendaList from './rotas/VendaList';
import VendaForm from './rotas/VendaForm';
import VendaDetail from './rotas/VendaDetail';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AuthProvider>
          <AuthContext.Consumer>
            {({ token }) => (
              <>
                {token && <Header />}
                <Routes>
                  <Route path="/" element={<Authentication />} />
                  <Route path="/usuarios" element={<UsuarioList />} />
                  <Route path="/usuarios/cadastro" element={<UsuarioForm />} />
                  <Route path="/usuarios/:id" element={<UsuarioDetail />} />
                  <Route path="/clientes" element={<ClienteList />} />
                  <Route path="/clientes/cadastro" element={<ClienteForm />} />
                  <Route path="/clientes/:id" element={<ClienteDetail />} />
                  <Route path="/pacotes" element={<PacoteList />} />
                  <Route path="/pacotes/cadastro" element={<PacoteForm />} />
                  <Route path="/pacotes/:id" element={<PacoteDetail />} />
                  <Route path="/vendas" element={<VendaList />} />
                  <Route path="/vendas/cadastro" element={<VendaForm />} />
                  <Route path="/vendas/:id" element={<VendaDetail />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </Router>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();
