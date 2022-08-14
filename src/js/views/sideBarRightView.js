class SideBarRightView {
  _parentElement = document.getElementById('side-menu-right');
  _makeTopHTML(state) {
    if (state.sideBarRightState === 'burger')
      return `
    
    `;
    if (state.sideBarRightState === 'min') return;
    if (state.sideBarRightState === 'max') return;
  }
  _makeMiddleHTML(state) {
    if (state.sideBarRightState === 'burger') return;
    if (state.sideBarRightState === 'min') return;
    if (state.sideBarRightState === 'max') return;
  }
  _makeBottomHTML(state) {
    if (state.sideBarRightState === 'burger') return;
    if (state.sideBarRightState === 'min') return;
    if (state.sideBarRightState === 'max') return;
  }
}

export default new SideBarRightView();
