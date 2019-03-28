define(['jquery','underscore','vue','helper','text!/html/h5/personal.html'],
  function($,_,Vue,Helper,personalTpl){
    var personal = Vue.extend({
      template: personalTpl,
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
    return personal;
});
