$(document).ready(function() {

  // base object
  const dinoCoolOrNot = {}

  // cache selectors
  dinoCoolOrNot.init = () => {
    dinoCoolOrNot.viewIntro = $('body').hasClass('view-into');
    dinoCoolOrNot.viewDino = $('body').hasClass('view-dino');
    dinoCoolOrNot.viewScore = $('body').hasClass('view-score');

    dinoCoolOrNot.btnCool = $('.btn.cool');
    dinoCoolOrNot.btnNot = $('.btn.not');
    dinoCoolOrNot.photoDino = $('.photo-dino');
    dinoCoolOrNot.coolPicks = $('.cool-picks');
    dinoCoolOrNot.totalDinos = $('.total-dinos');
  }

  // go to the next page
  dinoCoolOrNot.nextPage = () => {
    if ($('body').hasClass('last')) {
      $('.buttons-container, .find-out, .photo-dino').toggleClass('hidden');
    } else {
      $('.next-dino')[0].click();
    }
  }

  // check if "cool" exists in localstorage and if so increment its value
  dinoCoolOrNot.updateCool = () => {
    if (localStorage.getItem('cool')) {
      const getCool = localStorage.getItem('cool');
      const parseCool = parseInt(getCool);
      const addCool = parseCool + 1;
      
      localStorage.setItem('cool', addCool);
    } else {
      localStorage.setItem('cool', 1);
    }

    dinoCoolOrNot.nextPage();
  }

  // retrieve the value for "cool" from localstorage
  dinoCoolOrNot.getCoolPicks = () => {
    let getCool = localStorage.getItem('cool');
    
    if (getCool === null) {
      getCool = 0;
    }

    return getCool;
  }

  // clear localstorage
  dinoCoolOrNot.clearLocalStorage = () => {
    localStorage.removeItem('cool');
    localStorage.removeItem('dino');
  }

  // populate dino images
  dinoCoolOrNot.imagePath = () => {
    if (dinoCoolOrNot.viewDino) {
      dinoCoolOrNot.photoDino.attr('src', 'images/' + $dinoName + '.jpg');
    }
  }

  // update dino names in localstorage
  dinoCoolOrNot.storeDinoName = () => {
    if (dinoCoolOrNot.viewDino) {
      if (localStorage.getItem('dino')) {
        const getDino = localStorage.getItem('dino');
        const parseDino = JSON.parse(getDino);
        parseDino.push($dinoName);
        localStorage.setItem('dino', JSON.stringify(parseDino));
      } else {
        localStorage.setItem('dino', '[' + '"' + $dinoName + '"' + ']');
      }
    }
  }

  // array-ify dino in localstorage
  dinoCoolOrNot.arrayDino = () => {
    if (localStorage.getItem('dino')) {
      const getDino = localStorage.getItem('dino');
      parseDino = JSON.parse(getDino);
      return parseDino;
    }
  }

  // compile list of dinos from array
  dinoCoolOrNot.dinoList = () => {
    if (dinoCoolOrNot.viewScore) {
      dinoCoolOrNot.arrayDino();

      for (let i = 0; i < parseDino.length; i++) {
        $('.dino-list').append(`<li>${parseDino[i]}</li>`);
      }
    }
  }

  // 
  dinoCoolOrNot.didIWin = () => {
    if (dinoCoolOrNot.viewScore) {
      dinoCoolOrNot.arrayDino();
      const coolPicks = parseInt(dinoCoolOrNot.getCoolPicks());
      
      if (coolPicks == parseDino.length) {
        $('.did-i-win').text('You won, because... ALL DINOSAURS ARE COOL!!!');
      } else {
        $('.did-i-win').text('This was a trick quiz because... ALL DINOSAURS ARE COOL, LOSER!!!');
      }

      return dinoCoolOrNot.arrayDino().length;
    }
  }

  // handle grammar plurals on score page
  dinoCoolOrNot.pluralizeDino = () => {
    const coolPicks = parseInt(dinoCoolOrNot.getCoolPicks());

    if (dinoCoolOrNot.viewScore && coolPicks !== 1) {
      $('.plural-picks').toggleClass('hidden');
    }
  }

  // calls, actions
  dinoCoolOrNot.init();

  dinoCoolOrNot.imagePath();
  dinoCoolOrNot.storeDinoName();
  dinoCoolOrNot.didIWin();
  dinoCoolOrNot.dinoList();
  dinoCoolOrNot.pluralizeDino();

  dinoCoolOrNot.btnCool.on('click', dinoCoolOrNot.updateCool);
  dinoCoolOrNot.btnNot.on('click', dinoCoolOrNot.nextPage);
  dinoCoolOrNot.coolPicks.text(dinoCoolOrNot.getCoolPicks);
  dinoCoolOrNot.totalDinos.text(dinoCoolOrNot.didIWin);
  $('.begin-game, .play-again').on('click', dinoCoolOrNot.clearLocalStorage);
});
