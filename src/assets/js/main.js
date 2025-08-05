document.addEventListener('DOMContentLoaded', function () {

    // Инициализация WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    // Автоматическая прокрутка на странице about
    if (window.location.pathname.includes('about.html') || window.location.pathname.endsWith('/about')) {
        setTimeout(function() {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection) {
                // Получаем высоту header для компенсации
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Прокручиваем с учетом высоты header
                const elementPosition = aboutSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        }, 1500); // 1.5 секунды (0.5s задержка анимации + 1s после появления)
    }

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
    const burgerBtnFilters = document.querySelector('#filters-btn');
    const burgerBtnFiltersClose = document.querySelector('#burger-filters-close');
    const burgerMenuFilters = document.querySelector('.burger__menu__filters');
    if (burgerBtnFilters) {
        burgerBtnFilters.addEventListener('click', function () {
            burgerMenuFilters.classList.add('active');
            disableScroll();

        })
        burgerBtnFiltersClose.addEventListener('click', function () {
            burgerMenuFilters.classList.remove('active');
            enableScroll();

        })
    }

    // Инициализация табов (оставляем для обратной совместимости)
    const tabButtons = document.querySelectorAll('.stuntmans__tabs__btn');
    const tabContents = document.querySelectorAll('.stuntmans__tabs__content__item');
    if (tabButtons.length > 0) {
        // По умолчанию показываем первый таб
        const firstContent = document.querySelector('.stuntmans__tabs__content__item[data-content="1"]');
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }


    Fancybox.bind('[data-fancybox]', {});

    // Функциональность для синхронизации фильтров между модальным окном и основными табами
    const modalTabButtons = document.querySelectorAll('#filters-modal .stuntmans__tabs__btn');
    const mainTabButtons = document.querySelectorAll('.stuntmans__tabs__btn');
    const mainTabContents = document.querySelectorAll('.stuntmans__tabs__content__item');

    function syncTabs(clickedButton, isFromModal = false) {
        const tabId = clickedButton.getAttribute('data-tab');

        // Обновляем кнопки в основном интерфейсе
        mainTabButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        const mainActiveButton = document.querySelector('.stuntmans__tabs__btn[data-tab="' + tabId + '"]');
        if (mainActiveButton) {
            mainActiveButton.classList.add('active');
        }

        // Обновляем кнопки в модальном окне
        modalTabButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        const modalActiveButton = document.querySelector('#filters-modal .stuntmans__tabs__btn[data-tab="' + tabId + '"]');
        if (modalActiveButton) {
            modalActiveButton.classList.add('active');
        }

        // Обновляем контент
        mainTabContents.forEach(function (content) {
            content.classList.remove('active');
        });
        const activeContent = document.querySelector('.stuntmans__tabs__content__item[data-content="' + tabId + '"]');
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Если клик был из модального окна, закрываем его
        if (isFromModal) {
            const modal = document.getElementById('filters-modal');
            if (modal) {
                modal.classList.remove('modal--active');
                document.body.style.overflowY = '';
            }
        }
    }

    // Обработчики для кнопок в модальном окне
    modalTabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            syncTabs(this, true);
        });
    });

    // Обновляем обработчики для основных кнопок
    mainTabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            syncTabs(this, false);
        });
    });

    // Обработчики для кнопок фильтров в модальном окне
    const modalFilterButtons = document.querySelectorAll('.burger__menu__filters .stuntmans__tabs__btn');

    modalFilterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Синхронизируем табы
            syncTabs(this, false);
            
            // Закрываем модальное окно фильтров
            if (burgerMenuFilters) {
                burgerMenuFilters.classList.remove('active');
                enableScroll();
            }
        });
    });

    const filmsSwiper = new Swiper('.films-swiper', {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: -100,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        direction: 'horizontal',
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: -50,
            },
            640: {
                slidesPerView: 4.5,
                spaceBetween: -120,
            }
        },
        pagination: {
            el: '.films-swiper__pagination',
            clickable: true,
        },
    });

    // Инициализация portfolio-swiper
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
        slidesPerView: 4.5,
        centeredSlides: false,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.portfolio-swiper__button-next',
            prevEl: '.portfolio-swiper__button-prev',
        },
        // breakpoints: {
        //     320: {
        //         slidesPerView: 1.5,
        //         spaceBetween: 20,
        //     },
        //     768: {
        //         slidesPerView: 3,
        //         spaceBetween: 25,
        //     },
        //     1024: {
        //         slidesPerView: 4,
        //         spaceBetween: 30,
        //     },
        //     1440: {
        //         slidesPerView: 5,
        //         spaceBetween: 30,
        //     }
        // }
    });

})

