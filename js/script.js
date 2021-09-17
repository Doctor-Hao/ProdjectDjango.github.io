
	
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
	callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
	
testWebP(function (support) {
	
	if (support == true) {
	document.querySelector('body').classList.add('webp');
	}else{
	document.querySelector('body').classList.add('no-webp');
	}
});


//<Burger>===========================================================================
let burger = document.querySelector('.icon-menu');
burger.addEventListener("click", function (e) {
	let burger_icon = document.querySelector('.icon-menu');
	let menu = document.querySelector('.header__menu');
	let lock = document.querySelector('body');

	burger_icon.classList.toggle('_active');
	menu.classList.toggle('_active');
	lock.classList.toggle('_lock');
});
//</Burger>===========================================================================

//<Sidebar>===========================================================================
let sidebar = document.querySelector('.article-sidebar__title');
sidebar.addEventListener("click", function (e) {
	let sidebar_label = document.querySelector('.article-sidebar__title');
	let sidebar_list = document.querySelector('.article-sidebar__cards');

	sidebar_label.classList.toggle('_active');
	sidebar_list.classList.toggle('_active');
});
//</Sidebar>===========================================================================

//<Swiper>============================================================================
// Инициализация Swiper
new Swiper('.swiper', {
	//Автовысота
	autoHeight: true,
	
	//стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

});
//</Swiper>===========================================================================

