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



    // const burgerBtn = document.querySelector('#burger');
    // const burgerMenu = document.querySelector('.header__menu');

    // burgerBtn.addEventListener('click', function () {
    //     burgerMenu.classList.toggle('active');
    //     burgerBtn.classList.toggle('active');
    //     console.log(burgerBtn, burgerMenu);
    // })

    // if (window.matchMedia('(max-width: 640px)')) {
    //     const headerMenu = document.querySelector('.header__menu');
    //     headerMenu.addEventListener('click', (e) => {
    //         const targetElement = e.target;
    //         if (targetElement.classList.contains('header__link') && targetElement.parentNode.querySelector('.header__submenu')) {
    //             e.preventDefault();
    //             targetElement.parentNode.classList.toggle('active');
    //             console.log(targetElement);

    //         }

    //     })
    // }
    

    // Fancybox.bind('[data-fancybox]', {});

})

