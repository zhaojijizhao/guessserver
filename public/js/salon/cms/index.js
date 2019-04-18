require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/salon/cms/layout.js',
          '/js/salon/cms/user.js',
          '/js/salon/cms/point.js',],
    function($,_,Vue,VueRouter,Helper,
             layout,
             user,
             point){

      Vue.use(VueRouter);
      var routes = [
          { path: '/index', component: layout,
            children:[
              { path:'user', component: user},
              { path:'point', component: point},
              { path:'', redirect: 'user'}
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