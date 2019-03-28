define(['jquery','underscore','vue','helper','text!/html/cms/calt.html'],
  function($,_,Vue,Helper,caltTpl){
    var question = Vue.extend({
      template: caltTpl,
      data: function(){
        return {
          tablehead: [
            {
              name:"题目编号",
              key:"qid",
              edit: false
            },
            // {
            //   name:"一级分类",
            //   key:"firsttypenum",
            //   edit: false
            // },
            // {
            //   name:"二级分类",
            //   key:"secondtypenum",
            //   edit: false
            // },
            // {
            //   name:"三级分类",
            //   key:"thirdtypenum",
            //   edit: true
            // },
            {
              name:"题目名称",
              key:"name",
              edit: true
            },
            {
              name:"轮次",
              key:"round",
              edit: true
            },
            {
              name:"截止日期",
              key:"date",
              edit: true,
              type: 'date'
            },
            {
              name:"单次点数",
              key:"perpoint",
              edit: false
            },
            {
              name:"总人次",
              key:"times",
              edit: false
            },
            {
              name:"总点数",
              key:"totalpoint",
              edit: false
            },
            {
              name:"状态",
              key:"state",
              edit: true,
              type: 'state'
            },
            // {
            //   name:"介绍信息",
            //   key:"intro",
            //   edit: true
            // },
            // {
            //   name:"最近信息",
            //   key:"recent",
            //   edit: true
            // },
            {
              name:"问题",
              key:"question",
              edit: true
            },
            {
              name:"选项",
              key:"options",
              edit: true,
              type: 'list'
            },
            {
              name:"题目创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          detailhead: [
            {
              name:"题目编号",
              key:"num",
              edit: false
            },
            {
              name:"一级分类",
              key:"firsttypenum",
              edit: true,
              type: 'select',
              option: 'firsttypelist',
            },
            {
              name:"二级分类",
              key:"secondtypenum",
              edit: true,
              type: 'select',
              option: 'secondtypelist',
              change: function(item, option){
                return item.firsttypenum == option.firsttypenum;
              }
            },
            {
              name:"三级分类",
              key:"thirdtypenum",
              edit: true,
              type: 'select',
              option: 'thirdtypelist',
              change: function(item, option){
                return item.secondtypenum == option.secondtypenum;
              }
            },
            {
              name:"题目名称",
              key:"name",
              edit: true
            },
            {
              name:"轮次",
              key:"round",
              edit: true,
              type: 'number'
            },
            {
              name:"截止日期",
              key:"date",
              edit: true,
              type: "date"
            },
            {
              name:"单次点数",
              key:"perpoint",
              edit: true,
              type: 'number'
            },
            {
              name:"总人次",
              key:"times",
              edit: false,
              type: 'number'
            },
            {
              name:"总点数",
              key:"totalpoint",
              edit: false,
              type: 'number'
            },
            {
              name:"状态",
              key:"state",
              edit: true
            },
            {
              name:"介绍信息",
              key:"intro",
              edit: true,
              type: 'area'
            },
            {
              name:"最近信息",
              key:"recent",
              edit: true,
              type: 'area'
            },
            {
              name:"问题",
              key:"question",
              edit: true
            },
            {
              name:"选项",
              key:"options",
              edit: true,
              type: 'list'
            },
            {
              name:"题目创建时间",
              key:"created_at",
              edit: false,
              type: 'date'
            }
          ],
          questionlist: [],
          questiondetail: {
            options:[]
          },
          options: {
            secondtypelist: [],
            firsttypelist: [],
            thirdtypelist: [],
            states: {
              '0': '进行中',
              '1': '分配中',
              '2': '完结'
            }
          },
          date: {
          },
          filter: {
            firsttype: null,
            secondtype: null,
            thirdtype: null
          },
          pager: {
            page: 1,
            total: 1,
            limit: 10
          }
        }
      },
      methods: {
        geton(date) {
          let onday = new Date(date).getTime() < (Date.now() + 24*60*60*1000);
          return onday ? 'on': '';
        },
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/question',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取题目列表',
            success:function(result){
              _this.questionlist = result.list.filter((v) => (
                  v.state != 2
                )).sort((p, n) => {
                if (p.date > n.date) {
                  return 1;
                } else if (p.date < n.date) {
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
          Helper.ajax({
            url:'/manage/thirdtype',
            info: '获取选项',
            success:function(result){
              _this.options.thirdtypelist = result;
            }
          });
        },
        isshowfiltersecond: function(option){
          return option.firsttypenum == this.filter.firsttype;
        },
        isshowfilterthird: function(option){
          return option.secondtypenum == this.filter.secondtype;
        },
        calt: function(question){
          var check = confirm('是否确认结算该题目？');
          if (!check) {
            return false;
          }
          if (question.date > Date.now()) {
            check = confirm('改题目结束时间晚于当前时间，确认是否要结算？');
          }
          if (!check) {
            return false;
          }
          if (question.final == undefined) {
            alert('请选择选项');
            return false;
          }

          var _this = this;
          Helper.ajax({
            url:'/manage/question/calt',
            info: '结算题目',
            data: {question:question},
            success:function(result){
              _this.getList();
            }
          });
        }
      },
      mounted: function(){
        this.getList();
        this.getOptionList();
      }
    });
    return question;
});
