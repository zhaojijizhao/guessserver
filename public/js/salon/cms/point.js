define(['jquery','underscore','vue','helper','text!/html/salon/cms/point.html'],
  function($,_,Vue,Helper,pointTpl){
    var point = Vue.extend({
      template: pointTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"id",
              key:"id",
              edit: false
            },
            {
              name:"time",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          pointlist: [],
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
            url:'/salon/manage/point',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取列表',
            success:function(result){
              _this.pointlist = result.list;
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
    return point;
});
