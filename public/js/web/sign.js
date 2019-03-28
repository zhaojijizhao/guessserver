define(['jquery','underscore','vue','helper','text!/html/web/sign.html'],
  function($,_,Vue,Helper,signTpl){
    var sign = Vue.extend({
      template: signTpl,
      data: function(){
        return {
          popshow: false,
          sendshow: false,
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          form: {
            cell: null,
            psw: null,
            check: null,
            read: false
          },
          timestr: new Date().toLocaleString()
        }
      },
      methods: {
        closeitem: function() {
          this.popshow = false;
        },
        closesend: function() {
          this.sendshow = false;
        },
        item: function() {
          this.popshow = true;
        },
        forget: function() {
          this.sendshow = true;
        },
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
        sign: function() {
          if (!this.form.code) {
            alert('请填写注册码');
            return false;
          }
          if (!this.form.cell || !this.form.psw) {
            alert('请填写完整信息');
            return false;
          }
          if (!this.form.read) {
            alert('请阅读条款');
            return false;
          }
          if (this.form.psw != this.form.check) {
            alert('两次密码不一致');
            return false;
          }
          var self = this;
          Helper.ajax({
            url:'/api/user',
            info: '创建用户',
            data: {
              user: {
                cell: this.form.cell,
                psw: this.form.psw,
                code: this.form.code
              }
            },
            success:function(result){
              Helper.setlogin({
                user: result
              });
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
    return sign;
});
