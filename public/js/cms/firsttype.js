define(['jquery','underscore','vue','helper','text!/html/cms/firsttype.html'],
  function($,_,Vue,Helper,firsttypeTpl){
    var firsttype = Vue.extend({
      template: firsttypeTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"一级分类编号",
              key:"num",
              edit: false
            },
            {
              name:"一级分类名称",
              key:"name",
              edit: true
            },
            {
              name:"一级分类创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          firsttypelist: []
        }
      },
      methods: {
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/firsttype',
            info: '获取一级分类列表',
            success:function(result){
              _this.firsttypelist = result;
            }
          });
        },
        change: function(firsttype){
          firsttype.edit = true;
          this.$set(firsttype);
        },
        save: function(firsttype){
          var _this = this;
          if(firsttype._id){
            Helper.ajax({
              url:'/manage/firsttype/change',
              info: '修改一级分类',
              data: {firsttype},
              success:function(result){
                firsttype.edit = false;
              }
            });
          }else{
            _this.add(firsttype);
          }
        },
        remove: function(firsttype){
          var _this = this;
          Helper.ajax({
            url:'/manage/firsttype/remove',
            info: '删除一级分类',
            data: {firsttype},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(firsttype){
          var _this = this;
          Helper.ajax({
            url:'/manage/firsttype/add',
            info: '添加一级分类',
            data: {firsttype},
            success:function(result){
              _this.getList();
            }
          });
        },
        newitem: function(){
          this.firsttypelist.push({edit:true});
        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return firsttype;
});
