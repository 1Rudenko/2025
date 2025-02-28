// Строгий режим
"use strict"

window.addEventListener('load', windowLoad);
const html = document.documentElement;

function windowLoad() {
	document.addEventListener('click', documentActions);
	document.addEventListener('keydown', documentActions);
	html.classList.add('loaded');
}
function documentActions(e) {
	const type = e.type
	const targetElement = e.target

	if (type === 'click') {
		// Меню-бургер
		if (targetElement.closest('.icon-menu')) {
			html.classList.toggle('menu-open');
		}
		targetElement.closest('.menu__link') && html.classList.contains('menu-open') ? html.classList.remove('menu-open') : null

		// Попап
		// Закриття
		if (document.querySelector('.popup--open') && (!targetElement.closest('.body-popup') || targetElement.closest('.body-popup__close'))) {
			popupClose()
		}
		// Відкриття
		if (targetElement.closest('[data-popup]')) {
			const curentElement = targetElement.closest('[data-popup]')
			popupOpen(curentElement)
		}
	} else if (type === 'keydown') {
		const key = e.key
		if (key === 'Escape') {
			document.querySelector('.popup--open') ? popupClose() : null
			// ....
		}
	}
}

function popupClose() {
	const curentPopup = document.querySelector('.popup--open')
	curentPopup.classList.remove('popup--open')
	setTimeout(() => {
		bodyLock(false)
	}, 500);
}
function popupOpen(curentElement) {
	const curentPopup = document.querySelector(curentElement.dataset.popup)
	if (curentPopup) {
		bodyLock(true)
		curentPopup.classList.add('popup--open')
	} else {
		console.log('Такого попапу не існує')
	}
}

function bodyLock(mode) {
	let lockPaddingValue = (window.innerWidth - document.body.offsetWidth) + 'px'
	lockPaddingValue = mode ? lockPaddingValue : 0;
	document.body.style.paddingInlineEnd = lockPaddingValue

	const paddingLockElements = document.querySelectorAll('[data-pl]')
	paddingLockElements.forEach(paddingLockElement => {
		if (paddingLockElement.dataset.pl === 'inset') {
			paddingLockElement.style.insetInlineEnd = lockPaddingValue
		} else {
			paddingLockElement.style.paddingInlineEnd = lockPaddingValue
		}
	});

	document.documentElement.classList.toggle('lock', mode)
}



// document.addEventListener("DOMContentLoaded", function () {
//     // Отримуємо всі заголовки спойлерів
//     const titles = document.querySelectorAll(".thesis__title");

//     titles.forEach(title => {
//         // Ховаємо текст за замовчуванням
//         const content = title.nextElementSibling;
//         if (content) {
//             content.style.display = "none";
//         }

//         title.addEventListener("click", function () {
//             // Перемикаємо клас 'active' для заголовка
//             this.classList.toggle("active");
            
//             // Отримуємо наступний елемент (текст спойлера)
//             if (content) {
//                 content.style.display = this.classList.contains("active") ? "block" : "none";
//             }
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо всі заголовки спойлерів
    const titles = document.querySelectorAll(".thesis__title");

    titles.forEach(title => {
        // Ховаємо текст за замовчуванням
        const content = title.nextElementSibling;
        if (content) {
            content.style.maxHeight = "0";
            content.style.overflow = "hidden";
            content.style.transition = "max-height 0.3s ease-out";
        }

        title.addEventListener("click", function () {
            // Перемикаємо клас 'active' для заголовка
            this.classList.toggle("active");
            
            // Отримуємо наступний елемент (текст спойлера)
            if (content) {
                if (this.classList.contains("active")) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = "0";
                }
            }
        });
    });
});
