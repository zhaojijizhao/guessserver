define(['jquery','underscore','vue','helper','text!/html/web/elec.html'],
  function($,_,Vue,Helper,elecTpl){
    var quest = Vue.extend({
      template: elecTpl,
      props:{
        user: {
          type: Object
        }
      },
      data: function(){
        return {
        }
      },
      methods: {
      },
      mounted: function(){
      }
    });
    return quest;
});
