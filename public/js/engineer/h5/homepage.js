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
        }
      },
      methods: {
      },
      mounted: function(){
      },
      components: {
        headCom, expoCom, gameCom,
        gamedetailCom, gamelistCom, gamescanCom,
        mainCom, mapCom, navCom, registCom, surveyCom
      }
    });
    return homepage;
});
