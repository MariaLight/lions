document.addEventListener('DOMContentLoaded', function () {

    const btns = document.querySelectorAll('[data-modal]');
    const body = document.querySelector('body');
    const btnClose = document.querySelectorAll('[data-modal-close]');

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const modalId = e.target.closest('[data-modal]').getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('modal--active');
                body.style.overflow = 'hidden';
                addModalEventListeners(modal);
            }
        });
    });

    btnClose.forEach(close => {
        close.addEventListener('click', e => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    function addModalEventListeners(modal) {
        modal.addEventListener('keydown', onModalKeyDown);
        modal.addEventListener('click', onModalClick);
    }

    function removeModalEventListeners(modal) {
        modal.removeEventListener('keydown', onModalKeyDown);
        modal.removeEventListener('click', onModalClick);
    }

    function closeModal(modal) {
        modal.classList.remove('modal--active');
        body.style.overflowY = '';
        removeModalEventListeners(modal);
    }

    function onModalKeyDown(e) {
        const modal = e.currentTarget;
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    }

    function onModalClick(e) {
        const modalContent = e.currentTarget.querySelector('.modal__content');
        if (!modalContent.contains(e.target)) {
            closeModal(e.currentTarget);
        }
    }



    const burgerBtn = document.querySelector('#burger');
    const burgerBtnClose = document.querySelector('#burger-close');
    const burgerMenu = document.querySelector('.burger__menu');
    // Блокируем прокрутку страницы при открытом бургер-меню
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }
    burgerBtn.addEventListener('click', function () {
        burgerMenu.classList.add('active');
        disableScroll();

    })
    burgerBtnClose.addEventListener('click', function () {
        burgerMenu.classList.remove('active');
        enableScroll();

    })

    const tabButtons = document.querySelectorAll('.stuntmans__tabs__btn');
    const tabContents = document.querySelectorAll('.stuntmans__tabs__content__item');
    if (tabButtons.length > 0) {
        tabButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Удаляем активный класс у всех кнопок
                tabButtons.forEach(function (b) {
                    b.classList.remove('active');
                });
                // Добавляем активный класс на выбранную кнопку
                this.classList.add('active');

                const tabId = this.getAttribute('data-tab');
                // Скрываем все табы
                tabContents.forEach(function (content) {
                    content.classList.remove('active');
                });
                // Показываем выбранный таб
                const activeContent = document.querySelector('.stuntmans__tabs__content__item[data-content="' + tabId + '"]');
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });

        // По умолчанию показываем первый таб
        const firstContent = document.querySelector('.stuntmans__tabs__content__item[data-tab="1"]');
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }


    Fancybox.bind('[data-fancybox]', {});

})

