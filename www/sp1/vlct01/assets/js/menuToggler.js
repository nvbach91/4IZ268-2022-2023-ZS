document.getElementById("mobile_menu_toggler").addEventListener("click", toggleMenu);

function toggleMenu() {
    const element = document.getElementById('main-nav');
    if (element.classList.contains('menu_opened')) {
        element.classList.remove('menu_opened');
    }
    else {
        element.classList.add('menu_opened');
    }
}