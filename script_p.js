//===================---//nav_burger//---======================//

const navBurger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.querySelector('body');

navBurger.addEventListener("click", function() {
	navBurger.classList.toggle('active');
	nav.classList.toggle('menu_active');
	body.classList.toggle('lock');
});

window.addEventListener("resize", function() {
	if (window.innerWidth > 800) {
		navBurger.classList.remove('active');
		nav.classList.remove('menu_active');
		body.classList.remove('lock');
	}
});

//=====================---//nav_burger//---========================//

//===================---//nav//---======================//

const windowHeight = window.innerHeight;
if (window.scrollY > windowHeight * 0.4) {
	nav.classList.add('color');
}

window.onscroll = function navIvents() {
	const scrollY = window.scrollY;
	
	if (scrollY > windowHeight * 0.4) {
		nav.classList.add('color');
	}else{
		nav.classList.remove('color');
	}
	for (let i = 0; i < navLincks.length; i++) {
		let scrollToItem = document.querySelector(navLincks[i].dataset.goto);
		let scrollToValue = scrollToItem.offsetTop;
		let menuPosition = scrollY > scrollToValue - windowHeight * 0.7 && scrollY < scrollToValue + windowHeight * 0.3 && keyNavLinck
		if (menuPosition) {
			removeActiveNavLinck();
			navLincks[i].closest('.menu_item').classList.add('active');
		}
	}
}

// 
//===================---//nav//---======================//

//===================---//parallax//---======================//
const parallax = document.querySelector('.parallax');

const parallaxBg = document.querySelector('.parallax_bg > img');
const parallaxPhone = document.querySelector('.parallax_phone > img');
const parallaxTablet = document.querySelector('.parallax_tablet > img');

if (parallax && (window.innerWidth > 800)) {
	
	// coefficient
	// console.log(parallaxBg)
	const forBg = 40;
	const forPhone = 5;
	const forTablet = 20;

	let sped = 0.1;

	let positioinX = 0, positioinY = 0;
	let coordXprosent = 0, coordYprosent = 0;

	function setParalaxStyle() {
		const distX = coordXprosent - positioinX;
		const distY = coordYprosent - positioinY;

		positioinX = positioinX + (distX * sped);
		positioinY = positioinY + (distY * sped);
		// console.log(positioinY, forPhone)

		requestAnimationFrame(setParalaxStyle);
	}
	setParalaxStyle();

	window.addEventListener("mousemove", function(e){
		if (window.innerWidth < 800) {
			parallaxBg.style.cssText = `transform: translate(0%, 0%)`;
			parallaxPhone.style.cssText = `transform: translate(0%, 0%)`;
			parallaxTablet.style.cssText = `transform: translate(0%, 0%)`
		}
		const parallaxWidth = parallax.offsetWidth;
		const parallaxHeight = parallax.offsetHeight;
		// Style
		parallaxBg.style.cssText = `transform: translate(${positioinX / forBg - 10}%, ${positioinY / forBg - 10}%)`;
		parallaxPhone.style.cssText = `transform: translate(${positioinX / forPhone}%, ${positioinY / forPhone / 4}%)`;
		parallaxTablet.style.cssText = `transform: translate(${positioinX / forTablet}%, ${positioinY / forTablet / 10}%)`;

		const coordX = e.pageX - parallaxWidth / 2;
		const coordY = e.pageY - parallaxHeight / 2;

		coordXprosent = coordX / parallaxWidth * 100;
		coordYprosent = coordY / parallaxWidth * 100;


	});
}
//===================---//parallax//---======================//

//===================---//tab//---======================//
const tabs = document.querySelectorAll('.tab_btn')
const tabsImges = document.querySelectorAll('.service_picture')

for (let i = 0; i < tabs.length; i++) {
	const tab = tabs[i]
	const img = tabsImges[i]
	tab.addEventListener('click', function(e) {
		e.preventDefault()
		tabRemove()
		tab.classList.add('active')
		img.classList.add('active')
	})
}

function tabRemove() {
	let tabActive = document.querySelector('.tab_btn.active')
	let imgActive = document.querySelector('.service_picture.active')

	imgActive.classList.remove('active')
	tabActive.classList.remove('active')
}
//===================---//tab//---======================//

//===================---//slider-coment//---======================//
let serviceComents = new Swiper('.coments_body',{
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	speed: 600,

	loop: true
})
//===================---//slider-coment//---======================//

