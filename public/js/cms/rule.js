define(['jquery','underscore','vue','helper','text!/html/cms/rule.html'],
  function($,_,Vue,Helper,ruleTpl){
    var rule = Vue.extend({
      template: ruleTpl,
      data: function(){
        return {
          awards: [
            {
              num: 1,
              name: '新用户注册',
              point: 0,
              coin: 0,
              bouns: 1
            },
            // {
            //   num: 2,
            //   name: '邀请用户',
            //   point: 0,
            //   coin: 0,
            //   bouns: 1
            // },
            {
              num: 2,
              name: '每日登陆',
              point: 0,
              coin: 0,
              bouns: 1
            },
            {
              num: 3,
              name: '连续一个月登陆',
              point: 0,
              coin: 0,
              bouns: 1
            }
          ]
        }
      },
      methods: {
        getinfo: function() {
          let _this = this;
          Helper.ajax({
            url:'/manage/award',
            info: '获取奖励配置',
            success:function(result){
              if (result) {
                result.map((v, k) => {
                  _this.awards.map((value, key) => {
                    if (v.num == value.num) {
                      _this.awards[key] = v;
                    }
                  });
                });
                _this.$forceUpdate();
              }
            }
          });
        },
        save: function(item) {
          var self = this;
          var url = '/manage/award/add';
          if (item._id) {
            url = '/manage/award/change';
          }
          var award = item;
          Helper.ajax({
            url: url,
            info: '更新奖励配置',
            data: {award},
            success:function(result){
              self.getinfo();
            }
          });
        }
      },
      mounted: function(){
        this.getinfo();
      }
    });
    return rule;
});
