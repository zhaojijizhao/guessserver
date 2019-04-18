define(['jquery','underscore','vue','helper','text!/html/salon/cms/layout.html'],
  function($,_,Vue,Helper,layoutTpl){
    var layout = Vue.extend({
      template: layoutTpl,
      data: function(){
        return {
          navlist: [
            {
              name:"用户",
              link:"user"
            },
            {
              name:"打点",
              link:"point"
            },
          ]
        }
      }
    });
    return layout;
});
