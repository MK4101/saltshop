var ConfigLoader={
  settings:null,catalog:null,certificates:null,
  loadAll:function(){var self=this;return Promise.all([Utils.loadJSON('data/settings.json'),Utils.loadJSON('data/catalog.json'),Utils.loadJSON('data/certificates.json')]).then(function(r){self.settings=r[0];self.catalog=r[1];self.certificates=r[2];return{settings:r[0],catalog:r[1],certificates:r[2]}})},
  getProductById:function(id){if(!this.catalog||!this.catalog.products)return null;return this.catalog.products.find(function(p){return p.id===id})||null}
};
