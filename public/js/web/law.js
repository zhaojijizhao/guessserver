define(['jquery','underscore','vue','helper','text!/html/web/law.html'],
  function($,_,Vue,Helper,lawTpl){
    var law = Vue.extend({
      template: lawTpl,
      data: function(){
        return {
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          timestr: new Date().toLocaleString()
        }
      },
      methods: {
        login: function() {
          var self = this;
          Helper.ajax({
            url:'/api/login',
            info: '登录',
            data: {
              user: {
                cell: this.login.cell,
                psw: this.login.psw
              }
            },
            success:function(result){
              Helper.setlogin({
                user: result
              });
              self.user = result;
              location.hash = '#/index';
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        },
        logout: function() {
          Helper.deletelogin();
          this.user = null;
        }
      },
      mounted: function(){
        let user = Helper.getlogin();
        if (user) {
          this.user = user.user;
        }
        let self = this;
        setInterval(() => {
          self.$data.timestr = new Date().toLocaleString()
        },1000)
      }
    });
    return law;
});
