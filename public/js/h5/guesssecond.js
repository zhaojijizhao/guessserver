define(['jquery','underscore','vue','helper','text!/html/h5/guesssecond.html'],
  function($,_,Vue,Helper,guesssecondTpl){
    var guessSecond = Vue.extend({
      template: guesssecondTpl,
      data: function(){
        return {
          id: 0,
          list: []
        }
      },
      methods: {
        getList: function(){
          var self = this;
          var ajaxdata = {};
          if(self.id){
            ajaxdata.id = self.id;
          }
          Helper.ajax({
            url:'/api/guessmenu',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.list = result || [];
            }
          });
        }
      },
      mounted: function(){
        if(this.$route.params.id){
          this.id = this.$route.params.id;
        }
        this.getList();
      }
    });
    return guessSecond;
});
