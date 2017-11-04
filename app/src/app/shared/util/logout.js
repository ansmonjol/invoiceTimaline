export class Logout {

  static logout() {
    localStorage.clear();
    window.location.reload();
  }

}
