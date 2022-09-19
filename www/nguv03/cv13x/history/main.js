$(document).ready(() => {
    const pageButtons = $('.page');
    const heading = $('#heading');

    const renderPage = (pageNumber) => {
        heading.text(`Page ${pageNumber}`);
        document.title = `Page ${pageNumber}`;
    };

    if (!location.hash) {
        history.replaceState({}, 'Page 1', '#page1');
        renderPage(1);
    } else {
        const pageNumber = location.hash.replace('#page', '');
        renderPage(pageNumber || 1);
    }

    pageButtons.click(function () {
        const pageNumber = $(this).data('page');
        if (`#page${pageNumber}` !== location.hash) {
            history.pushState({}, '', `#page${pageNumber}`);
            renderPage(pageNumber);
        }
    });

    $(window).on('popstate', (event) => {
        const pageNumber = location.hash.replace('#page', '');
        renderPage(pageNumber);
    });
});
