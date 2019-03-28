require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/engineer/cms/layout.js',
          '/js/engineer/cms/manager.js',],
    function($,_,Vue,VueRouter,Helper,
             layout,
             manager){

      Vue.use(VueRouter);
      var routes = [
          { path: '/index', component: layout,
            children:[
              { path:'manager', component: manager},
              { path:'', redirect: 'manager'}
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