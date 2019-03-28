require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/engineer/h5/layout.js',
          '/js/engineer/h5/sign.js',],
    function($,_,Vue,VueRouter,Helper,
             layout,
             sign) {

      Vue.use(VueRouter);
      var routes = [
          {
            path:'/index', component: layout,
            children: [
              { path:'sign', component: sign},
              { path:'', redirect: 'sign' }
            ]
          },
          { path:'/', redirect: '/index' }
        ];
      var router = new VueRouter({routes});

      var app = new Vue({
        router
      }).$mount('#app');
  });
});