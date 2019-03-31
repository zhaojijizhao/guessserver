define(['jquery','underscore','vue','helper','text!/html/engineer/h5/gamelist.html'],
  function($,_,Vue,Helper,gamelistTpl){
    var gamelist = Vue.extend({
      template: gamelistTpl,
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
    return gamelist;
});
