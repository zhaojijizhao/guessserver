define(['jquery','underscore','vue','helper','text!/html/engineer/cms/layout.html'],
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
              name:"注册用户",
              link:"user"
            },
            {
              name:"问卷信息",
              link:"question"
            },
            {
              name:"打点统计",
              link:"point"
            },
            {
              name:"编辑页面",
              link:"edit"
            }
          ]
        }
      }
    });
    return layout;
});
