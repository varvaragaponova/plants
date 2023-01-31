//console.log("75/75\nВёрстка соответствует макету. Ширина экрана 768px +24\nблок <header> +2\nсекция welcome +3\nсекция about +4\nсекция service +4\nсекция prices +4\nсекция contacts +4\nблок <footer> + 3\nВёрстка соответствует макету. Ширина экрана 380px +24\nблок <header> +2\nсекция welcome +3\nсекция about +4\nсекция service +4\nсекция prices +4\nсекция contacts +4\nблок <footer> + 3\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nнет полосы прокрутки при ширине страницы от 1440рх до 380px +7\nнет полосы прокрутки при ширине страницы от 380px до 320рх +8\nНа ширине экрана 380рх и меньше реализовано адаптивное меню +22 (Допускается появление адаптивного меня на ширине более 380, но не допускается на ширине более 770px)\nпри ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nадаптивное меню соответствует цветовой схеме макета\nпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\nссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4\nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4");
//Burger-menu
const menuButton = document.getElementById('menu');
const header = document.querySelector('header');

menuButton.addEventListener('click', function(event) {
    header.classList.toggle('open');
    event.stopPropagation();
});

document.body.addEventListener('click', function() {
    if (header.classList.contains('open')) {
        header.classList.remove('open');
    }
});

//Filter blur
const cardChoiceGarden = document.querySelector('.garden');
const cardChoiceLawn = document.querySelector('.lawn');
const cardChoicePlanting = document.querySelector('.planting');

const buttonGarden = document.querySelector('.garden-button');
const buttonLawn = document.querySelector('.lawn-button');
const buttonPlanting = document.querySelector('.planting-button');

const onServiceButtonClick = (event) => {
    const currentClass = event && event.target && event.target.className;

    if (!currentClass) return;
    const buttons = Array.from(document.querySelectorAll('.buttons-wrapper > button'));

    const buttonArr = buttons.filter(button => {
        return button.className !== currentClass && button.classList.contains('active');
    });

    if(buttonArr.length === 2) {
        event.target.classList.remove('active');
        return;
    }

    event.target.classList.toggle('active');

    const cards = document.querySelectorAll('.card');

    const activeButtons = buttons.filter(button => {
        return button.classList.contains('active');
    }).map(button => button.dataset.class);

    cards.forEach(card => {
        if(!activeButtons.includes(card.classList[1]) && activeButtons.length) card.classList.add('blur');
        else if(card.classList.contains('blur')) card.classList.remove('blur');
    })
}

buttonGarden.addEventListener('click', onServiceButtonClick);
buttonLawn.addEventListener('click', onServiceButtonClick);
buttonPlanting.addEventListener('click', onServiceButtonClick);

//Dropdown in prices
const pricesList = document.querySelectorAll('.details');

const onPriceClick = (event) => {
    document.querySelectorAll('.details.open').forEach(item => {
        if(item !== event.target.closest('.details')) {
            item.classList.remove('open');
        }
    });
    event.target.closest('.details').classList.toggle('open');
}

pricesList.forEach(price => price.addEventListener('click', onPriceClick, false));

const buttonScroll = document.querySelectorAll('.button-order');
const toScroll = document.getElementById('contacts');


buttonScroll.forEach(button => button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('contacts').scrollIntoView({
        behavior: 'smooth'
    });
}));

//Contacts
const itemsCity = document.querySelectorAll('.city-list-item');
const city = document.querySelector('.wrapper-city label');

itemsCity.forEach((item, index) => item.addEventListener('click', function(event) {
    if(!event.target) return;

    city.querySelector('span').textContent = event.target.textContent;
    city.classList.add('checked');
    document.getElementById('city').checked = false;
    document.querySelectorAll('.city-container').forEach((elem, i) => {
        if (index === i) elem.classList.add('open');
        else if(elem.classList.contains('open')) elem.classList.remove('open');
    })
}))

