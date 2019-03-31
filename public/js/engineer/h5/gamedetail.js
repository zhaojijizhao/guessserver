define(['jquery','underscore','vue','helper','text!/html/engineer/h5/gamedetail.html'],
  function($,_,Vue,Helper,gamedetailTpl){
    var gamedetail = Vue.extend({
      template: gamedetailTpl,
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
    return gamedetail;
});
