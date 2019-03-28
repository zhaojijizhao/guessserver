define(['jquery','underscore','vue','helper','text!/html/h5/layout.html'],
  function($,_,Vue,Helper,layoutTpl){
    var layout = Vue.extend({
      template: layoutTpl,
      data: function(){
        return {
          navlist: [
            {
              name:"热门竞猜",
              link:"guessmenu"
            },
            {
              name:"精彩生活",
              link:"shopmenu"
            },
            {
              name:"账户信息",
              link:""
            },
            {
              name: "登录",
              link: "login"
            },
            {
              name: "注册",
              link: "sign"
            }
          ]
        }
      },
      methods: {
        initPage: function() {
          $(".link-block .link-btn").on('click',function(e){
            $(this).siblings('.links')
              .add($(this).siblings('.mask'))
              .addClass('on');
          });
          $(".link-block .mask").on('click',function(e){
            $(this).add($(this).siblings('.links'))
              .removeClass('on');
          });
        }
      },
      mounted: function(){
        this.initPage();
      }
    });
    return layout;
});
