console.log("125/125\nПри нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\nПри выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20\nПользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20\nАнимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10\nAccordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50\nПри нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25\nПользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25\nВ разделе contacts реализован select с выбором городов +25\nВ зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15\nПри нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10");
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
    document.querySelector('.wrapper-contacts').classList.add('close');

    if(window.matchMedia("(min-width: 381px)")) document.querySelector('.woman').style.marginTop = '14px';
    if(window.matchMedia("(min-width: 768px)")) document.querySelector('.woman').style.marginTop = '0';

    document.querySelectorAll('.city-container').forEach((elem, i) => {
        if (index === i) elem.classList.add('open');
        else if(elem.classList.contains('open')) elem.classList.remove('open');
    })
}))

//The end

