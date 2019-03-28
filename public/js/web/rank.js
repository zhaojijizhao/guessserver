define(['jquery','underscore','vue','helper','text!/html/web/rank.html'],
  function($,_,Vue,Helper,rankTpl){
    var rank = Vue.extend({
      template: rankTpl,
      props:{
        user: {
          type: Object
        }
      },
      data: function(){
        return {
          ratelist: [],
          coinlist: [],
          range: [1,2,3,4,5,6,7,8,9,10],
          cellhide: Helper.cellhide
        }
      },
      methods: {
        getList: function(){
          let self = this;
          Helper.ajax({
            url:'/api/rank',
            info: '获取排行榜',
            data: {},
            success:function(result){
              self.ratelist = result.raterank;
              self.coinlist = result.coinrank;
            }
          });
        }
      },
      mounted: function(){
        this.getList();
      }
    });
    return rank;
});
