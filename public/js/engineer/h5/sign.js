define(['jquery','underscore','vue','helper','text!/html/engineer/h5/sign.html'],
  function($,_,Vue,Helper,signTpl){
    var sign = Vue.extend({
      template: signTpl,
      data: function(){
        return {
          cell: null,
          psw: null,
          check: null
        }
      },
      methods: {
        sign: function() {
          if (this.psw != this.check) {
            alert('两次密码不一致');
          }
          var self = this;
          Helper.ajax({
            url:'/api/user',
            info: '创建用户',
            data: {
              user: {
                cell: this.cell,
                psw: this.psw,
                code: this.code
              }
            },
            success:function(result){
              Helper.setlogin({
                user: result
              });
              location.hash = '#/index/guessmenu';
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });

        }
      },
      mounted: function(){
      }
    });
    return sign;
});
