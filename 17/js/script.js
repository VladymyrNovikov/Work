'use strict';

const STICKER_ADD = 'add';
const STICKER_HOLD = 'hold';
const CLASS_STICKER_SHEET = 'sticker-sheet';
const CLASS_STICKER_PANEL = 'sticker-panel';
const CLASS_TEXT = 'text-field';
const TEXT_COLUMNS = 16;
const TEXT_ROWS = 10;
const CLASS_STICKER_BUTTON = 'sticker-button';

const ADD_BUTTON = {
   label: 'Add',
   type: 'add'
};
const SAVE_BUTTON = {
   label: 'Save',
   type: 'save'
};
const DEL_BUTTON = {
   label: 'X',
   type: 'delete'
};
const ADD_STICKER = {
   id: '0',
   text: '',
   type: STICKER_ADD
}

const stickerForm = document.querySelector('#stickerForm');
const stickerTemplate = document.querySelector('#stickerTemplate').innerHTML;

let stickers = [];

stickerForm.addEventListener('click', onSubmitStickerForm);

start();

function onSubmitStickerForm(event) {
   const target = event.target;

   event.preventDefault();

   switch (true) {
      case target.classList.contains(CLASS_STICKER_BUTTON):

         onClickButton(target, target.closest('.' + CLASS_STICKER_SHEET));
         break;
   }
}

function start() {
   getStickers();
   showStickers();
}

function getStickers() {
   const listFromStorage = localStorage.getItem('stickers');

   stickers = JSON.parse(listFromStorage) || [ADD_STICKER];
}

function showStickers() {
   stickerForm.innerHTML = stickers.map(makeStickerHtml).join('\n');
}

function makeStickerHtml(sticker) {
   let button1Class = '';
   let button1Label = '';
   let button2Class = '';
   let button2Label = '';

   switch (sticker.type) {
      case 'add':
         button1Class = CLASS_STICKER_BUTTON;
         button1Label = '';
         button2Class = CLASS_STICKER_BUTTON + ' ' + ADD_BUTTON.type;
         button2Label = ADD_BUTTON.label;
         break;

      default:
         button1Class = CLASS_STICKER_BUTTON + ' ' + SAVE_BUTTON.type;
         button1Label = SAVE_BUTTON.label;
         button2Class = CLASS_STICKER_BUTTON + ' ' + DEL_BUTTON.type;
         button2Label = DEL_BUTTON.label;
         break;
   }

   return stickerTemplate
      .replace('{{id}}', sticker.id)
      .replace('{{textValue}}', sticker.text)
      .replace('{{classSheet}}', CLASS_STICKER_SHEET + ' ' + sticker.type)
      .replace('{{classPanel}}', CLASS_STICKER_PANEL)
      .replace('{{classButton1}}', button1Class)
      .replace('{{button1Label}}', button1Label)
      .replace('{{classButton2}}', button2Class)
      .replace('{{button2Label}}', button2Label)
      .replace('{{classText}}', CLASS_TEXT)
      .replace('{{textColumns}}', TEXT_COLUMNS)
      .replace('{{textRows}}', TEXT_ROWS);
}

function onClickButton(button, stickerSheet) {
   const buttonClasses = button.classList;
   const stickerId = stickerSheet.dataset.id;
   const text = getText(stickerSheet);

   switch (true) {
      case buttonClasses.contains(DEL_BUTTON.type):
         console.log('delete');
         deleteSticker(stickerId);
         break;

      case text === '':
         console.log('empty value');
         return;

      case buttonClasses.contains(ADD_BUTTON.type):
         console.log('add');
         addSticker(text);
         break;

      case buttonClasses.contains(SAVE_BUTTON.type):
         console.log('save');
         saveSticker(stickerId, text);
         break;
   }
}

function getText(stickerSheet) {
   let item;

   for (let i = 0; i < stickerSheet.children.length; i++) {
      item = stickerSheet.children[i];

      if (item.classList.contains(CLASS_TEXT)) {
         return item.value;
      }
   }

   return '';
}

function deleteSticker(stickerId) {
   const index = stickers.findIndex(item => item.id === stickerId);

   stickers.splice(index, 1);
   saveStickersToStorage();
   showStickers();
}

function addSticker(text) {
   const timestamp = (new Date()).getTime().toString();
   const newSticker = {
      id: timestamp,
      text: text,
      type: STICKER_HOLD
   }

   stickers.push(newSticker);
   saveStickersToStorage();
   showStickers();
}

function saveSticker(stickerId, text) {
   const index = stickers.findIndex(item => item.id === stickerId);

   stickers[index].text = text;
   saveStickersToStorage();
   showStickers();
}

function saveStickersToStorage() {
   const listToStorage = JSON.stringify(stickers);

   localStorage.setItem('stickers', listToStorage);
}