import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, useLocation} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import 'react-toastify/dist/ReactToastify.min.css';
import HeaderNavigation from './components/navigation/headerNavigation'
import Authentication from './components/authentication'
import Dashboard from './components/dashboard'
import Group from './components/group'
import Locker from './components/locker'
import LockerGroup from './components/lockergroup'
import Profile from './components/profile'
import Documentation from './components/documentation'
import Configuration from './components/configuration'
import { getAuthorizationCookie, renderToastNotification } from './components/artisan/vinci'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotifications } from './store/reducers/notifications'
import { isAuthenticated } from './store/actions/users'
import Virgil from './components/artisan/virgil'

function App() {
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
  }, [hideMenu, notifications]);

  useEffect(()=> {
    notificationsDispatch(isAuthenticated())
  }, [])
  
  return (
   <>
   {hideMenu ? <></> : <HeaderNavigation users={userstore}/>}
   <ToastContainer stacked/>
   <Routes>
    <Route path='/' element={<Authentication users={userstore}/>}/>
    <Route path='dashboard' element={<Virgil><Dashboard users={userstore}/></Virgil>}/>
    <Route path='group' element={<Virgil><Group users={userstore}/></Virgil>}/>
    <Route path='locker' element={<Virgil><Locker users={userstore}/></Virgil>}/>
    <Route path='lockergroup' element={<Virgil><LockerGroup users={userstore}/></Virgil>}/>
    <Route path='settings' element={<Virgil><Configuration users={userstore}/></Virgil>}/>
    <Route path='profile' element={<Virgil><Profile users={userstore}/></Virgil>}/>
    <Route path='documentation' element={<Virgil><Documentation users={userstore}/></Virgil>}/>
    <Route path='logout' element={<Authentication users={userstore}/>}/>
   </Routes>
   </>
  )
}

export default App
