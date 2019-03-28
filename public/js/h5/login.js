define(['jquery','underscore','vue','helper','text!/html/h5/login.html'],
  function($,_,Vue,Helper,loginTpl){
    var login = Vue.extend({
      template: loginTpl,
      data: function(){
        return {
          psw: null,
          cell: null
        }
      },
      methods: {
        login: function(){
          var self = this;
          Helper.ajax({
            url:'/api/login',
            info: '登录',
            data: {
              user: {
                cell: this.cell,
                psw: this.psw
              }
            },
            success:function(result){
              Helper.setlogin({
                user: result
              });
              location.hash = '#/index/guessmenu';
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
