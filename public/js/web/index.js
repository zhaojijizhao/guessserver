require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/web/layout.js',
          '/js/web/guess.js',
          '/js/web/quest.js',
          '/js/web/home.js',
          '/js/web/shop.js',
          '/js/web/elec.js',
          '/js/web/sign.js',
          '/js/web/rank.js',
          '/js/web/shophome.js',
          '/js/web/basket.js',
          '/js/web/contact.js',
          '/js/web/corwork.js',
          '/js/web/law.js',
          '/js/web/search.js',
          '/js/web/share.js'],
    function($,_,Vue,VueRouter,Helper,
             layout,
             guess,
             quest,
             home,
             shop,
             elec,
             sign,
             rank,
             shophome,
             basket,
             contact,
             corwork,
             law,
             search,
             share) {
      Vue.use(VueRouter);
      var routes = [
          {
            path:'/index', component: layout,
            children: [
              {
                path:'guess', component: guess,
                children: [
                  { path:'quest',component: quest},
                  { path:'home',component: home},
                  { path:'', redirect: 'home' }
                ]
              },
              {
                path:'shop', component: shop,
                children: [
                  { path:'shophome',component: shophome},
                  { path: 'basket',component: basket},
                  { path:'elec',component: elec},
                  { path:'rank',component: rank},
                  { path:'', redirect: 'shophome' }
                ]
              },
              {
                path: 'sign', component: sign,
              },
              { 
                path:'contact', component: contact
              },
              { 
                path:'corwork', component: corwork
              },
              { 
                path:'law', component: law
              },
              { 
                path:'search', component: search
              },
              { path:'', redirect: 'guess' }
            ]
          },
          {
            path:'/share', component: share,
          },
          { path:'/', redirect: '/index' }
        ];
      var router = new VueRouter({routes});

      var app = new Vue({
        router
      }).$mount('#app');

  });
});