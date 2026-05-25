var SessionManager={
  generateId:function(){return'sess_'+Date.now()+'_'+Math.random().toString(36).substr(2,9)},
  init:function(){if(!sessionStorage.getItem('session_id')){sessionStorage.setItem('session_id',this.generateId());sessionStorage.setItem('session_start',new Date().toISOString());sessionStorage.setItem('page_views','0')}this.trackPageView()},
  trackPageView:function(){var v=parseInt(sessionStorage.getItem('page_views')||'0')+1;sessionStorage.setItem('page_views',v);sessionStorage.setItem('last_page',window.location.pathname)},
  set:function(k,v){sessionStorage.setItem(k,JSON.stringify(v))},get:function(k){var i=sessionStorage.getItem(k);try{return JSON.parse(i)}catch(e){return i}},
  saveUserData:function(d){this.set('user_data',d);CookieManager.set('user_name',d.name,30);CookieManager.set('user_phone',d.phone,30);CookieManager.set('user_email',d.email,30)},
  getUserData:function(){var s=this.get('user_data');if(s)return s;var n=CookieManager.get('user_name'),p=CookieManager.get('user_phone'),e=CookieManager.get('user_email');return(n||p||e)?{name:n||'',phone:p||'',email:e||''}:null}
};
