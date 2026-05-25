var SEO={
  init:function(s){if(!s||!s.seo)return;var ogUrl=document.querySelector('meta[property="og:url"]');if(ogUrl)ogUrl.setAttribute('content',window.location.href)},
  initLazyLoad:function(){if(!('IntersectionObserver' in window))return;var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;var img=entry.target;if(img.dataset.src){img.src=img.dataset.src;delete img.dataset.src}obs.unobserve(img)})},{rootMargin:'100px'});document.querySelectorAll('img[data-src]').forEach(function(img){obs.observe(img)})}
};
