define(['jquery','underscore','vue','helper','text!/html/cms/homepage.html'],
  function($,_,Vue,Helper,homepageTpl){
    var homepage = Vue.extend({
      template: homepageTpl,
      data: function(){
        return {
          content: {
            guess: {
              title: '',
              content: ['','']
            },
            shop: {
              title: '',
              content: ['']
            },
          },
          imglist: ['','','']
        }
      },
      methods: {
        getinfo: function() {
          let _this = this;
          Helper.ajax({
            url:'/manage/content',
            info: '获取内容',
            success:function(result){
              if (result && result[0]) {
                _this.content.guess = result[0].guess[0];
                _this.content.shop = result[0].shop[0];
                _this.content._id=result[0]._id;
              }
            }
          });
        },
        save: function() {
          var url = '/manage/content/add';
          if (this.content._id) {
            url = '/manage/content/change';
          }
          var self = this;
          var content = this.content;
          Helper.ajax({
            url: url,
            info: '保存内容',
            data: {content},
            success: function(result) {
              self.getinfo();
            }
          });
        },
        insertimg: function(index) {
          var url = this.imglist[index];
          this.imglist[index] = '';
          if (index == 0) {
            this.content.guess.content[0] += `<img src="${url}" />`;
          }else if (index == 1) {
            this.content.guess.content[1] += `<img src="${url}" />`;
          }else if (index == 2) {
            this.content.shop.content[0] += `<img src="${url}" />`;
          }
          this.$forceUpdate();
        },
        input: function(index) {
          this.$forceUpdate();
        }
      },
      mounted: function(){
        this.getinfo();
      }
    });
    return homepage;
});
