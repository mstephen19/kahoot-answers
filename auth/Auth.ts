import { setCookies, getCookie, removeCookies } from 'cookies-next';
import decode from 'jwt-decode';

import { TOKEN } from './constants';

class Auth {
    setToken(token: string) {
        setCookies(TOKEN, token);
    }

    getToken() {
        return getCookie(TOKEN) || null;
    }

    isTokenExpired(token: string) {
        const decoded: any = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            removeCookies(TOKEN);
            return true;
        }
        return false;
    }

    validateToken() {
        const token = this.getToken() as string;

        if (!token) return false;

        return !this.isTokenExpired(token);
    }
}

export default new Auth();
