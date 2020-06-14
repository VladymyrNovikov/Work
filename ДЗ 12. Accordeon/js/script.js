function Accordeon(el, config) {
   this.el = el;
   this.config = config;
}

Accordeon.prototype.init = function () {
   this.setInitialValues();
   this.el.addEventListener('click', this.onGetBody.bind(this));
};

Accordeon.prototype.setInitialValues = function () {
   this.accordeonBody = this.el.getElementsByClassName('body');

   for (let i = 0; i < this.accordeonBody.length; i++) {
      this.accordeonBody[i].hidden = true;
      this.accordeonBody[i].setAttribute('index', i);
      this.accordeonBody[i].setAttribute('value', true);
   }
};

Accordeon.prototype.toСollapseOther = function (index) {

   for (let i = 0; i < this.accordeonBody.length; i++) {
      if (i == index) continue;
      this.accordeonBody[i].hidden = true;
   }
};

Accordeon.prototype.open = function (index) {

   this.accordeonBody[index].hidden = false;
};

Accordeon.prototype.close = function (index) {

   this.accordeonBody[index].hidden = true;
};

Accordeon.prototype.toggle = function (index) {
   if (this.accordeonBody[index].hidden == true) this.accordeonBody[index].hidden = false;
   else this.accordeonBody[index].hidden = true;
};

Accordeon.prototype.getValue = function (index) {
   let value = this.accordeonBody[index].getAttribute('value');

   if (value == 'true') {
      value = false;
      this.accordeonBody[index].setAttribute('value', value);
   } else {
      value = true;
      this.accordeonBody[index].setAttribute('value', value);
   }

   return value;
};

Accordeon.prototype.onGetBody = function (event) {

   itemIndexClicked = event.target.nextElementSibling.getAttribute('index');

   this.open(itemIndexClicked);

   if (this.config.collapseOther) this.toСollapseOther(itemIndexClicked);

   else if (this.getValue(itemIndexClicked)) {
      this.close(itemIndexClicked);
   }
};

const accordion = new Accordeon(
   document.getElementById('container'), {
      collapseOther: false
   }
);

accordion.init();