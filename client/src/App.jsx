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

function App() {
  const location = useLocation();
  const hideMenu = ['/', '/login', '/logout'].includes(location.pathname);
  const notifications = useSelector( state => state.notifications);
  const notificationsDispatch = useDispatch();
  //const cookie = getAuthorizationCookie()
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
   {hideMenu ? <></> : <HeaderNavigation/>}
   <ToastContainer/>
   <Routes>
    <Route path='/' element={<Authentication/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='group' element={<Group/>}/>
    <Route path='locker' element={<Locker/>}/>
    <Route path='lockergroup' element={<LockerGroup/>}/>
    <Route path='settings' element={<Configuration/>}/>
    <Route path='profile' element={<Profile/>}/>
    <Route path='documentation' element={<Documentation/>}/>
    <Route path='logout' element={<Authentication/>}/>
   </Routes>
   </>
  )
}

export default App
