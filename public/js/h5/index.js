require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/h5/main.js',
          '/js/h5/layout.js',
          '/js/h5/sign.js',
          '/js/h5/login.js',
          '/js/h5/personal.js',
          '/js/h5/guessmenu.js',
          '/js/h5/guesssecond.js',
          '/js/h5/guesslist.js',
          '/js/h5/guessdetail.js',
          '/js/h5/shopmenu.js'],
    function($,_,Vue,VueRouter,Helper,
             main,
             layout,
             sign,
             login,
             personal,
             guessmenu,
             guesssecond,
             guesslist,
             guessdetail,
             shopmenu){

      Vue.use(VueRouter);
      var routes = [
          { path:'/main', component: main},
          {
            path:'/index', component: layout,
            children: [
              { path:'sign', component: sign},
              { path:'login', component: login},
              { path:'personal', component: personal},
              { path:'guessmenu', component: guessmenu},
              { path:'guesssecond/:id', component: guesssecond},
              { path:'guesslist/:id', component: guesslist},
              { path:'guessdetail/:id', component: guessdetail},
              { path:'shopmenu', component: shopmenu},
              { path:'', redirect: 'login' }
            ]
          },
          { path:'/', redirect: '/main' }
        ];
      var router = new VueRouter({routes});

      var app = new Vue({
        router
      }).$mount('#app');

  });
});