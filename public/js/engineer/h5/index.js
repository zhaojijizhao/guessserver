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
              { path:'homepage', component: homepage},
              { path:'regist', component: regist},
              { path:'nav', component: nav},
              { path:'expo', component: expo},
              { path:'map', component: map},
              { path:'survey', component: survey},
              { path: 'game', component: game},
              { path:'', redirect: 'homepage' }
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