define([],function(){
  function setRequirejs(){
    requirejs.config({
      baseUrl:"/",
      paths:{
        jquery:"lib/jquery.min",
        underscore:"lib/underscore.min",
        vue:"lib/vue.min",
        vuerouter:"lib/vue-router.min",
        text:"lib/text",
        public:'js/public',
        helper:'js/public/help',
        cms:'js/cms',
        h5:'js/h5',
        web:'js/web'
      },
      shim:{
        'jquery':{
          exports:'$'
        }
      }
    });
  }
  var base = {
    setRequirejs:setRequirejs
  }
  return base;
});
