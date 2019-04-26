define(['jquery','underscore','vue','helper','text!/html/salon/cms/user.html'],
  function($,_,Vue,Helper,userTpl){
    var user = Vue.extend({
      template: userTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"id",
              key:"id",
              edit: false
            },
            {
              name:"name",
              key:"name",
              edit: true
            },
            {
              name:"company",
              key:"company",
              edit: true
            },
            {
              name:"phone",
              key:"phone",
              edit: false
            },
            {
              name:"mail",
              key:"mail",
              edit: false
            },
            {
              name:"work",
              key:"work",
              edit: false
            },
            {
              name:"time",
              key:"created_at",
              edit: false,
              type: 'date'
            },
            {
              name:"ip",
              key:"ip",
              edit: false
            },
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
            url:'/salon/manage/user',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取列表',
            success:function(result){
              _this.userlist = result.list;
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
      },
      mounted: function(){
         this.getList();
      }
    });
    return user;
});
