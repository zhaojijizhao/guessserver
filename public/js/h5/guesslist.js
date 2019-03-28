define(['jquery','underscore','vue','helper','text!/html/h5/guesslist.html'],
  function($,_,Vue,Helper,guesslistTpl){
    var guessList = Vue.extend({
      template: guesslistTpl,
      data: function(){
        return {
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
            url:'/api/guesslist',
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
    return guessList;
});
