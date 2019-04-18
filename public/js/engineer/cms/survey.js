define(['jquery','underscore','vue','helper','text!/html/engineer/cms/survey.html'],
  function($,_,Vue,Helper,surveyTpl){
    var survey = Vue.extend({
      template: surveyTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"p1",
              key:"p1",
              edit: false
            },
            {
              name:"p2",
              key:"p2",
              edit: true
            },
            {
              name:"p3",
              key:"p3",
              edit: true
            },
            {
              name:"p4",
              key:"p4",
              edit: false
            },
            {
              name:"p5",
              key:"p5",
              edit: false
            },
            {
              name:"p6",
              key:"p6",
              edit: false
            },
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
          surveylist: [],
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
            url:'/engineer/manage/survey',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取列表',
            success:function(result){
              _this.surveylist = result.list;
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
    return survey;
});
