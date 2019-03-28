define(['jquery','underscore','vue','helper','text!/html/h5/guessdetail.html'],
  function($,_,Vue,Helper,guessdetailTpl){
    var guessDetail = Vue.extend({
      template: guessdetailTpl,
      data: function(){
        return {
          detail: {},
          tip: ''
        }
      },
      methods: {
        getList: function(){
          var self = this;
          var ajaxdata = {};
          if(self.id){
            ajaxdata.id = self.id;
          }
          Helper.ajax({
            url:'/api/guessdetail',
            info: '获取详情',
            data: ajaxdata,
            success:function(result){
              self.detail = result[0] || {};
            }
          });
        },
        eventsinit: function(){
          var self = this;
          $(document).on('click', "#J_area li", function(e){
            self.tip = self.detail.optiontips[$(this).index()];
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
          });
          $(document).on('click', "#J_minus", function(e){
            var pit = $(this).siblings("#pit");
            if(pit.val()<=1){
              pit.val(1);
            }else{
              pit.val(parseInt(pit.val())-1);
            }
          });
          $(document).on('click', "#J_add", function(e){
            var pit = $(this).siblings("#pit");
            pit.val(parseInt(pit.val())+1);
          });
          $(document).on('click', "#J_submit", function(e){
            e.preventDefault();
            if (!Helper.islogin()) {
              location.hash = '#/index/login';
              alert('请先登录');
              return;
            }
            // var token = Helper.getlogin() && Helper.getlogin().token;
            // if(!token){
            //   alert('请先登录');
            //   location.href='./login.html';
            //   return;
            // }
            var data = {
              id: $("#detailid").val(),
              optionid: $("#J_area li.on").attr("data-id"),
              option: $("#J_area li.on").text(),
              pit: parseInt($("#pit").val()),
              unum: Helper.getlogin().user.num,
              qnum: self.detail.num,
              question: self.detail.question,
              perpoint: self.detail.perpoint,
              // token: token
            };
            Helper.ajax({
              url:'/api/guess',
              info: '竞猜',
              data: data,
              success:function(result){
                alert('竞猜成功！');
              }
            });
          });
        }
      },
      mounted: function(){
        if(this.$route.params.id){
          this.id = this.$route.params.id;
        }
        this.getList();
        this.eventsinit();
      }
    });
    return guessDetail;
});
