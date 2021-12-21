function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female'; //уст переменные в дефолтные значения для корректного отображения на сайте
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375; //коэфициент активности (взят из источника)
        localStorage.setItem('ratio', '1.375');
    }

    function calcTotal() { //запускаем каждый раз когда было изменено значение в любом инпуте
        if (!sex || !height || !weight || !age || !ratio) { //если не заполнен пол, или вес, или рост и тд то выводим прочерк
            result.textContent = '____';
            return; //вызываем return, чтобы прервать функцию
        }

        if (sex === 'female') { // расчет для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { // расчет для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active'); //запускаем ф-цию исп id и класс активности из верстки
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); //запускаем ф-цию исп класс физ активности и класс активности из верстки

    function getStaticInformation(selector, activeClass) { //получаем инфо из статических инпутов с активностью, когда на них нажали мы исп это значение
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) { //если у элем есть data-аттрибут 
                    ratio = +e.target.getAttribute('data-ratio'); //мы обращаемся к ratio и исп аттрибут data-ratio
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //запоминаем что пользователь выбрал определенные параметры
                } else {
                    sex = e.target.getAttribute('id'); //если у элемента нет аттрибута тогда рабоатем с id
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass); //сначала эл избавляется от класса активности
                });
                e.target.classList.add(activeClass); //после удаления класса активности добавляем новый

                calcTotal();
            });
        });
    }
    getStaticInformation('#gender', 'calculating__choose-item_active'); //запускаем ф-цию исп id и класс активности из верстки
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active'); //запускаем ф-цию исп класс физ активности и класс активности из верстки

    function getDynamicInformation(selector) { //получаем инфо из динамически меняющихся инпутов(рост вес возраст)
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { //когда пользватель что то вводит в инпут выполняем след действия 

            if (input.value.match(/\D/g)) { //проверяем чтобы пользователь введет тоько числа
                input.style.border = '1px solid red'; //ставим красную обводку если что то пошло не так
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;