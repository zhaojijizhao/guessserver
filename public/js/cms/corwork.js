define(['jquery','underscore','vue','helper','text!/html/cms/corwork.html'],
  function($,_,Vue,Helper,corworkTpl){
    var corwork = Vue.extend({
      template: corworkTpl,
      data: function(){
        return {
          corworks: []
        }
      },
      methods: {
        getinfo: function() {
          let _this = this;
          Helper.ajax({
            url:'/manage/corwork',
            info: '获取商务合作',
            success:function(result){
              if (result) {
                _this.corworks = result;
              }
            }
          });
        }
      },
      mounted: function(){
        this.getinfo();
      }
    });
    return corwork;
});
