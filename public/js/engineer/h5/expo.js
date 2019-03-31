define(['jquery','underscore','vue','helper','text!/html/engineer/h5/expo.html'],
  function($,_,Vue,Helper,expoTpl){
    var expo = Vue.extend({
      template: expoTpl,
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
    return expo;
});
