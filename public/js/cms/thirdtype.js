define(['jquery','underscore','vue','helper','text!/html/cms/thirdtype.html'],
  function($,_,Vue,Helper,thirdtypeTpl){
    var thirdtype = Vue.extend({
      template: thirdtypeTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"三级分类编号",
              key:"num",
              edit: false
            },
            {
              name:"三级分类名称",
              key:"name",
              edit: true
            },
            {
              name:"所属一级分类",
              key:"firsttypenum",
              edit: false,
              // type: 'select',
              // option: 'firsttypelist',
            },
            {
              name:"所属二级分类",
              key:"secondtypenum",
              edit: false,
              // type: 'select',
              // option: 'secondtypelist',
              // change: function(item, option){
              //   return item.firsttypenum == option.firsttypenum;
              // }
            },
            {
              name:"三级分类创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          thirdtypelist: [],
          options: {
            secondtypelist: [],
            firsttypelist: []
          },
          filter: {
            firsttype: null,
            secondtype: null
          }
        }
      },
      methods: {
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/thirdtype',
            info: '获取三级分类列表',
            success:function(result){
              _this.thirdtypelist = result;
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
          Helper.ajax({
            url:'/manage/secondtype',
            info: '获取选项',
            success:function(result){
              _this.options.secondtypelist = result;
            }
          });
        },
        isshowfiltersecond: function(option){
          return option.firsttypenum == this.filter.firsttype;
        },
        isshow: function(option) {
          var result = true;
          if(this.filter.firsttype && this.filter.firsttype!=0){
            if(option.firsttypenum != this.filter.firsttype) {
              result = false;
            }
          }
          if(this.filter.secondtype && this.filter.secondtype!=0){
            if(option.secondtypenum != this.filter.secondtype) {
              result = false;
            }
          }
          return result;
        },
        change: function(thirdtype){
          thirdtype.edit = true;
          this.$set(thirdtype);
        },
        save: function(thirdtype){
          var _this = this;
          if(thirdtype._id){
            Helper.ajax({
              url:'/manage/thirdtype/change',
              info: '修改三级分类',
              data: {thirdtype},
              success:function(result){
                _this.getList();
              }
            });
          }else{
            _this.add(thirdtype);
          }
        },
        remove: function(thirdtype){
          var _this = this;
          Helper.ajax({
            url:'/manage/thirdtype/remove',
            info: '删除三级分类',
            data: {thirdtype},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(thirdtype){
          var _this = this;
          Helper.ajax({
            url:'/manage/thirdtype/add',
            info: '添加三级分类',
            data: {thirdtype},
            success:function(result){
              _this.getList();
            }
          });
        },
        newitem: function(){
          this.thirdtypelist.push({
            edit:true,
            firsttypenum: this.filter.firsttype,
            secondtypenum: this.filter.secondtype
          });
        }
      },
      mounted: function(){
        this.getList();
        this.getOptionList();
      }
    });
    return thirdtype;
});
