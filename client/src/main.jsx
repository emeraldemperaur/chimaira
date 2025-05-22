import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/cinzel'
import '@fontsource-variable/inter';
import '@fontsource-variable/karla';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { applicationStore } from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={applicationStore}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>
)
