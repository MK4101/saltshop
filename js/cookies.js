var CookieManager={
  set:function(n,v,d){var e='';if(d){var dt=new Date();dt.setTime(dt.getTime()+d*864e5);e='; expires='+dt.toUTCString()}document.cookie=n+'='+encodeURIComponent(v)+e+'; path=/; SameSite=Lax'},
  get:function(n){var eq=n+'=',parts=document.cookie.split(';');for(var i=0;i<parts.length;i++){var c=parts[i].trim();if(c.indexOf(eq)===0)return decodeURIComponent(c.substring(eq.length))}return null},
  remove:function(n){this.set(n,'',-1)},
  initBanner:function(){var b=document.getElementById('cookie-banner'),a=document.getElementById('cookie-accept');if(!b||!a)return;if(!this.get('cookies_accepted'))setTimeout(function(){b.classList.add('active');b.setAttribute('aria-hidden','false')},1000);var self=this;a.addEventListener('click',function(){self.set('cookies_accepted','true',365);b.classList.remove('active');b.setAttribute('aria-hidden','true')})}
};
