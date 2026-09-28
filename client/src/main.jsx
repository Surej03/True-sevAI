import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'
import { useEffect, useState } from 'react'
import Loader from './components/Loader.jsx'

const Main = () =>{
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  },[])

  return loading ? <Loader/> :(
    <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(<Main/>)