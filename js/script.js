import tabs from './modules/tabs';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slides from './modules/slides';
import timer from './modules/timer';
import cards from './modules/cards';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    let modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000); //появление модального окна спустя какое-то время
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-06-01');
    cards();
    slides({
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});