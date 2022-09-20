class LoginView {
  _parentElement = document.getElementById('login-container');
  _overlay = document.querySelector('.overlay');
  _makeHTML(users) {
    const html = users.map(
      user => `       
    <div class="login-btn" data-id="${user.id}">${user.userName}</div>`
    );
    html.unshift(`   
    <div class="login-container">
    <div class="login-title-1">Mission Control</div>
    <div class="login-title-2">Log In</div>`);
    html.push(`</div>`);
    return html.join(' ');
  }
  showLogin(users, handler) {
    const html = this._makeHTML(users);
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this._parentElement.addEventListener('click', handler);
  }
  closeLogin() {
    this._parentElement.innerHTML = '';
    this.hideOverlay();
  }
  hideOverlay() {
    this._overlay.classList.add('hidden');
  }
  showOverlay() {
    this._overlay.classList.remove('hidden');
  }
  // toggleOverlay() {
  //   this._overlay.classList.contains('hidden')
  //     ? this._overlay.classList.remove('hidden')
  //     : this._overlay.classList.add('hidden');
  // }
}

export default new LoginView();
