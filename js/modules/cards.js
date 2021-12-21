import { getResourse } from '../services/services';

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //classes-классы, добавленные с помощью rest-operator
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //массив
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; //свойство для перевода валюты
            this.changeToUAH();
        }
        changeToUAH() { //метод перевода перевода в гривну
            this.price = this.price * this.transfer;
        }
        render() { //создаем верстку, куда помещаются элементы
            let element = document.createElement('div');
            if (this.classes.length === 0) { //если не было передано какой либо класс, 
                this.classes = 'menu__item'; //устанавливаем дефолтный класс
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className)); //className-каждый эл внутри массива classes
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div> 
                </div>
            `;
            this.parent.append(element); //помещаем только что полученный element в parent
        }
    }

    // Сокращенный вариант создания элементов на странице, то что раньше было new MenuCard
    getResourse('http://localhost:3000/menu') //при помощи сервера(запроса) получаю массив с обьектами(расположен в db.json),
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price, }) => { //далее перебираем его и те обьекты которые внутри, их деструктуризируем по отдельным  частям, 
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //эти части передаю в конструктор, который создает новую карточку на странице и рендерит ее 
            });
        });

    // new MenuCard( //аргументами передаем те значения, которые были в верстке
    //     "img/tabs/vegy.jpg", //src
    //     "vegy", //alt
    //     'Меню "Фитнес"', //title
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', //descr
    //     9, //число задано в БД
    //     '.menu .container', //parentSelector
    // ).render();

    // new MenuCard( //аргументами передаем те значения, которые были в верстке
    //     "img/tabs/elite.jpg", //src
    //     "elite", //alt
    //     'Меню “Премиум”', //title
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', //descr
    //     14, //число задано в БД
    //     '.menu .container', //parentSelector
    // ).render();

    // new MenuCard( //аргументами передаем те значения, которые были в верстке
    //     "img/tabs/post.jpg", //src
    //     "post", //alt
    //     'Меню "Постное"', //title
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', //descr
    //     21, //число задано в БД
    //     '.menu .container', //parentSelector
    // ).render();
}

export default cards;