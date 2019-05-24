
let tops = document.getElementsByClassName('card-top');

for (const top of tops) {
    if (!top.hasAttribute('link')) continue;
    top.addEventListener('click', (event) => {
        let target = top.getAttribute('link');
        let modals = document.getElementsByClassName('modal');
        for (const modal of modals) {
            if (modal.id == target) {
                modal.className += " show";
            } else {
                modal.className = modal.className.replace(" show", '');
            }
        }
    });
}