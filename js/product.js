var ProductPage={
  init:function(catalogData){var id=Utils.getUrlParam('id');if(!id){window.location.href='catalog.html';return}var p=null;if(catalogData&&catalogData.products)p=catalogData.products.find(function(x){return x.id===id});
    var container=document.getElementById('product-page');if(!p){if(container)container.innerHTML='<p>Товар не найден. <a href="catalog.html">Вернуться в каталог</a></p>';return}
    if(container)container.innerHTML=Catalog.renderProductDetail(p);Catalog.bindDetail();
    var bc=document.getElementById('breadcrumb-product');if(bc)bc.textContent=p.name;
    if(p.seo){document.title=p.seo.title||p.name+' — СольОпт';var dm=document.querySelector('meta[name="description"]');if(dm)dm.setAttribute('content',p.seo.description||p.shortDescription)}}
};
