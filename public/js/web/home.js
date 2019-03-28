define(['jquery','underscore','vue','helper','text!/html/web/home.html'],
  function($,_,Vue,Helper,homeTpl){
    var quest = Vue.extend({
      template: homeTpl,
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
          info: {
            guess: [{
              title: '本站条款',
              content: [
                // `<div class="line1">
                //     “一起竞猜吧”是一个以社会热点为竞猜主题、与您共同关注追踪社会动态的绿色站点。
                //   </div>
                //   <div class="line2">
                //     <p>体育赛事、文化娱乐、时事经济……这里有无限量酷炫竞猜等您点击。</p>
                //     <p>您可以：参与各类竞猜，跟踪社会热点</p>
                //     <p>您可以：获取焦点信息，掌握一手资讯</p>
                //     <p>您还可以：发表个人观点，与万千同好互动</p>
                // </div>
                // <div class="line1">
                //     <p>网站任务、排名奖励、商品换购……这里有无限量精彩生活等您开启。</p>
                //     <p>您可以：完成网站任务，免费获得娱乐点数</p>
                //     <p>您可以：参加竞猜活动，抢网络消费抵扣点数</p>
                //     <p>您还可以：在各大电商团购网站上换购您想要的商品</p>
                // </div>`,
                // `<div class="line1">
                //       <p>1.竞猜点数免费得，只要多多参与网站任务，就可免费获得参与竞猜游戏的点数（网站任务包括：注册、每天登录、邀请朋友注册、充值、购物等）。</p>
                //   </div>
                //   <div class="line2">
                //       <p>2.消费抵扣点数免费得，只要多多参与网站竞猜，竞猜成功后可以获得完全免费的消费抵扣点数（消费抵扣点数可用于本站合作的电商团购消费）。</p>
                //   </div>
                //   <div class="line1">
                //       <p>3.绿色竞猜，不设赔率没有庄家，所有参与竞猜活动的竞猜点数在该项竞猜结束后将被100%转换成消费抵扣点数分发给竞猜成功的用户。</p>
                //   </div>
                //   <div class="line2">
                //       <p>4.所有竞猜失败的点数将在竞猜结束后转换为消费抵扣点数按照竞猜人次平均分配给竞猜成功用户，所有竞猜成功的点数将在竞猜结束后转换为消费抵扣点数随机抽取一名或多名竞猜成功用户作为特别大奖发放。</p>
                //   </div>
                //   <div class="line1">
                //       <p>5.竞猜结果以举办该活动的官方第一时间公布的信息为准，不再更改。</p>
                //   </div>
                //   <div class="line2">
                //       <p>6.用户可自由选择参与多项竞猜，也可重复多次参与同一竞猜。</p>
                //   </div>
                //   <div class="line1">
                //       <p>7.“一起竞猜吧”会定期发放奖励给排行榜上排名居前的用户，也会定期从所有竞猜参与记录中抽取并发放奖励，参与竞猜越多中奖机会越大。</p>
                //   </div>`
              ]
            }]
          },
          guess: ''
        }
      },
      methods: {
        getinfo() {
          let self = this;
          Helper.ajax({
            url:'/api/content',
            info: '页面信息',
            success:function(result){
              if (result && result[0]) {
                self.info.guess = result[0].guess;
              }
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        },
        getguess() {
          var self = this;
          Helper.ajax({
            url:'/api/userguess',
            info: '获取竞猜历史',
            data: {
              uid: this.user.num
            },
            success:function(result){
              self.guess = result ? result.slice(0,20) : [];
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        }
      },
      mounted: function(){
        this.getinfo();
        let user = Helper.getlogin();
        if (user) {
          this.user = user.user;
          this.getguess();
        }
      }
    });
    return quest;
});
