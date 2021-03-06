define(['jquery','underscore','vue','helper','text!/html/web/contact.html'],
  function($,_,Vue,Helper,contactTpl){
    var contact = Vue.extend({
      template: contactTpl,
      data: function(){
        return {
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          title:'',
          content: '',
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
        },
        submit: function() {
          if (!this.title) {
            alert('请填写联系方式');
            return false;
          }
          if (!this.content) {
            alert('请填写联系内容');
            return false;
          }
          Helper.ajax({
            url:'/api/contact/add',
            info: '登录',
            data: {
              contact: {
                content: this.content,
                title: this.title
              }
            },
            success:function(result){
              alert('联系信息提交成功，我们将尽快给您反馈！')
              location.href="#/";
            },
            error: function(err) {
              alert(err.responseJSON.msg || '提交失败请重新再试');
            }
          });
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
    return contact;
});
