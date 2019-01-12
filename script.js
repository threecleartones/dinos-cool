$(document).ready(function() {

  const updateHot = () => {
    if (localStorage.getItem('hot')) {
      const getHot = localStorage.getItem('hot');
      const parseHot = parseInt(getHot);
      const addHot = parseHot + 1;
      
      localStorage.setItem('hot', addHot);
    } else {
      localStorage.setItem('hot', 1);
    }
    toggleBtnLnk();
  }

  const toggleBtnLnk = () => {
    $('.buttons-container, .next-dino, .find-out').toggleClass('hidden');
  }

  const getHotPicks = () => {
    let getHot = localStorage.getItem('hot');
    
    if (getHot === null) {
      getHot = 0;
    }
    
    return getHot;
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('hot');
  }

  $('.btn.hot').on('click', updateHot);
  $('.btn.not').on('click', toggleBtnLnk);
  $('.hot-picks').text(getHotPicks);
  $('.begin-game, .play-again').on('click', clearLocalStorage);
});
