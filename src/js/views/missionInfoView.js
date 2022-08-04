class MissionInfoView {
  _parentElement = document.getElementById('mission-info-view-container');
  _makeHTML(mission) {
    const html = `
    <div class="popup-container">
    <div class="popup-name-container">
    <div class="popup-name">${mission.name}</div>
    <i class="fa-solid fa-rectangle-xmark fa-2x btn-popup-close"></i>
    </div>
    <div class="popup-instructions">${mission.instructions}</div>
    <div class="popup-details-container">
    <div class="popup-details-reward-text">Your reward will be: <span class="popup-details-reward-item"">${
      mission.reward
    }</span></div>
    <div class="popup-details-availability">${
      mission.available ? 'Mission available' : 'Mission unavailable'
    }</div>
    </div>
    <div class="popup-btn-container">
    <div class="pop-up-distance">${mission.route.properties.distance.toFixed(
      2
    )}km</div>
    <div class="popup-btn-accept"><span class="popup-btn-accept-txt">accept</span><i class="fa-solid fa-circle-check fa-2x popup-btn btn-2" data-id="${
      mission._id
    }" data-id="usersBtm"></i></div>
    </div>
    </div>
    `;
    console.log(html);

    return html;
  }
  showMissionInfo(mission, handler) {
    // console.log(mission);
    const html = this._makeHTML(mission);
    this._parentElement.innerHTML = '';

    this._parentElement.insertAdjacentHTML('afterbegin', html);
    const btnClose = document.querySelector('.btn-popup-close');
    btnClose.addEventListener('click', handler);
  }
  clearMissionInfo() {
    this._parentElement.innerHTML = '';
  }
}

export default new MissionInfoView();
