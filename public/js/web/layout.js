define(['jquery','underscore','vue','helper','text!/html/web/layout.html'],
  function($,_,Vue,Helper,layoutTpl){
    var layout = Vue.extend({
      template: layoutTpl,
      data: function(){
        return {
        }
      },
      methods: {
      },
      mounted: function(){
      }
    });
    return layout;
});
