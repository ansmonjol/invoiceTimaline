import { graph } from 'shared/graph'
import { Storage } from 'shared/storage'

/**
 * logoutQL
 * @return {[type]}      [description]
 */
function logoutQL({ token }) {
  return graph(`{ logout(token: "${token}") } `);
}

export class Logout {

  static logout() {
    const sessions = Storage.get('me', []);
    const currentSession = Storage.get('meCurrent');
    const sessionsNew = [];
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      if (session.token !== currentSession.token) sessionsNew.push(session)
    }

    Storage.remove('meCurrent');
    if (sessionsNew.length === 0) {
      Storage.remove('me');
      Storage.remove('isLogged');
    } else {
      Storage.set('meCurrent', sessionsNew[0]);
      Storage.set('me', sessionsNew);
    }
    logoutQL({ token: currentSession.token }).then(() => {
      const language = Storage.get('language');
      localStorage.clear(); // v2
      Storage.set('language', language);
      window.location.reload();
    });
  }
}
