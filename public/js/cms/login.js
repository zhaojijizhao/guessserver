define(['jquery','underscore','vue','helper','text!/html/cms/login.html'],
  function($,_,Vue,Helper,loginTpl){
    var login = Vue.extend({
      template: loginTpl,
      data: function(){
        return {
          name:'',
          psw:''
        }
      },
      methods: {
        login: function(manager){
          var self = this;
          if(!this.name || !this.psw) {
            alert('请填写登录信息！');
            return false;
          }
          Helper.ajax({
            url:'/manage/manager/login',
            info: '登录',
            data: {
              name: this.name,
              psw: this.psw
            },
            success:function(result){
              Helper.setmanager({
                manager: result[0]
              });
              location.hash = '#/index';
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        }
      },
      mounted: function(){
      }
    });
    return login;
});
