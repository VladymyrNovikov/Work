'use strict';

const CLASS_ALBUMS_ITEM = 'albums-list-item';
const CLASS_PHOTOS_ITEM = 'photos-list-item';
const CLASS_ITEM_SELECTED = 'selected';
const ALBUMS_LIST_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_LIST_URL = 'https://jsonplaceholder.typicode.com/photos?albumId=';
const WAIT_MESSAGE = 'please wait, requesting url';
const REQUEST_ERROR = 'failed request to url';

const albumsList = document.querySelector('#albumsList');
const photosList = document.querySelector('#photosList');
const albumItemTemplate = document.querySelector('#albumItemTemplate').innerHTML;
const photosItemTemplate = document.querySelector('#photosItemTemplate').innerHTML;

let selectedAlbumId = null;

getAlbumsFromServer(ALBUMS_LIST_URL);
albumsList.addEventListener('click', onClickListItem);

function getAlbumsFromServer(url) {
  showTextMessage(albumsList, WAIT_MESSAGE, url);

  fetch(url)
  .then(response => {  
    return response.json();
  })
  .then(showAlbumsList)
  .catch(response => showTextMessage(albumsList, REQUEST_ERROR, url));
}

function showAlbumsList(listFromServer) {
  albumsList.innerHTML = "";
  listFromServer.forEach(convertAlbumsFromServer);
}

function convertAlbumsFromServer(listElement) {
  const album = {
    text: listElement.title,
    id: listElement.id,
  }
  addAlbum(album);  
}

function addAlbum(album) {  
  const listItemHtml = albumItemTemplate
    .replace('{{class}}', CLASS_ALBUMS_ITEM)
    .replace('{{id}}', album.id)
    .replace('{{text}}', album.text);
  const listItemElement = htmlToElement(listItemHtml);

  albumsList.appendChild(listItemElement);
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

function onClickListItem(event) {
  const clickedItem = event.target;
  const itemClass = clickedItem.classList;

  if (!isSelected(itemClass)) {
    onSelectAlbum(clickedItem, itemClass);
  }
}

function isSelected(elementClassList) {
  return elementClassList.contains(CLASS_ITEM_SELECTED);
}

function onSelectAlbum(itemId, itemClass) {
  deselectPrevItem();
  selectItem(itemId, itemClass);
  showAlbumContent();
}

function deselectPrevItem() {
  if (selectedAlbumId != null) {
    const prevSelectedAlbum = document.querySelector('#' + selectedAlbumId);
    prevSelectedAlbum.classList.remove(CLASS_ITEM_SELECTED);
  }
}

function selectItem(itemId, itemClass) {
  selectedAlbumId = itemId.getAttribute('id');
  itemClass.add(CLASS_ITEM_SELECTED);
}

function showAlbumContent() {
  const albumId = selectedAlbumId.slice(6);
  const albumUrl = PHOTOS_LIST_URL + albumId;
  getPhotosFromServer(albumUrl);
}

function showTextMessage(parent, ...params) {
  const message = params.reduce((acc, item) => acc + ' ' + item);
  parent.innerHTML = message;
  console.log(message);  
}

function getPhotosFromServer(albumUrl) {
  showTextMessage(photosList, WAIT_MESSAGE, albumUrl);

  fetch(albumUrl)
  .then(response => {  
    return response.json();
  })
  .then(showPhotosList)
  .catch(response => showTextMessage(photosList, REQUEST_ERROR, albumUrl));
}

function showPhotosList(listFromServer) {
  photosList.innerHTML = "";
  listFromServer.forEach(convertPhotosFromServer);
}

function convertPhotosFromServer(listElement) {
  const photo = {
    id: listElement.id,
    url: listElement.url,    
    title: listElement.title
  }
  addPhoto(photo);
}

function addPhoto(photo) {  
  const listItemHtml = photosItemTemplate
    .replace('{{class}}', CLASS_PHOTOS_ITEM)
    .replace('{{url}}', photo.url)
    .replace('{{title}}', photo.title);
  const listItemElement = htmlToElement(listItemHtml);

  photosList.appendChild(listItemElement);
}

