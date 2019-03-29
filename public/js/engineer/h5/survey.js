define(['jquery','underscore','vue','helper','text!/html/engineer/h5/survey.html'],
  function($,_,Vue,Helper,surveyTpl){
    var survey = Vue.extend({
      template: surveyTpl,
      data: function(){
        return {
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5: "",
          p6: ''
        }
      },
      methods: {
        change() {

        },
        submit() {
          if (!this.p1 || !this.p2 ||!this.p3||!this.p4||!this.p5||!this.p6) {
            alert("信息没有填写完整！");
          } else {
            alert("感谢填写问卷");
            this.$emit('finish');
          }
        }
      },
      mounted: function(){
      }
    });
    return survey;
});
