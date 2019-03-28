define(['jquery','underscore','vue','helper','text!/html/web/search.html'],
  function($,_,Vue,Helper,searchTpl){
    var search = Vue.extend({
      template: searchTpl,
      data: function(){
        return {
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          timestr: new Date().toLocaleString(),
          guess: []
        }
      },
      methods: {
        getresult(item) {
          return (item.final == item.optionid) ? '正确': '错误'
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
        logout: function() {
          Helper.deletelogin();
          this.user = null;
        },
        getguess() {
          var self = this;
          Helper.ajax({
            url:'/api/userguess',
            info: '获取竞猜历史',
            data: {
              uid: this.user.num
            },
            success:function(result){
              self.guess = result ? result.slice(0,20) : [];
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        }
      },
      mounted: function(){
        let user = Helper.getlogin();
        if (user) {
          this.user = user.user;
        }
        this.getguess();
        let self = this;
        setInterval(() => {
          self.$data.timestr = new Date().toLocaleString()
        },1000)
      }
    });
    return search;
});
