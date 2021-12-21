function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //убираем проктурку при открытом модальном окне
    // modal.classList.toggle('show'); альтернативный вариант показа модального окна, при помощи toggle

    if (modalTimerId) {
        clearInterval(modalTimerId); //отключаем повторный показ модального окна после его закрытия
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // modal.classList.toggle('show'); альтернативный вариант показа модального окна, при помощи toggle
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    let modalTrigger = document.querySelectorAll(triggerSelector), //получаем доступ к дата-атрибуту через []
        modal = document.querySelector(modalSelector);


    modalTrigger.forEach(btn => { //исп forEach так как modalTrigger - это псевдомассив(querySelectorAll)
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    // modalCloseBtn.addEventListener('click', closeModal); //удаляем строку и добавляем условие 
    modal.addEventListener('click', (e) => { //при клике на свободном пространстве модал окно закрывается
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //если мы клаикаем на подложку или на крестик модальное окно закрывается
            closeModal(modalSelector);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { //при помощи contains('show') escape юудет срабатывать только в случае открытого модально окна
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() { //если прокрученная часть страницы и видимая на текущий момент часть страницы больше или равна общей высоте страницы то показываем модальное окно 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //после пролистывания страницы и открытия модального окна удаляем это событие чтобы не повторялось каждый раз
        }
    }

    window.addEventListener('scroll', showModalByScroll); //показ модального окна после прокрутки всей страницы
}

export default modal;
export { closeModal };
export { openModal };