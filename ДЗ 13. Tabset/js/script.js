class Tabset {

   static HEADING_CLASS = 'title';
   static TABS_OPEN_CLASS = 'open';

   constructor(container) {
      this.container = container;
      this.init();
   }

   init() {
      this.constructionElem();
      this.bindEventListener();
      this.show(0);
   }

   constructionElem() {
      this.tabsHeading = document.createElement('div');
      this.tabsBody = document.createElement('div');
      this.sortTabs();
      this.container.appendChild(this.tabsHeading);
      this.container.appendChild(this.tabsBody);
   }

   sortTabs() {
      Array.prototype.forEach.call(this.container.children, (container) => {
         this.tabsHeading.appendChild(container.children[0]);
         this.tabsBody.appendChild(container.children[0]);
      });
   }

   bindEventListener() {
      this.tabsHeading.addEventListener('click', this.clickOnHeading.bind(this));
   }

   clickOnHeading(e) {
      if (e.target.classList.contains(Tabset.HEADING_CLASS)) {
         this.closeElems();
         this.index = this.indexCollection(e.target.parentNode.children, e.target);
         this.show(this.index);
      }
   }

   indexCollection(collection, el) {
      return Array.prototype.indexOf.call(collection, el);
   }

   show(index) {
      this.tabsHeading.children[index].classList.add(Tabset.TABS_OPEN_CLASS);
      this.tabsBody.children[index].classList.add(Tabset.TABS_OPEN_CLASS);
   }

   closeElems() {
      for (let i = 0; i < this.tabsBody.children.length; i++) {
         this.tabsBody.children[i].classList.remove(Tabset.TABS_OPEN_CLASS);
         this.tabsHeading.children[i].classList.remove(Tabset.TABS_OPEN_CLASS);
      }
   }
}


const tabs = new Tabset(
   document.getElementById('container')
);