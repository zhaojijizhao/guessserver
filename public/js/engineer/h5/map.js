define(['jquery','underscore','vue','helper','text!/html/engineer/h5/map.html'],
  function($,_,Vue,Helper,mapTpl){
    var map = Vue.extend({
      template: mapTpl,
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
    return map;
});
