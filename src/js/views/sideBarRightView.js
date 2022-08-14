class SideBarRightView {
  _parentElement = document.getElementById('side-menu-right');
  _makeTopHTML(state) {
    if (state.sideBarRightState === 'burger')
      return `
      <div class="icon-button side-menu-btn" data-btn="burger-burger">
      <i class="fa-solid fa-bars"></i>
      </div>
    `;
    if (state.sideBarRightState === 'min')
      return `
    <div class="icon-button side-menu-btn" data-btn="min-burger">
      <i class="fa-solid fa-bars-staggered"></i>
    </div>
    <div class="icon-button side-menu-btn" data-btn="min-arrow">
      <i class="fa-solid fa-angle-left"></i>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="user">
      <div class="icon-button">
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="current">
      <div class="icon-button">
        <i class="fa-solid fa-thumbtack"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="available">
      <div class="icon-button">
        <i class="fa-solid fa-location-dot"></i>
      </div>
    </div>
    `;
    if (state.sideBarRightState === 'max')
      return `
    <div class="side-menu-title-container">

      <div class="side-menu-item-title">
        <div class="side-menu-title">Mission Control</div>
      </div>
      <div class="icon-button side-menu-btn" data-btn="max-burger">
        <i class="fa-solid fa-bars-staggered"></i>
      </div>
    </div>
    <div class="icon-button side-menu-btn" data-btn="max-arrow">
      <i class="fa-solid fa-angle-right"></i>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="user">
      <div class="side-menu-item-title"><div>${state.user[0].userName}</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="current">
      <div class="side-menu-item-title"><div>Current Mission</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-thumbtack"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="available">
      <div class="side-menu-item-title"><div>Available Missions</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-location-dot"></i>
      </div>
    </div>
    `;
  }
  _makeMiddleHTML(state) {
    if (state.sideBarRightState === 'burger') return '';
    if (state.sideBarRightState === 'min')
      return `
    <div class="side-menu-item-container side-menu-btn" data-btn="create">
      <div class="icon-button">
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>
    `;
    if (state.sideBarRightState === 'max')
      return `
    <div class="side-menu-item-container side-menu-btn" data-btn="create">
      <div class="side-menu-item-title"><div>Create New Mission</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-plus"></i>
      </div>
    </div>   
    `;
  }
  _makeBottomHTML(state) {
    if (state.sideBarRightState === 'burger') return '';
    if (state.sideBarRightState === 'min')
      return `
    <div class="side-menu-item-container side-menu-btn" data-btn="settings">
      <div class="icon-button">
        <i class="fa-solid fa-gear"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="logout">
      <div class="icon-button">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
    `;
    if (state.sideBarRightState === 'max')
      return `
    <div class="side-menu-item-container side-menu-btn" data-btn="settings">
      <div class="side-menu-item-title"><div>Settings</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-gear"></i>
      </div>
    </div>
    <div class="side-menu-item-container side-menu-btn" data-btn="logout">
      <div class="side-menu-item-title"><div>Log Out</div></div>
      <div class="icon-button">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
    `;
  }
  _makeHTML(state) {
    const html = [
      `<div class="side-menu-right">`,
      this._makeTopHTML(state),
      this._makeMiddleHTML(state),
      this._makeBottomHTML(state),
      `</div>`,
    ].join(' ');
    return html;
  }
  renderSideBar(state, handler) {
    const html = this._makeHTML(state);
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this._parentElement.addEventListener('click', handler);
  }
}

export default new SideBarRightView();
