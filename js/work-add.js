
document.querySelectorAll(".full-area").forEach(input => {
    input.addEventListener("click", () => {
        if (input.showPicker) {
            input.showPicker();
        } else {
            input.focus();
        }
    });
});
