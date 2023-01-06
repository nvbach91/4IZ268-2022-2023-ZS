(() => {
    const menuWrapper = document.querySelector('.menu-wrapper');
    const menuToggleButton = document.getElementById('menu-toggle-button');

    menuToggleButton.addEventListener('click', () => {
        if (menuWrapper.classList.contains('menu-wrapper')) {
            menuWrapper.classList.replace('menu-wrapper', 'menu-wrapper-show');
        } else {
            menuWrapper.classList.replace('menu-wrapper-show', 'menu-wrapper');
        }
    });
})();