
(() => {

    const handleElement = $("#handle");

    // Have '@' as the first symbol in '#handle' input
    handleElement.on("keydown", (e) => {
        const key = e.key;
        const len =handleElement.val().length;
        if ((key === "Backspace" || key === "Delete")) {
            if (len == 1) {
                e.preventDefault();
            }
        }  
    })

})();
