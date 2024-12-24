import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
const cookie = new Cookies('x-access-token', { path: '/' });

export const renderToastNotification = (type, message) => {
    switch(type){
        case 'SUCCESS':
            toast.success(message, { position: 'top-right', autoClose: 1000 })
        break;
        case 'INFO':
            toast.info(message, { position: 'top-right' })
        break;
        case 'ERROR':
            toast.error(message, { position: 'top-right' })
        break;
        case 'WARN':
            toast.warn(message, { position: 'top-right' })
        break;
        default:
            return false;
    }
}

export const getAuthorizationCookie = () => { let authCookie = cookie.get('x-access-token'); return authCookie; }
export const removeAuthorizationCookie = () => cookie.remove('x-access-token', { path: '/' })
