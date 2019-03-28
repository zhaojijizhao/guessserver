define(['jquery','underscore','vue','helper','text!/html/cms/user.html'],
  function($,_,Vue,Helper,userTpl){
    var user = Vue.extend({
      template: userTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"用户编号",
              key:"num",
              edit: false
            },
            {
              name:"用户手机",
              key:"cell",
              edit: true
            },
            {
              name:"用户密码",
              key:"psw",
              edit: true,
              type:'password'
            },
            {
              name:"用户游戏点数",
              key:"point",
              edit: false
            },
            {
              name:"用户消费点数",
              key:"coin",
              edit: false
            },
            {
              name: "用户消费额度",
              key: "limit",
              edit: false
            },
            {
              name:"用户创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            },
            {
              name:"用户更新时间",
              key:"update_at",
              edit: false,
              type: 'date'
            }
          ],
          userlist: [],
          pager: {
            page: 1,
            total: 1,
            limit: 10
          }
        }
      },
      methods: {
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/user',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取用户列表',
            success:function(result){
              _this.userlist = result.list.sort((n, p)=> {
                if (n.num > p.num) {
                  return 1;
                } else if (n.num< p.num) {
                  return -1;
                } else {
                  return 0;
                }
              });
              _this.pager.total=result.count;
            }
          });
        },
        page: function(index) {
          if (index == "start") {
            this.pager.page = 1;
          } else if (index == 'end') {
            this.pager.page = Math.ceil(this.pager.total/this.pager.limit);
          } else {
            this.pager.page = this.pager.page+index;
          }
          this.getList();
        },
        change: function(user){
          user.edit = true;
          this.$set(user);
        },
        save: function(user){
          var _this = this;
          if(user._id){
            Helper.ajax({
              url:'/manage/user/change',
              info: '修改用户',
              data: {user},
              success:function(result){
                _this.getList();
              }
            });
          }else{
            _this.add(user);
          }
        },
        remove: function(user){
          var _this = this;
          Helper.ajax({
            url:'/manage/user/remove',
            info: '删除用户',
            data: {user},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(user){
          var _this = this;
          Helper.ajax({
            url:'/manage/user/add',
            info: '添加用户',
            data: {user},
            success:function(result){
              _this.getList();
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        },
        newitem: function(){
          this.userlist.push({edit:true});
        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return user;
});
