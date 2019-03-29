define(['jquery','underscore','vue','helper','text!/html/engineer/h5/head.html'],
  function($,_,Vue,Helper,headTpl){
    var head = Vue.extend({
      template: headTpl,
      props: ['stage', 'slide'],
      data: function(){
        return {
        }
      },
      computed: {
        style() {
          return (this.stage==1 && [0, 1].indexOf(this.slide) > -1) ? 'on' : '';
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
