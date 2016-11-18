'use strict';

  // Валидация формы:
  // 1. ограничения на минимальное/максимальное значение

  // Форма и поля ввода
var formElement = document.forms['searchform'];

var guests = formElement['searchform-guests-number'];
var rooms = formElement['searchform-guests-rooms'];

//минимальное кол-во гостей 1, максимальное - 6
guests.min = 1; // min и max это системные атрибуты для input  с типом number
guests.max = 6;

// минимальное и максимоальное количество комнат зависит от числа гостей
var  MAX_GUESTS_PER_ROOM = 3;


/**
 * Функция, которая ограничивает минимальное и максимальное
 * значение комнат в зависимости от числа гостей.
 * @param {Element} roomsElement
 * @param {number} guestsNumber
 */
function setMinAndMaxRooms(roomsElement, guestsNumber) {
  // Минимальное количество комнат — если в каждой комнате
  // будет жить максимальное количество человек (3).
  roomsElement.min = Math.ceil(guestsNumber / MAX_GUESTS_PER_ROOM);

  // Максимальное количество комнат — если в каждой комнате
  // будет жить по одному человеку.
  roomsElement.max = guestsNumber;
}
// установка начальных значений
guests.value = docCookies.getItem('guests');
setMinAndMaxRooms(rooms, guests.value);
rooms.value = docCookies.getItem('rooms');

// 2. реакция на изменение

// При изменении количества гостей должны автоматически
// пересчитаться граничные значения для количества комнат
guests.onchange = function() {
  setMinAndMaxRooms(rooms, guests.value);
};

/*dateFrom.onchange = function() {
  setMinDateTo(dateTo, dateFrom.value);
};*/

// При отправке формы, сохраним последние валидные данные
// в cookies
formElement.onsubmit = function(evt) {
  // Объект evt представляет собой объект для работы
  // с произошедшим событием. Метод preventDefault
  // отменяет действие по умолчанию. В данном случае —
  // отправку формы.
  evt.preventDefault();

  evt.dateToExpire = +Date.now() + 3*24*60*60*1000;
  var formattedDateToExpire = new Date(dateToExpire).toUTCString();

  document.cookie = 'guests=' + guests.value + ';expires=' + formattedDateToExpire;
  document.cookie = 'rooms=' + rooms.value + ';expires=' + formattedDateToExpire;

  formElement.submit();
};