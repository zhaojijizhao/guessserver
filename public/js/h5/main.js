define(['jquery','underscore','vue','helper','text!/html/h5/main.html'],
  function($,_,Vue,Helper,mainTpl){
    var main = Vue.extend({
      template: mainTpl,
      data: function(){
        return {
        }
      },
      methods: {
        getList: function(){

        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return main;
});
