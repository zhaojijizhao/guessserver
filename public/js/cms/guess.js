define(['jquery','underscore','vue','helper','text!/html/cms/guess.html'],
  function($,_,Vue,Helper,guessTpl){
    var guess = Vue.extend({
      template: guessTpl,
      data: function(){
        return {
          type: 0,
          searchinfo: '',
          types: [
            {
              num: 0,
              name: '竞猜题目编号',
            },
            {
              num: 1,
              name: '截止日期',
            },
            {
              num: 2,
              name: '用户投注编号',
            }
          ],
          tablehead: [
            {
              name:"竞猜编号",
              key:"pointid",
              edit: false
            },
            {
              name:"竞猜用户编号",
              key:"unum",
              edit: false
            },
            {
              name:"竞猜题目编号",
              key:"qid",
              edit: false
            },
            {
              name:"竞猜题目",
              key:"question",
              edit: false
            },
            {
              name:"单次点数",
              key:"perpoint",
              edit: false
            },
            {
              name:"选择次数",
              key:"pit",
              edit: false
            },
            {
              name:"选项编号",
              key:"optionid",
              edit: false
            },
            {
              name:"选项名称",
              key:"option",
              edit: false
            },
            {
              name:"竞猜创建时间",
              key:"created_at",
              edit: false
            }
          ],
          guesslist: [],
          pager: {
            page: 1,
            total: 1,
            limit: 10
          }
        }
      },
      methods: {
        search: function() {
          var _this =this;
          let data= {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            };
          if (this.searchinfo) {
            if (this.type == 0) {
              data.qid = this.searchinfo;
            } else if (this.type == 1) {
              data.date = new Date(this.searchinfo);
            } else if (this.type == 2) {
              data.pointid = this.searchinfo;
            }
          }
          Helper.ajax({
            url:'/manage/guess',
            info: '获取竞猜列表',
            data: data,
            success:function(result){
              _this.guesslist = result.list;
              _this.pager.total=result.count;
            }
          });
        },
        getList: function(){
          var _this = this;
          Helper.ajax({
            url:'/manage/guess',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取竞猜列表',
            success:function(result){
              _this.guesslist = result.list;
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
          this.search();
        },
        change: function(guess){
          guess.edit = true;
          this.$set(guess);
        },
        save: function(guess){
          var _this = this;
          if(guess._id){
            Helper.ajax({
              url:'/manage/guess/change',
              info: '修改竞猜',
              data: {guess},
              success:function(result){
                guess.edit = false;
              }
            });
          }else{
            _this.add(guess);
          }
        },
        remove: function(guess){
          var _this = this;
          Helper.ajax({
            url:'/manage/guess/remove',
            info: '删除竞猜',
            data: {guess},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(guess){
          var _this = this;
          Helper.ajax({
            url:'/manage/guess/add',
            info: '添加竞猜',
            data: {guess},
            success:function(result){
              _this.getList();
            }
          });
        },
        newitem: function(){
          this.guesslist.push({edit:true});
        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return guess;
});
