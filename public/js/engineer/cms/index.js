require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/engineer/cms/layout.js',
          '/js/engineer/cms/user.js',],
    function($,_,Vue,VueRouter,Helper,
             layout,
             user){

      Vue.use(VueRouter);
      var routes = [
          { path: '/index', component: layout,
            children:[
              { path:'user', component: user},
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