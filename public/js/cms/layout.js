define(['jquery','underscore','vue','helper','text!/html/cms/layout.html'],
  function($,_,Vue,Helper,layoutTpl){
    var layout = Vue.extend({
      template: layoutTpl,
      data: function(){
        return {
          navlist: [
            {
              name:"管理员",
              link:"manager"
            },
            {
              name:"用户",
              link:"user"
            },
            {
              name:"一级分类",
              link:"firsttype"
            },
            {
              name:"二级分类",
              link:"secondtype"
            },
            {
              name:"三级分类",
              link:"thirdtype"
            },
            {
              name:"题目管理",
              link:"question"
            },
            {
              name:"竞猜管理",
              link:"guess"
            },
            {
              name:"结算",
              link:"calt"
            },
            {
              name:"奖励规则",
              link:"rule"
            },
            {
              name:'首页编辑',
              link:"homepage"
            },
            {
              name:'联系信息',
              link:"contact"
            },
            {
              name:'商业合作信息',
              link:"corwork"
            },
            {
              name: "激活码",
              link: "code"
            }
          ]
        }
      }
    });
    return layout;
});
