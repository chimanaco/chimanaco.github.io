/*
	Social button BFFs (modified)
	https://gist.github.com/japboy/5625218
  http://jsdo.it/tokkonopapa/xCDa
*/

(function(w,d){
  w._gaq=[["_setAccount","UA-2833736-6"],["_trackPageview"]];
  w.___gcfg={lang:"en"};
  var s,e = d.getElementsByTagName("script")[0],
  a=function(u,f){if(!d.getElementById(f)){s=d.createElement("script");
  s.async=!0;s.src=u;if(f){s.id=f;}e.parentNode.insertBefore(s,e);}};
  a(("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js","ga");
  a("https://apis.google.com/js/plusone.js");
  a("//b.st-hatena.com/js/bookmark_button_wo_al.js");
  a("//platform.twitter.com/widgets.js","twitter-wjs");
  a("//connect.facebook.net/en_US/all.js#xfbml=1","facebook-jssdk");
  //a("https://widgets.getpocket.com/v1/j/btn.js?v=1");
})(this, document);