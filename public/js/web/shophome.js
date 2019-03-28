define(['jquery','underscore','vue','helper','text!/html/web/shophome.html'],
  function($,_,Vue,Helper,shophomeTpl){
    var shophome = Vue.extend({
      template: shophomeTpl,
      props:{
        user: {
          type: Object
        },
        secondlist: {
          type: Array
        },
        secondid: {
          type: Number
        }
      },
      data: function(){
        return {
          info: {
            shop: [{
              title: '购物条款',
              content: [
        //         `
        //         <div class="line1">
        //             <p>除非一起竞猜吧另行声明，一起竞猜吧内的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、
        // 色彩、版面设计、电子文档）的所有权利（包括但不限于版权、商标权、专利权、商业秘密及其他所有相关权利）均归一起竞猜吧或其关联公司所有。未经颐
        // 品农庄许可，任何人不得擅自使用（包括但不限于通过任何机器人、蜘蛛等程序或设备监视、复制、传播、展示、镜像、上载、下载一起竞猜吧平台内的任何
        // 内容）。一起竞猜吧的Logo、“一起竞猜吧”、等文字、图形及其组合，以及一起竞猜吧的其他标识、徵记、产品和服务名称均为一起竞猜吧及其关联公司在中国和
        // 其它国家的商标，未经一起竞猜吧书面授权，任何人不得以任何方式展示、使用或作其他处理，也不得向他人表明您有权展示、使用或作其他处理。。</p>
        //         </div>
        //         <div class="line2">
        //             <p>非常尊重用户个人信息的保护，在您使用一起竞猜吧提供的服务时，我们将按照本隐私权政策收集、使用及共享您的个人信息。
        // 本隐私权政策包含了我们收集、存储、使用、共享和保护您的个人信息的条款，我们希望通过本隐私权政策向您清晰地介绍我们对您个人信息的处理方式，
        // 因此我们建议您完整地阅读本隐私权政策，以帮助您了解维护自己隐私权的方式。如您对本隐私权政策有任何疑问，您可以通过一起竞猜吧平台公布的联系
        // 方式与我们联系。如果您不同意本隐私权政策任何内容，您应立即停止使用一起竞猜吧服务。当您使用一起竞猜吧提供的任一服务时，即表示您已同意我们按
        // 照本隐私权政策来合法使用和保护您的个人信息。</p>
        //         </div>
        //         <div class="line1">
        //             <p>为用户提供更好、更优、更个性化的服务是一起竞猜吧坚持不懈的追求，也希望通过我们提供的服务可以更方便您的生活。本隐私权政策适用于一起竞猜吧
        // 提供的所有服务，您访问一起竞猜吧网站及/或登陆相关客户端使用一起竞猜吧提供的服务，均适用本隐私权政策。</p>
        //         </div>`
              ]
            }]
          } 
        }
      },
      methods: {
        getinfo() {
          let self = this;
          Helper.ajax({
            url:'/api/content',
            info: '获取页面信息',
            success:function(result){
              if (result && result[0]) {
                self.info.shop = result[0].shop;
              }
            },
            error: function(err) {
              alert(err.responseJSON.msg);
            }
          });
        }
      },
      mounted: function(){
        this.getinfo();
      }
    });
    return shophome;
});
