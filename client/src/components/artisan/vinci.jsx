import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
const cookie = new Cookies('x-access-token', { path: '/' });

export const renderToastNotification = (type, message, position='top-right', autoClose=1000) => {
    switch(type){
        case 'SUCCESS':
            toast.success(message, { position: position, autoClose: autoClose })
        break;
        case 'INFO':
            toast.info(message, { position: position, autoClose: autoClose })
        break;
        case 'ERROR':
            toast.error(message, { position: position, autoClose: autoClose })
        break;
        case 'WARN':
            toast.warn(message, { position: position, autoClose: autoClose })
        break;
        default:
            return false;
    }
}

export async function copyToClipboard(entity, text) {
  try {
    await navigator.clipboard.writeText(text);
    renderToastNotification('SUCCESS', `${entity} copied to clipboard!`, undefined, 2000);
    console.log('Text copied to clipboard');
  } catch (err) {
    renderToastNotification('ERROR', `Failed to copy ${entity} to clipboard!`, undefined, 2000);
    console.error(`Failed to copy text: ${text}`, err);
  }
}

export const getAuthorizationCookie = () => { let authCookie = cookie.get('x-access-token'); return authCookie; }
export const removeAuthorizationCookie = () => cookie.remove('x-access-token', { path: '/' })
