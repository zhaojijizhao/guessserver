define(['jquery','underscore','vue','helper','text!/html/cms/secondtype.html'],
  function($,_,Vue,Helper,secondtypeTpl){
    var secondtype = Vue.extend({
      template: secondtypeTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"二级分类编号",
              key:"num",
              edit: false
            },
            {
              name:"二级分类名称",
              key:"name",
              edit: true
            },
            {
              name:"所属一级分类",
              key:"firsttypenum",
              edit: false,
              // type: "select",
              // option: 'firsttypelist'
            },
            {
              name:"二级分类创建时间",
              key:"created_at",
              edit: false,
              type: "date"
            }
          ],
          secondtypelist: [],
          options: {
            firsttypelist: []
          },
          filter: {
            firsttype: null
          }
        }
      },
      methods: {
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/secondtype',
            info: '获取二级分类列表',
            success:function(result){
              _this.secondtypelist = result;
            }
          });
        },
        getOptionList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/firsttype',
            info: '获取选项',
            success:function(result){
              _this.options.firsttypelist = result;
            }
          });
        },
        isshow: function(secondtype) {
          var result = true;
          if(this.filter.firsttype && this.filter.firsttype!=0){
            if(secondtype.firsttypenum == this.filter.firsttype) {
              result = true;
            } else {
              result = false;
            }
          }
          return result;
        },
        change: function(secondtype){
          secondtype.edit = true;
          this.$set(secondtype);
        },
        save: function(secondtype){
          var _this = this;
          if(secondtype._id){
            Helper.ajax({
              url:'/manage/secondtype/change',
              info: '修改二级分类',
              data: {secondtype},
              success:function(result){
                _this.getList();
              }
            });
          }else{
            _this.add(secondtype);
          }
        },
        remove: function(secondtype){
          var _this = this;
          Helper.ajax({
            url:'/manage/secondtype/remove',
            info: '删除二级分类',
            data: {secondtype},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(secondtype){
          var _this = this;
          Helper.ajax({
            url:'/manage/secondtype/add',
            info: '添加二级分类',
            data: {secondtype},
            success:function(result){
              _this.getList();
            }
          });
        },
        newitem: function(){
          this.secondtypelist.push({
            edit:true,
            firsttypenum:this.filter.firsttype
          });
        }
      },
      mounted: function(){
        this.getOptionList();
        this.getList();
      }
    });
    return secondtype;
});
