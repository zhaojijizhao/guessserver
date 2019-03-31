define(['jquery','underscore','vue','helper','text!/html/engineer/h5/survey.html'],
  function($,_,Vue,Helper,surveyTpl){
    var survey = Vue.extend({
      template: surveyTpl,
      props: ['classname'],
      data: function(){
        return {
          p1: [],
          p2: [],
          p3: "",
          p4: [],
          p5: "",
          p6: []
        }
      },
      methods: {
        change() {
        },
        changep(arr, e, limit) {
          var checked = e.target.checked;
          var value = e.target.value;
          if (checked) {
            if (arr.indexOf(value) == -1) {
              if (limit && arr.length >= limit) {
                e.target.checked = false;
              } else {
                arr.push(value);
              }
            }
          } else {
            if (arr.indexOf(value) > -1) {
              arr.splice(arr.indexOf(value), 1);
            }
          }
        },
        changep1(e) {
          this.changep(this.p1, e, 3);
        },
        changep2(e) {
          this.changep(this.p2, e, 3);
        },
        changep4(e) {
          this.changep(this.p4, e);
        },
        changep6(e) {
          this.changep(this.p6, e);
        },
        submit() {
          if (this.p1.length == 0
            || this.p2.length == 0
            || !this.p3
            || this.p4.length == 0
            ||!(this.p5 == 2 || this.p6.length > 0)) {
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
