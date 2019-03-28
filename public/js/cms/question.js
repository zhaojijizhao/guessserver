define(['jquery','underscore','vue','helper','text!/html/cms/question.html'],
  function($,_,Vue,Helper,questionTpl){
    var question = Vue.extend({
      template: questionTpl,
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
            // {
            //   name:"单次点数",
            //   key:"perpoint",
            //   edit: false
            // },
            // {
            //   name:"总人次",
            //   key:"times",
            //   edit: false
            // },
            // {
            //   name:"总点数",
            //   key:"totalpoint",
            //   edit: false
            // },
            {
              name:"奖励金额",
              key:"awardpoint",
              edit: false,
            },
            {
              name:"奖励类型",
              key:"awardtype",
              edit: false,
              type: "select",
              option: 'awardtypes'
            },
            {
              name:"奖励分配模式",
              key:"awardmode",
              edit: false,
              type: "select",
              option: 'awardmodess'
            },
            {
              name:"状态",
              key:"state",
              edit: true,
              type: "select",
              option: 'statess'
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
            // {
            //   name:"问题",
            //   key:"question",
            //   edit: true
            // },
            // {
            //   name:"选项",
            //   key:"options",
            //   edit: true,
            //   type: 'list'
            // },
            // {
            //   name:"题目创建时间",
            //   key:"created_at",
            //   edit: false,
            //   type: 'date'
            // }
          ],
          detailhead: [
            {
              name:"题目编号",
              key:"qid",
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
              type: 'numberbtn'
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
              type: 'numberpoint'
            },
            // {
            //   name:"总人次",
            //   key:"times",
            //   edit: false,
            //   type: 'number'
            // },
            // {
            //   name:"总点数",
            //   key:"totalpoint",
            //   edit: false,
            //   type: 'number'
            // },
            {
              name:"奖励金额",
              key:"awardpoint",
              edit: true,
              type: 'number'
            },
            {
              name:"奖励类型",
              key:"awardtype",
              edit: true,          
              type: 'select',
              option: 'awardtypes',
              change: function(item, option){
                return true;
              }
            },
            {
              name:"奖励分配模式",
              key:"awardmode",
              edit: true,
              type: 'select',
              option: 'awardmodes',
              change: function(item, option){
                return true;
              }
            },
            {
              name:"状态",
              key:"state",
              edit: true,
              type: 'select',
              option: 'states',
              change: function(item, option){
                return true;
              }
            },
            {
              name:"介绍信息",
              key: "intro",
              edit: true,
              type: 'area'
            },
            // {
            //   name: "最近信息",
            //   key: "recent",
            //   edit: true,
            //   type: 'area'
            // },
            {
              name: "问题",
              key: "question",
              edit: true
            },
            {
              name: "选项",
              key: "options",
              edit: true,
              type: 'list'
            },
            {
              name: "题目创建时间",
              key: "created_at",
              edit: false,
              type: 'date'
            }
          ],
          questionlist: [],
          questiondetail: {
            round: 1,
            state: 0,
            awardtype: 0,
            awardmode: 0,
            options:[],
            optiontips:[]
          },
          options: {
            secondtypelist: [],
            firsttypelist: [],
            thirdtypelist: [],
            awardtypes: [
              {
                num:'0',
                name: '游戏点数'
              },
              {
                num:'1',
                name: '消费点数'
              },
              {
                num:'2',
                name: '消费额度'
              },
            ],
            awardmodess: [
              {
                num:'0',
                name: '全部参与人员平分'
              },
              {
                num:'1',
                name: '全部参与人会员中抽出指定人数获得'
              },
              {
                num:'2',
                name: '全部猜中人员平分'
              },
              {
                num:'3',
                name: '全部猜中人员中抽出指定人数获得'
              }
            ],
            awardmodes: [
              {
                num:'0',
                name: '全部参与人员平分'
              },
              {
                num:'2',
                name: '全部猜中人员平分'
              }
            ],
            states: [
              {
                num:'0',
                name: '进行中'
              },
              {
                num:'2',
                name: '完结'
              }
            ],
            statess: [
              {
                num:'0',
                name: '进行中'
              },
              {
                num:'1',
                name: '分配中'
              },
              {
                num:'2',
                name: '完结'
              }
            ]
          },
          date: {
          },
          filter: {
            firsttype: null,
            secondtype: null,
            thirdtype: null
          },
          classname: 'pop',
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
            url:'/manage/question',
            data: {
              limit: _this.pager.limit,
              skip: _this.pager.limit*(_this.pager.page-1)
            },
            info: '获取题目列表',
            success:function(result){
              _this.questionlist = result.list;
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
        changedetail: function(){
          this.detailhead.push({});
          this.detailhead.pop({});
        },
        toDateStr: function(str,key){
          let date = new Date(str);
          let year = date.getYear()+1900;
          let month = (date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1);
          let day = date.getDate()>9?date.getDate():'0'+date.getDate();
          let hour = date.getHours()>9?date.getHours():'0'+date.getHours();
          let minute = date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
          let result = year+'-'+month+'-'+day+"T"+hour+':'+minute;
          return result;
        },
        doublepoint: function(event,type) {
          this.questiondetail[type] = this.questiondetail[type] * 2;
          this.$forceUpdate();
        },
        addround: function(event,type) {
          this.questiondetail[type] ++;
          this.$forceUpdate();
        },
        changetime: function(event,type){
          this.questiondetail[type] = new Date(event.target.value);
          this.$forceUpdate();
        },
        isshowfiltersecond: function(option){
          return option.firsttypenum == this.filter.firsttype;
        },
        isshowfilterthird: function(option){
          return option.secondtypenum == this.filter.secondtype;
        },
        deleteanswer: function(obj, obj2, index){
          obj.splice(index,1);
          obj2.splice(index,1);
        },
        addanswer: function(obj, obj2){
          obj.push('');
          obj2.push("");
        },
        // change: function(question){
        //   question.edit = true;
        //   this.$set(question);
        // },
        detail: function(question) {
          this.classname = "pop on";
          question.optiontips = question.optiontips || [];
          this.questiondetail = question;
        },
        cancel: function() {
          this.classname = "pop";
        },
        save: function(){
          var _this = this;
          if (!_this.questiondetail.firsttypenum) {
            alert('请填写一级分类');
            return false;
          }
          if (!_this.questiondetail.secondtypenum) {
            alert('请填写二级分类');
            return false;
          }
          if (!_this.questiondetail.thirdtypenum) {
            alert('请填写三级分类');
            return false;
          }
          if (!_this.questiondetail.name) {
            alert('请填写题目名称');
            return false;
          }
          _this.questiondetail.date = _this.questiondetail.date || new Date().toISOString();
          if(_this.questiondetail._id){
            Helper.ajax({
              url:'/manage/question/change',
              info: '修改题目',
              data: {question:_this.questiondetail},
              success:function(result){
                _this.getList();
                _this.classname = "pop";
              }
            });
          }else{
            _this.add(_this.questiondetail);
          }
        },
        remove: function(question){
          var _this = this;
          Helper.ajax({
            url:'/manage/question/remove',
            info: '删除题目',
            data: {question},
            success:function(result){
              _this.getList();
            }
          });
        },
        add: function(question){
          var _this = this;
          Helper.ajax({
            url:'/manage/question/add',
            info: '添加题目',
            data: {question},
            success:function(result){
              _this.getList();
              _this.classname = "pop";
            }
          });
        },
        newitem: function(){
          this.classname = "pop on";
          this.questiondetail={
            options:[],
            optiontips:[],
            round: 1,
            firsttypenum: this.filter.firsttype,
            secondtypenum: this.filter.secondtype,
            thirdtypenum: this.filter.thirdtype
          };
        }
      },
      mounted: function(){
        this.getList();
        this.getOptionList();
      }
    });
    return question;
});
