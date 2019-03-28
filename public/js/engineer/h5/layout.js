define(['jquery','underscore','vue','helper','text!/html/engineer/h5/layout.html'],
  function($,_,Vue,Helper,layoutTpl){
    var layout = Vue.extend({
      template: layoutTpl,
      data: function(){
        return {
          navlist: [
            {
              name:"1",
              link:"guessmenu"
            },
            {
              name:"2",
              link:"shopmenu"
            },
            {
              name:"3",
              link:""
            },
            {
              name: "4",
              link: "login"
            },
            {
              name: "小游戏",
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
