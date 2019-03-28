define(['jquery','underscore','vue','helper','text!/html/cms/small.html'],
  function($,_,Vue,Helper,smallTpl){
    var small = Vue.extend({
      template: smallTpl,
      data: function(){
        return {
          hasuser:false,
          hasguess:false
        }
      },
      methods: {
        checkuser: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/user',
            info: '',
            success:function(result){
              _this.hasuser = result.has;
              _this.$forceUpdate();
            }
          });
        },
        checkguess: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/guess',
            info: '',
            success:function(result){
              _this.hasguess = result.has;
              _this.$forceUpdate();
            }
          });
        },
        startuser: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/user/start',
            info: '',
            success:function(result){
              alert('成功');
              _this.checkuser();
            },
            error: function(result) {
              alert('失败');
              _this.checkuser();
            }
          });
        },
        stopuser: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/user/stop',
            info: '',
            success:function(result){
              alert('成功');
              _this.checkuser();
            },
            error: function(result) {
              alert('失败');
              _this.checkuser();
            }
          });
        },
        startguess: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/guess/start',
            info: '',
            success:function(result){
              alert('成功');
              _this.checkguess();
            },
            error: function(result) {
              alert('失败');
              _this.checkguess();
            }
          });
        },
        stopguess: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/auto/guess/stop',
            info: '',
            success:function(result){
              alert('成功');
              _this.checkguess();
            },
            error: function(result) {
              alert('失败');
              _this.checkguess();
            }
          });
        },
      },
      mounted: function(){
        this.checkuser();
        this.checkguess();
      }
    });
    return small;
});
