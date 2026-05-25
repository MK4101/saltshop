var Utils={
  loadJSON:function(url){return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.responseType='json';xhr.onload=function(){xhr.status>=200&&xhr.status<300?resolve(xhr.response):reject(new Error(url+': '+xhr.status))};xhr.onerror=function(){reject(new Error('Network: '+url))};xhr.send()})},
  loadHTML:function(url){return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.onload=function(){xhr.status>=200&&xhr.status<300?resolve(xhr.responseText):reject(new Error(url+': '+xhr.status))};xhr.onerror=function(){reject(new Error('Network: '+url))};xhr.send()})},
  getUrlParam:function(p){return new URLSearchParams(window.location.search).get(p)},
  formatPrice:function(p){return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'\u00a0')},
  phoneMask:function(input){input.addEventListener('input',function(e){var x=e.target.value.replace(/\D/g,''),f='';if(x.length>0)f='+7';if(x.length>1)f+=' ('+x.substring(1,4);if(x.length>4)f+=') '+x.substring(4,7);if(x.length>7)f+='-'+x.substring(7,9);if(x.length>9)f+='-'+x.substring(9,11);e.target.value=f})},
  isValidEmail:function(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)},
  isValidPhone:function(p){return p.replace(/\D/g,'').length>=11},
  escapeHtml:function(s){if(!s)return'';var d=document.createElement('div');d.textContent=s;return d.innerHTML}
};
