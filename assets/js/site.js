
const tops = document.getElementsByClassName('card-top');

for (const top of tops) {
    if (!top.hasAttribute('link')) continue;
    top.addEventListener('click', (event) => {
        const target = top.getAttribute('link');
        const modals = document.getElementsByClassName('modal');
        for (const modal of modals) {
            if (modal.id == target) {
                modal.className += " show";
            } else {
                modal.className = modal.className.replace("show", '').trim();
            }
            
        }
    });
}

const closes = document.getElementsByClassName('close');

for (const close of closes) {
    if (!close.hasAttribute('link')) continue;
    close.addEventListener('click', (event) => {
        const target = close.getAttribute('link');
        const modal = document.getElementById(target);
        modal.className = modal.className.replace(/show/gi, '').trim();
    }); 
}