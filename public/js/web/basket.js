define(['jquery','underscore','vue','helper','text!/html/web/basket.html'],
  function($,_,Vue,Helper,basketTpl){
    var basket = Vue.extend({
      template: basketTpl,
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
          total: 0,
          goods: [
            {
              name: '[狂欢价]百深电脑椅家用办公椅升降转椅现代借鉴人体工程学游戏靠背座椅',
              price: '123',
              num: 1,
              pic: '/img/web/3.jpg',
              has: 3
            },
            {
              name: '最新至尊版lg美颜手机，高分辨率美颜手机韩国正版美颜lg',
              price: '1877',
              num: 1,
              pic: '/img/web/4.jpg',
              has: 3
            },
            {
              name: 'samsung s8+,三星s8+最新旗舰版盖乐世手机，三星顶配手机',
              price: '4999',
              num: 1,
              pic: '/img/web/1.jpg',
              has: 3
            },
            {
              name: '施华洛世奇小白金，经典款项链',
              price: '4999',
              num: 1,
              pic: '/img/web/2.jpg',
              has: 3
            }
          ]
        }
      },
      computed: {
        canbuy() {
          let moneyeless = this.total > ((this.user || {}).coin || 0);
          let timeok = (((new Date().getHours()) > 11) && ((new Date().getHours()) < 12)) ||
          (((new Date().getHours()) > 15) && ((new Date().getHours()) < 16));
          return moneyeless || !timeok;
        }
      },
      methods: {
        gettotal() {
          let t = 0;
          let goods = this.goods;
          goods.map((v) => {
            if (v.checked) {
              t += (+v.num)*(+v.price);
            }
          });
          this.total = t;
        },
        change(event,item) {
          item.checked = event.target.checked;
          this.$forceUpdate();
          this.gettotal();
        },
        plus(item) {
          if (item.num < item.has) {
            item.num ++;
          }
          this.gettotal();
        },
        minus(item) {
          if (item.num > 0) {
            item.num --;
          }
          this.gettotal();
        },
        buy() {
          alert("购物成功！即将跳转支付！");
        }
      },
      mounted: function(){
        if (!this.user) {
          let user = Helper.getlogin();
          if (user) {
            this.user = user.user;
          }
        }
      }
    });
    return basket;
});
