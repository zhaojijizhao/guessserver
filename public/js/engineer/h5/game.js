define(['jquery','underscore','vue','helper','text!/html/engineer/h5/game.html'],
  function($,_,Vue,Helper,gameTpl){
    var game = Vue.extend({
      template: gameTpl,
      props: ['classname'],
      data: function(){
        return {
        }
      },
      methods: {
      },
      mounted: function(){
      }
    });
    return game;
});
