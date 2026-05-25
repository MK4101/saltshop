var PriceRequest={
  settings:null,
  init:function(s){this.settings=s;this.bindEvents();this.prefillForm()},
  bindEvents:function(){var self=this;
    document.querySelectorAll('#btn-get-price,#btn-get-price-sidebar,#hero-get-price').forEach(function(btn){btn.addEventListener('click',function(e){e.preventDefault();self.openModal()})});
    var mc=document.getElementById('modal-close'),mo=document.getElementById('price-modal');
    if(mc)mc.addEventListener('click',function(){self.closeModal()});
    if(mo)mo.addEventListener('click',function(e){if(e.target===mo)self.closeModal()});
    var form=document.getElementById('price-form');if(form)form.addEventListener('submit',function(e){e.preventDefault();self.handleSubmit()});
    var ph=document.getElementById('price-phone');if(ph)Utils.phoneMask(ph);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')self.closeModal()})},
  prefillForm:function(){var ud=SessionManager.getUserData();if(!ud)return;var n=document.getElementById('price-name'),ph=document.getElementById('price-phone'),em=document.getElementById('price-email');if(n&&ud.name)n.value=ud.name;if(ph&&ud.phone)ph.value=ud.phone;if(em&&ud.email)em.value=ud.email},
  openModal:function(){var mo=document.getElementById('price-modal');if(!mo)return;var fc=document.getElementById('price-form-container'),sc=document.getElementById('price-success-container');if(fc)fc.classList.remove('hidden');if(sc)sc.classList.add('hidden');mo.classList.add('active');mo.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'},
  closeModal:function(){var mo=document.getElementById('price-modal');if(!mo)return;mo.classList.remove('active');mo.setAttribute('aria-hidden','true');document.body.style.overflow=''},
  validate:function(){var ok=true,ph=document.getElementById('price-phone'),em=document.getElementById('price-email'),ag=document.getElementById('price-agree');
    var phe=document.getElementById('phone-error'),eme=document.getElementById('email-error'),age=document.getElementById('agree-error');
    [ph,em].forEach(function(i){if(i)i.classList.remove('error')});[phe,eme,age].forEach(function(e){if(e)e.textContent=''});
    if(!ph||!Utils.isValidPhone(ph.value)){if(phe)phe.textContent='Введите корректный номер';if(ph)ph.classList.add('error');ok=false}
    if(!em||!Utils.isValidEmail(em.value)){if(eme)eme.textContent='Введите корректный e-mail';if(em)em.classList.add('error');ok=false}
    if(ag&&!ag.checked){if(age)age.textContent='Необходимо дать согласие';ok=false}return ok},
  handleSubmit:function(){if(!this.validate())return;var self=this;
    var n=document.getElementById('price-name'),ph=document.getElementById('price-phone'),em=document.getElementById('price-email'),sb=document.getElementById('price-submit');
    var data={name:n?n.value.trim():'',phone:ph?ph.value.trim():'',email:em?em.value.trim():'',timestamp:new Date().toISOString(),sessionId:sessionStorage.getItem('session_id')||'unknown'};
    SessionManager.saveUserData(data);if(sb){sb.disabled=true;sb.textContent='Отправка…'}
    this.sendToManager(data).then(function(){self.showSuccess()}).catch(function(){self.showSuccess()}).finally(function(){if(sb){sb.disabled=false;sb.textContent='Отправить'}})},
  sendToManager:function(data){var m=this.settings&&this.settings.mail?this.settings.mail:{};
    if(m.formspreeEndpoint&&m.formspreeEndpoint!=='https://formspree.io/f/YOUR_FORM_ID'){return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest();xhr.open('POST',m.formspreeEndpoint,true);xhr.setRequestHeader('Content-Type','application/json');xhr.setRequestHeader('Accept','application/json');xhr.onload=function(){xhr.status>=200&&xhr.status<300?resolve():reject()};xhr.onerror=reject;xhr.send(JSON.stringify({name:data.name,phone:data.phone,email:data.email,_subject:'Запрос прайс-листа от '+(data.name||data.email)}))})}
    var requests=JSON.parse(localStorage.getItem('price_requests')||'[]');requests.push(data);localStorage.setItem('price_requests',JSON.stringify(requests));return Promise.resolve()},
  showSuccess:function(){var fc=document.getElementById('price-form-container'),sc=document.getElementById('price-success-container'),db=document.getElementById('download-price-btn');
    if(fc)fc.classList.add('hidden');if(sc)sc.classList.remove('hidden');
    if(db&&this.settings&&this.settings.priceList){db.href=this.settings.priceList.fileUrl;db.setAttribute('download',this.settings.priceList.fileName)}
    CookieManager.set('price_requested','true',30)}
};
