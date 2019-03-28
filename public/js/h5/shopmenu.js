define(['jquery','underscore','vue','helper','text!/html/h5/shopmenu.html'],
  function($,_,Vue,Helper,shopmenuTpl){
    var shopMenu = Vue.extend({
      template: shopmenuTpl,
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
    return shopMenu;
});
