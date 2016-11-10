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