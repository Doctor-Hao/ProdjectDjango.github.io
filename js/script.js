

var $tabs = function (target) {
	var
		//Переменная _elemTabs хранит DOM-элемент, предоставляющий собой контейнер с вкладками.
	  _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
		_eventTabsShow,
		//Метод _showTab предназначен для скрытия текущей (активной) вкладки и отображения 
		//другой в зависимости от переданной ему ссылки.
	  _showTab = function (tabsLinkTarget) {
		 var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
		 tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
		 tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
		 tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
		 // если следующая вкладка равна активной, то завершаем работу
		 if (tabsLinkTarget === tabsLinkActive) {
			return;
		 }
		 // удаляем классы у текущих активных элементов
		 if (tabsLinkActive !== null) {
			tabsLinkActive.classList.remove('tabs__link_active');
		 }
		 if (tabsPaneShow !== null) {
			tabsPaneShow.classList.remove('tabs__pane_show');
		 }
		 // добавляем классы к элементам (в завимости от выбранной вкладки)
		 tabsLinkTarget.classList.add('tabs__link_active');
		 tabsPaneTarget.classList.add('tabs__pane_show');
		 document.dispatchEvent(_eventTabsShow);
		},
	  //Метод _switchTabTo используется для переключения вкладки по её порядковому номеру.
	  _switchTabTo = function (tabsLinkIndex) {
		 var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
		 if (tabsLinks.length > 0) {
			if (tabsLinkIndex > tabsLinks.length) {
			  tabsLinkIndex = tabsLinks.length;
			} else if (tabsLinkIndex < 1) {
			  tabsLinkIndex = 1;
			}
			_showTab(tabsLinks[tabsLinkIndex - 1]);
		 }
	  };
	
	_eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });
	
	//Установка обработчиков событий для вкладок определяется 
	//с помощью addEventListener и выполняется в момент вызова $tabs.
	_elemTabs.addEventListener('click', function (e) {
	  var tabsLinkTarget = e.target;
	  // завершаем выполнение функции, если кликнули не по ссылке
	  if (!tabsLinkTarget.classList.contains('tabs__link')) {
		 return;
	  }
	  // отменяем стандартное действие
	  e.preventDefault();
	  _showTab(tabsLinkTarget);
	});
	
	return {
	  showTab: function (target) {
		 _showTab(target);
	  },
	  switchTabTo: function (index) {
		 _switchTabTo(index);
	  }
	}
	
	};
	
	$tabs('.tabs');


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
	} else {
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
if (sidebar !== null) {
	sidebar.addEventListener("click", function (e) {
		let sidebar_label = document.querySelector('.article-sidebar__title');
		let sidebar_list = document.querySelector('.article-sidebar__cards');

		sidebar_label.classList.toggle('_active');
		sidebar_list.classList.toggle('_active');
	});
}
//</Sidebar>===========================================================================



//<Register>===========================================================================
let register = document.querySelector('.header__authorization');
register.addEventListener("click", function (e) {
	let authorization = document.querySelector('.header__authorization');
	let popap = document.querySelector('.header__registration');
	let lock = document.querySelector('body');

	authorization.classList.toggle('_active');
	lock.classList.toggle('_bg');

	//открытие попапа
	popap.classList.toggle('_active');

	//закрытие на темную область
	popap.addEventListener("click", function (e) {
		if (!e.target.closest('.registration__content')) {
			popap.classList.remove('_active')
			lock.classList.remove('_bg');
		}
	});

});

//Крестик
let popupClose = document.querySelector('.registration__close');
popupClose.addEventListener("click", function (e) {
	let popap = document.querySelector('.header__registration');
	let lock = document.querySelector('body');

	popap.classList.remove('_active')
	lock.classList.remove('_bg');
});

//</Register>===========================================================================

//<Pagination>===========================================================================

//считаем колличество записей
var n = document.querySelectorAll(".card-content");

if (n.length !== 0) {

	for (var i = 0; i < n.length; i++) {
		count = i + 1;
	}

	var cnt = 6; //сколько отображаем сначала
	var cnt_page = Math.ceil(count / cnt); //кол-во страниц

	//выводим список страниц
	var paginator = document.querySelector(".paginator");
	var page = "";
	for (var i = 0; i < cnt_page; i++) {
		page += "<span class='paginator__span' data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + "[" + (i + 1) + "]" + "</span>";
	}
	paginator.innerHTML = page;

	//выводим первые записи {cnt}
	var div_num = document.querySelectorAll(".card-content");
	for (var i = 0; i < div_num.length; i++) {
		if (i < cnt) {
			div_num[i].style.display = "block";
		}
	}

	var main_page = document.getElementById("page1");
	main_page.classList.add("paginator_active");

	//листаем
	function pagination(event) {
		var e = event || window.event;
		var target = e.target;
		var id = target.id;

		if (target.tagName.toLowerCase() != "span") return;

		var num_ = id.substr(4);
		var data_page = +target.dataset.page;
		main_page.classList.remove("paginator_active");
		main_page = document.getElementById(id);
		main_page.classList.add("paginator_active");

		var j = 0;
		for (var i = 0; i < div_num.length; i++) {
			var data_num = div_num[i].dataset.num;
			if (data_num <= data_page || data_num >= data_page)
				div_num[i].style.display = "none";
		}

		for (var i = data_page; i < div_num.length; i++) {
			if (j >= cnt) break;
			div_num[i].style.display = "block";
			j++;
		}
	}
}

//</Register>===========================================================================

//<Swiper>============================================================================
// Инициализация Swiper
new Swiper('.swiper', {
	//Автовысота
	autoHeight: true,

	//Бесконечная прокрутка
	loop: true,

	//стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

});
//</Swiper>===========================================================================

//<Creation-image>===========================================================================
const inputImage = document.getElementById('target');
const input = document.querySelector('.creation-img-input');
const preview = document.querySelector('.creation__preview');

if (input !== null) {
	input.style.opacity = 0;

	input.addEventListener('change', updateImageDisplay);
	function updateImageDisplay() {
		while (preview.firstChild) {
			preview.removeChild(preview.firstChild);
		}

		const curFiles = input.files;
		if (curFiles.length === 0) {
			const para = document.createElement('p');
			para.textContent = 'No files currently selected for upload';
			preview.appendChild(para);
		} else {

			for (const file of curFiles) {
				const para = document.createElement('p');

				if (validFileType(file)) {
					const image = document.createElement('img');
					image.src = URL.createObjectURL(file);

					const url = image.src = URL.createObjectURL(file);

					inputImage.value = url;

					preview.appendChild(image);
				} else {
					para.textContent = `Not a valid file type. Update your selection.`;
					preview.appendChild(para);
				}
			}
		}
	}

	const fileTypes = [
		'image/apng',
		'image/bmp',
		'image/gif',
		'image/jpeg',
		'image/pjpeg',
		'image/png',
		'image/svg+xml',
		'image/tiff',
		'image/webp',
		`image/x-icon`
	];

	function validFileType(file) {
		return fileTypes.includes(file.type);
	}
}

//</Creation-image>===========================================================================

