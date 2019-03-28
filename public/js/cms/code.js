define(['jquery','underscore','vue','helper','text!/html/cms/code.html'],
  function($,_,Vue,Helper,codeTpl){
    var code = Vue.extend({
      template: codeTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"推荐编号",
              key:"num",
              edit: false
            },
            {
              name:"推荐code",
              key:"code",
              edit: true
            },
            {
              name:"用户id",
              key:"unum",
              edit: true
            },
            {
              name:"是否已经用",
              key:"used",
              edit: false
            },
            {
              name:"创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          codelist: []
        }
      },
      methods: {
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/code',
            info: '获取激活码列表',
            success:function(result){
              _this.codelist = result;
            }
          });
        },
        change: function(code){
          code.edit = true;
          this.$set(code);
        },
        save: function(code){
          var _this = this;
          if(code._id){
            Helper.ajax({
              url:'/manage/code/change',
              info: '修改激活码',
              data: {code},
              success:function(result){
                _this.getList();
              }
            });
          }else{
            _this.add(code);
          }
        },
        remove: function(code){
          var _this = this;
          Helper.ajax({
            url:'/manage/code/remove',
            info: '删除激活码',
            data: {code},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(code){
          var _this = this;
          Helper.ajax({
            url:'/manage/code/add',
            info: '添加用户',
            data: {code},
            success:function(result){
              _this.getList();
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        },
        newitem: function(){
          this.codelist.push({edit:true});
        },
        create: function() {
          var _this = this;
          Helper.ajax({
            url:'/manage/code/creat',
            info: '添加code',
            success:function(result){
              _this.getList();
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });

        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return code;
});
