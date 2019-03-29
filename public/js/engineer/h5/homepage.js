define(['jquery','underscore','vue','helper','text!/html/engineer/h5/homepage.html',
  '/js/engineer/h5/head.js',
  '/js/engineer/h5/expo.js',
  '/js/engineer/h5/game.js',
  '/js/engineer/h5/gamedetail.js',
  '/js/engineer/h5/gamelist.js',
  '/js/engineer/h5/gamescan.js',
  '/js/engineer/h5/main.js',
  '/js/engineer/h5/map.js',
  '/js/engineer/h5/nav.js',
  '/js/engineer/h5/regist.js',
  '/js/engineer/h5/survey.js',],
  function($,_,Vue,Helper,homepageTpl,
    headCom, expoCom, gameCom,
    gamedetailCom, gamelistCom, gamescanCom,
    mainCom, mapCom, navCom, registCom, surveyCom){
    var homepage = Vue.extend({
      template: homepageTpl,
      data: function(){
        return {
          stage: 1
        }
      },
      methods: {
        back: function () {
          var stage = this.stage;
          if ([2,3,4,5].indexOf(stage) > -1) {
            this.stage = 1;
          } else if ([6,7].indexOf(stage) > -1) {
            this.stage = 3;
          } else if ([8].indexOf(stage) > -1) {
            this.stage = 6;
          }
        },
        jump: function(page) {
          if (page > 0) {
            this.stage = page;
          } else if (page == -1) {
            window.location.href = '';
          } else if (page == -2) {
            window.location.href = '';
          }
        }
      },
      mounted: function(){
        this.swiper = new Swiper ('.swiper-container', {
          direction: 'vertical',
          loop: false,
        })
      },
      components: {
        headCom, expoCom, gameCom,
        gamedetailCom, gamelistCom, gamescanCom,
        mainCom, mapCom, navCom, registCom, surveyCom
      }
    });
    return homepage;
  });
