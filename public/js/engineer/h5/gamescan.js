define(['jquery','underscore','vue','helper','text!/html/engineer/h5/gamescan.html'],
  function($,_,Vue,Helper,gamescanTpl){
    var gamescan = Vue.extend({
      template: gamescanTpl,
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
    return gamescan;
});