//=====================---//scroll-to//---========================//

var navLincks = document.querySelectorAll('.menu_linck[data-goto]');

keyNavLinck = true;

for (let i = 0; i < navLincks.length; i++) {
	const navLinck = navLincks[i];
	navLinck.addEventListener('click', function(e) {
		if (navLinck.dataset.goto && document.querySelector(navLinck.dataset.goto)) {
			removeActiveNavLinck();
			navBurger.classList.remove('active');
			nav.classList.remove('menu_active');
			body.classList.remove('lock');
			navLinck.closest('.menu_item').classList.add('active');
			let el = document.querySelector(navLinck.dataset.goto);

			window.scrollTo({
				top: el.offsetTop - nav.offsetHeight,
				behavior: 'smooth'
			});

			keyNavLinck = false;
			e.preventDefault();
			setTimeout(function() {
				keyNavLinck = true;
			}, 1000);
		}
	});
}

function removeActiveNavLinck() {
	let navActive = document.querySelector('.menu_item.active');

	navActive.classList.remove('active');
}

//=====================---//scroll-to//---========================//

//======================---//popup//---==========================//

const popapLinkcs = document.querySelectorAll('.popap_linck');
const lockPading = document.querySelector(".lock_pading");

let unlock = true;

const timeout = 800;

let = sliderPopap = new Swiper('.popap_slider',{
  navigation: {
   	nextEl: '.swiper-button-next',
   	prevEl: '.swiper-button-prev'
  },

  pagination: {
   	el: '.swiper-pagination',
   	type: 'fraction'
  },

	observer: true,
	observerSlideChildren: true,
	observerParents: true,
	speed: 600,

	// breakpoints: {
	// 	effect: 'fade',
	
	// 	speed: 500,

	// 	fadeEffect: {
	// 		crossFade: true,
	// 	},
	// },

	autoHeight: true,

	// effect: 'cube',

	// cubeEffect: {
	// 	slideShadows: true,
	// 	shadow: true,
	// 	shadowOffset: 20,
	// 	shadowScale: 1,
	// },
});

var gallerySlides = document.querySelectorAll('.gallery_slide');
window.addEventListener("resize", function() {
	for (let i = 0; i < gallerySlides.length; i++) {
		let gallerySlide = gallerySlides[i];
		gallerySlide.style.cssText = '';
	}
})

if (popapLinkcs.length > 0) {
	for (let i = 0; i < popapLinkcs.length; i++) {
		const popapLinck = popapLinkcs[i];
		popapLinck.addEventListener("click", function(e) {
			const popapName = popapLinck.getAttribute('href').replace('#', '');
			const curentPopap = document.getElementById(popapName);
			popapOpen(curentPopap);
			sliderPopap.slideTo(i, 10);
			e.preventDefault();
		});
	}
}

const popapCloseIcon = document.querySelectorAll('.cloce_popap');

if (popapCloseIcon.length > 0) {
	for (let i = 0; i < popapCloseIcon.length; i++) {
		const el =popapCloseIcon[i];
		el.addEventListener('click', function(e) {
			popapClose(el.closest('.popap'));
			e.preventDefault();
		});
	}
}

const plan = document.querySelector('.plan');

function popapOpen(curentPopap) {
	if (curentPopap && unlock) {
		const popapActive = document.querySelector('.popap.open');
		
		if (popapActive) {
			popapClose(popapActive, false);
		}
		else {
			bodyLock();
		}
		curentPopap.classList.add('open');
		nav.classList.add('up_nav');
		curentPopap.addEventListener("click", function(e) {
			if (!e.target.closest('.popap_content')) {
				popapClose(e.target.closest('.popap'));
			}
		});
	}
}


function popapClose (popapActive, doUnlock = true) {
	if (unlock) {
		popapActive.classList.remove('open');
		nav.classList.remove('up_nav');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPadingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPading) {
		for (let i = 0; i < lockPading.length; i++) {
			const el = lockPading[i];
			el.style.padingRight = lockPadingValue;
		}
	}
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPading) {
			for (let i = 0; i < lockPading.length; i++) {
				const el = lockPading[i];
				el.style.padingRight = '0px';
			}
		}
		body.style.padingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popapActive = document.querySelector('.popap.open');
		popapClose(popapActive);
	}
});

//======================---//popup//---==========================//
