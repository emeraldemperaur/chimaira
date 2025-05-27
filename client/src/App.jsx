import { useEffect } from 'react'
import { Route, Routes, useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.min.css';
import HeaderNavigation from './components/navigation/headerNavigation'
import Authentication from './components/authentication'
import Dashboard from './components/dashboard'
import Profile from './components/profile'
import Documentation from './components/documentation'
import Configuration from './components/configuration'
import { renderToastNotification } from './components/artisan/vinci'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotifications } from './store/reducers/notifications.reducer'
import { isAuthenticated } from './store/actions/users.actions'
import Virgil from './components/artisan/virgil'
import RAGArtifacts from './components/rag-artifacts';
import ContextProfiles from './components/context-profiles';
import QueryModels from './components/query-models';
import Footer from './components/artisan/footer';
import axios from 'axios';

function App() {
  const baseAPIUrl = 'https://chimaira.sliplane.app';
  axios.defaults.baseURL = baseAPIUrl;
  const location = useLocation();
  const hideMenu = ['/', '/login', '/logout'].includes(location.pathname);
  const notifications = useSelector( state => state.notifications);
  const notificationsDispatch = useDispatch();
  const userstore = useSelector( state => state.users );
  useEffect(()=> {
    let { global } = notifications;
    if(notifications && global.error){
      const errorMessage = global.message ? global.message: 'Error encountered!';
      renderToastNotification('ERROR', errorMessage);
      notificationsDispatch(clearNotifications());
    }
    if(notifications && global.success){
      const successMessage = global.message ? global.message: 'Success!';
      renderToastNotification('SUCCESS', successMessage);
      notificationsDispatch(clearNotifications());
    }
    if(notifications && global.info){
      const infoMessage = global.message ? global.message: 'Info!';
      renderToastNotification('INFO', infoMessage);
      notificationsDispatch(clearNotifications());
    }
    if(notifications && global.warn){
      const warnMessage = global.message ? global.message: 'Warning!';
      renderToastNotification('WARN', warnMessage);
      notificationsDispatch(clearNotifications());
    }
    document.body.style = 'background: #ffffff';
  }, [hideMenu, notifications, notificationsDispatch]);

  useEffect(()=> {
    notificationsDispatch(isAuthenticated())
  }, [notificationsDispatch])
  
  return (
   <>
   <div className='mobile'><p className='mobile-msg'>Please view on Desktop or Tablet for optimal experience</p><Footer/></div>
   <div className='desktop'>
   {hideMenu ? <></> : <HeaderNavigation users={userstore}/>}
   <ToastContainer style={{zIndex: 999999}} stacked/>
   <Routes>
    <Route path='/' element={<Authentication users={userstore}/>}/>
    <Route path='dashboard' element={<Virgil><Dashboard users={userstore}/></Virgil>}/>
    <Route path='context-profile' element={<Virgil><ContextProfiles users={userstore}/></Virgil>}/>
    <Route path='query-model' element={<Virgil><QueryModels users={userstore}/></Virgil>}/>
    <Route path='rag-artifacts' element={<Virgil><RAGArtifacts users={userstore}/></Virgil>}/>
    <Route path='settings' element={<Virgil><Configuration users={userstore}/></Virgil>}/>
    <Route path='profile' element={<Virgil><Profile users={userstore}/></Virgil>}/>
    <Route path='documentation' element={<Virgil><Documentation users={userstore}/></Virgil>}/>
    <Route path='logout' element={<Authentication users={userstore}/>}/>
   </Routes>
   </div>
   </>
  )
}

export default App
