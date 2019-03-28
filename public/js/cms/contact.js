define(['jquery','underscore','vue','helper','text!/html/cms/contact.html'],
  function($,_,Vue,Helper,contactTpl){
    var contact = Vue.extend({
      template: contactTpl,
      data: function(){
        return {
          contacts: []
        }
      },
      methods: {
        getinfo: function() {
          let _this = this;
          Helper.ajax({
            url:'/manage/contact',
            info: '获取联系信息',
            success:function(result){
              if (result) {
                _this.contacts = result;
              }
            }
          });
        }
      },
      mounted: function(){
        this.getinfo();
      }
    });
    return contact;
});
