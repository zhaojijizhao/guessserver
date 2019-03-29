define(['jquery','underscore','vue','helper','text!/html/engineer/h5/gamelist.html'],
  function($,_,Vue,Helper,gamedetailTpl){
    var gamelist = Vue.extend({
      template: gamelistTpl,
      data: function(){
        return {
        }
      },
      methods: {
      },
      mounted: function(){
      }
    });
    return gamelist;
});
