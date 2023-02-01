import { useEffect, useState } from 'react';
import './App.css';

// MUI
import CircularProgress from '@mui/material/CircularProgress';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import ListsContainer from './components/ListContainer/ListsContainer';

function App() {

  const { logIn, loading, token } = useAuth()

  useEffect(() => {
    async function login() {
      await logIn()
    }
    login()
  }, [])


  return (
    <div className="App">
      {!loading && !token ? (
        <h2>Não foi possivel fazer a autenticação</h2>
      ) : (
        (loading ? (
          <CircularProgress size={100} sx={{color:'#FFF'}} />
        ) : (
          <ListsContainer />
        ))

      )}

    </div>
  );
}

export default App;
