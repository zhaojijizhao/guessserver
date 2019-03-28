define(['jquery','underscore','vue','helper','text!/html/web/guess.html'],
  function($,_,Vue,Helper,guessTpl){
    var guess = Vue.extend({
      template: guessTpl,
      data: function(){
        return {
          user: null,
          login: {
            cell: null,
            psw: null,
            remember: true
          },
          mainid: null,
          secondid: null,
          mainlist: [],
          secondlist: [],
          showList: (location.href.indexOf('home') > -1 ? false : true),
          onclass: 0,
          timestr: new Date().toLocaleString()
        }
      },
      methods: {
        tohome: function() {
          this.onclass=0;
          location.href = "./index#/index/guess/home";
          this.showList = false;
        },
        changeguesslist: function(id) {
          this.secondid = 0;
          var self = this;
          setTimeout(() => {
            self.secondid = id;
          }, 100)
        },
        toguessmenu: function(id) {
          this.onclass=id;
          if (location.href.indexOf('home') > -1) {
            location.href = "./index#/index/guess/quest";
            this.showList = true;
          }
          if (id == 101) {
            this.changeguesslist(101);
            this.secondlist = [];
            this.showList = false;
          } else if(id == 102) {
            this.changeguesslist(102);
            this.secondlist = [];
            this.showList = false;
          } else {
            this.guessmenu(id);
            this.showList = true;
          }
        },
        guessmenu: function(id) {
          var self = this;
          var ajaxdata = {};
          ajaxdata.id = id;
          Helper.ajax({
            url:'/api/guessmenu',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.secondlist = result || [];
              self.secondid = result[0] ? result[0].num : id;
            }
          });
        },
        getNew: function() {
          var self = this;
          var ajaxdata = {};
          Helper.ajax({
            url:'/api/guessnew',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.mainlist.find((v) => (v.num == 102)).count = result.length;
            }
          });
        },
        getHot: function() {
          var self = this;
          var ajaxdata = {};
          Helper.ajax({
            url:'/api/guesshot',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.mainlist.find((v) => (v.num == 101)).count = result.length;
            }
          });
        },
        getMainList: function(){
          var self = this;
          var ajaxdata = {};
          Helper.ajax({
            url:'/api/guessmenu',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.mainlist = result || [];
              self.mainlist.unshift({
                name: '最新竞猜',
                num: 101
              });
              self.mainlist.unshift({
                name: '热门竞猜',
                num: 102
              });
              self.mainid = result[0].num;
              self.getNew();
              self.getHot();
              self.guessmenu(self.mainid);
            }
          });
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
        sp: function() {
          location.href = "./index#/index/shop/shophome";
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
        this.getMainList();
      }
    });
    return guess;
});
