define(['jquery','underscore','vue','helper','text!/html/web/quest.html'],
  function($,_,Vue,Helper,questTpl){
    var quest = Vue.extend({
      template: questTpl,
      props:{
        user: {
          type: Object
        },
        secondlist: {
          type: Array
        },
        secondid: {
          type: Number
        }
      },
      data: function(){
        return {
          guesslist: [],
          awardtypes: ['全部参与人员平分', '全部参与人会员中抽出指定人数获得', '全部猜中人员平分', '全部猜中人员中抽出指定人数蝴蝶'],
          awardmodes: ['游戏点数', '消费点数', '消费额度']
        }
      },
      methods: {
        changeChoose: function(event, k, key) {
          var index = event.target.selectedIndex;
          var item = this.guesslist[k].list[key];
          var content = item.options[index];
          item.option = {
            optionid: index,
            option: content,
            optiontip: item.optiontips[index]
          };
          this.$forceUpdate();
        },
        submit: function(item) {
          if (!this.user) {
            alert('请先登录');
            return;
          }
          if (!item.choose) {
            alert('请选择竞猜次数');
            return;
          }
          var data = {
            id: item.num,
            optionid: item.option ? item.option.optionid : 0,
            option: item.option ? item.option.option : item.options[0],
            pit: item.choose,
            unum: this.user.num,
            qnum: item.num,
            question: item.question,
            perpoint: item.perpoint,
            qid: item.qid,
            date: new Date(item.date),
            pointid: item.qid+''+this.user.cell+Date.now()
            // token: token
          };
          Helper.ajax({
            url:'/api/guess',
            info: '竞猜',
            data: data,
            success:function(result){
              alert('竞猜成功！');
            }
          });
        },
        getDetail: function(item) {
          var self = this;
          var ajaxdata = {};
          ajaxdata.id = item.num;
          Helper.ajax({
            url:'/api/guessdetail',
            info: '获取详情',
            data: ajaxdata,
            success:function(result){
              item.detail = result[0] || {};
              self.guesslist.push({});
              self.guesslist.pop();
            }
          });
        },
        getDetails: function() {
          var self = this;
          this.guesslist.map((v, k) => {
            self.getDetail(v);
          })
        },
        changeShow: function(item, key) {
          item.show = !item.show;
          this.guesslist.push({});
          this.guesslist.pop();
        },
        getlistsitem(item) {
          var self = this;
          var ajaxdata = {};
          ajaxdata.id = item.num;
          Helper.ajax({
            url:'/api/guesslists',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              item.list = result ? result.filter((v) => (v.state == 0)).sort((n, p) => {
                if (new Date(n.created_at) > new Date(p.created_at)) {
                  return 1;
                } else if (new Date(n.created_at) < new Date(p.created_at)){
                  return -1;
                } else {
                  return 0;
                }
              }) : [];
              self.guesslist.push({});
              self.guesslist.pop();
              setTimeout(() => {
                sosh('.datasetconfig', {
                    sites: ['weixin,','weibo', 'qzone']
                 });
              }, 300);
              
            }
          });
        },
        getlists: function() {
          var self = this;
          self.guesslist.map((v) => {
            self.getlistsitem(v);
          })
        },
        getList: function(id){
          var self = this;
          var ajaxdata = {};
          ajaxdata.id = id;
          Helper.ajax({
            url:'/api/guesslist',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.guesslist = result || [];
              self.getlists();
            }
          });
        },
        getNew: function() {
          var self = this;
          var ajaxdata = {};
          Helper.ajax({
            url:'/api/guessnew',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.guesslist = [{
                list: result ? result.filter((v) => (v.state == 0)).sort((n, p) => {
                if (new Date(n.created_at) > new Date(p.created_at)) {
                  return 1;
                } else if (new Date(n.created_at) < new Date(p.created_at)){
                  return -1;
                } else {
                  return 0;
                }
              }) : [],
                name: '最新竞猜'
              }]
            }
          });
        },
        getHot: function() {
          var self = this;
          var ajaxdata = {};
          Helper.ajax({
            url:'/api/guesshot',
            info: '获取列表',
            data: ajaxdata,
            success:function(result){
              self.guesslist = [{
                list: result ? result.filter((v) => (v.state == 0)).sort((n, p) => {
                if (new Date(n.created_at) > new Date(p.created_at)) {
                  return 1;
                } else if (new Date(n.created_at) < new Date(p.created_at)){
                  return -1;
                } else {
                  return 0;
                }
              }) : [],
                name: '热门竞猜'
              }]
            }
          });
        }
      },
      watch: {
        secondid(next, prev) {
          if (next == 101) {
            this.getNew();
          } else if(next == 102) {
            this.getHot();
          } else {
            this.getList(next);
          }
        }
      },
      mounted: function(){
        this.getList(this.secondid);
      }
    });
    return quest;
});
