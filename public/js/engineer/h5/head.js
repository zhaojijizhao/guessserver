define(['jquery','underscore','vue','helper','text!/html/engineer/h5/head.html'],
  function($,_,Vue,Helper,headTpl){
    var head = Vue.extend({
      template: headTpl,
      data: function(){
        return {
        }
      },
      methods: {
        back: function () {
          this.$emit('back');
        }
      },
      mounted: function(){
      }
    });
    return head;
});
