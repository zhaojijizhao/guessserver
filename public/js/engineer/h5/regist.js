define(['jquery','underscore','vue','helper','text!/html/engineer/h5/regist.html'],
  function($,_,Vue,Helper,registTpl){
    var regist = Vue.extend({
      template: registTpl,
      data: function(){
        return {
          name: '',
          company: '',
          phone: '',
          mail: '',
          work: '',
          check: false,
          showpop: false,
        }
      },
      methods: {
        submit() {
          return ;
          if (!this.name) {
            alert("姓名必填");
          } else if (!this.company) {
            alert("公司必填");
          } else if (!this.phone) {
            alert("手机必填");
          } else if (+this.phone != this.phone || this.phone.length != 11) {
            alert("手机格式错误");
          } else if (!this.mail) {
            alert("邮箱必填");
          } else if (!/\S+@\S+\.\S+/.text(this.mail)) {
            alert("邮箱格式错误");
          } else if (!this.work) {
            alert("职务必填");
          } else if (!this.check) {
            alert("请确认条款");
          } else {
            this.showpop = true;
          }
        },
        confirm() {
          alert("提交成功");
          this.$emit("finish");
        }
      },
      mounted: function(){
      }
    });
    return regist;
});
