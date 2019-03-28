define(['jquery','underscore','vue','helper','text!/html/web/shop.html'],
  function($,_,Vue,Helper,shopTpl){
    var guess = Vue.extend({
      template: shopTpl,
      data: function(){
        return {
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          onclass: 1,
          timestr: new Date().toLocaleString()
        }
      },
      methods: {
        tohome: function(id) {
          this.onclass = id;
          location.href = "./index#/index/shop/shophome";
        },
        tobasket:function(id) {
          this.onclass = id;
          location.href = './index#/index/shop/basket';
        },
        sp: function(id) {
          location.href = "./index#/index/guess/home";
        },
        elec: function(id) {
          this.onclass = id;
          location.href = "./index#/index/shop/elec"
        },
        rank: function(id) {
          this.onclass = id;
          location.href = "./index#/index/shop/rank"
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
    return guess;
});
