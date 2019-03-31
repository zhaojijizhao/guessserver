define(['jquery','underscore','vue','helper','text!/html/engineer/h5/nav.html'],
  function($,_,Vue,Helper,navTpl){
    var nav = Vue.extend({
      template: navTpl,
      props: ['slide'],
      data: function(){
        return {
        }
      },
      methods: {
      },
      mounted: function(){
      }
    });
    return nav;
});
