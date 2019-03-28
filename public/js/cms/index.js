require(['/js/public/base.js'],function(Base){
  Base.setRequirejs();
  require(['jquery','underscore','vue','vuerouter','helper',
          '/js/cms/layout.js',
          '/js/cms/login.js',
          '/js/cms/manager.js',
          '/js/cms/user.js',
          '/js/cms/firsttype.js',
          '/js/cms/secondtype.js',
          '/js/cms/thirdtype.js',
          '/js/cms/question.js',
          '/js/cms/guess.js',
          '/js/cms/calt.js',
          '/js/cms/rule.js',
          '/js/cms/homepage.js',
          '/js/cms/contact.js',
          '/js/cms/corwork.js',
          '/js/cms/code.js',
          '/js/cms/small.js'],
    function($,_,Vue,VueRouter,Helper,
             layout,
             login,
             manager,
             user,
             firsttype,
             secondtype,
             thirdtype,
             question,
             guess,
             calt,
             rule,
             homepage,
             contact,
             corwork,
             code,
             small){

      Vue.use(VueRouter);
      var routes = [
          { path: '/index', component: layout,
            children:[
              { path:'manager', component: manager},
              { path:'user', component: user},
              { path:'firsttype', component: firsttype},
              { path:'secondtype', component: secondtype},
              { path:'thirdtype', component: thirdtype},
              { path:'question', component: question},
              { path:'guess', component: guess},
              { path:'calt', component: calt},
              { path:'rule', component: rule},
              { path:'homepage', component: homepage},
              { path:'code', component: code},
              { path:'contact', component: contact},
              { path:'corwork', component: corwork},
              { path:'small', component: small},
              { path:'', redirect: 'user'}
            ]
          },
          { path: '/login', component: login},
          { path:'/', redirect: '/login' }
        ];
      var router = new VueRouter({routes});

      var app = new Vue({
        router
      }).$mount('#app');

  });
});