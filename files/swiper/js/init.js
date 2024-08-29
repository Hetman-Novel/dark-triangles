document.addEventListener('DOMContentLoaded', function () {
   const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Получаем все изображения с атрибутом loading="lazy"
   function addLoadedClass(image) { // Функция для добавления класса к родителю изображения после его загрузки
      const parentElement = image.parentElement;
      if (image.complete) { // Проверяем, загружено ли изображение
         parentElement.classList.add('loaded');
      } else {
         image.addEventListener('load', function() { // Добавляем событие load, чтобы добавить класс после загрузки изображения
            parentElement.classList.add('loaded');
         });
      }
   }
   lazyImages.forEach(addLoadedClass); // Перебираем все изображения и вызываем функцию addLoadedClass для каждого
});

/* === */

function initializeSlider(sliderId, prevBtnId, nextBtnId) {
   const slider = document.getElementById(sliderId);
   if (slider) {
      new Swiper(slider, {
         navigation: {
            prevEl: `#${prevBtnId}`,
            nextEl: `#${nextBtnId}`,
         },
         //watchOverflow: true,
         spaceBetween: 16,
         loop: true,
         speed: 800,
         effect: 'slide',
         //freeMode: true,
         autoHeight: true,
         slidesPerView: 'auto',
         preloadImages: true,
         lazy: {
            loadOnTransitionStart: true,
            loadPrewNext: true,
         },
         watchSlidesProgress: true,
         watchSlidesVisibility: true,
         on: {
            slideChange: function () {
               updateActiveClass(slider);
            },
            transitionEnd: function () {
               updateActiveClass(slider);
            },
         },
         breakpoints: {
            0: {
               spaceBetween: 8,
            },
            576: {
               spaceBetween: 16,
            },
         }
      });
   }
}

function updateActiveClass(swiperContainer) {
   // Удаляем класс 'active' у всех блоков
   document.querySelectorAll('.video-carousel-page-block-videos__wrap-slider').forEach(function(block) {
      block.parentNode.classList.remove('active');
   });

   // Находим активный слайд
   const activeSlide = swiperContainer.querySelector('.swiper-slide-active');
   if (activeSlide) {
      // Добавляем класс 'active' родительскому блоку swiper
      const parentBlock = activeSlide.closest('.video-carousel-page-block-videos__wrap-slider');
      if (parentBlock) {
         parentBlock.parentNode.classList.add('active');
      }
   }
}

// Для обработки кликов на блоки
document.querySelectorAll('.video-carousel-page-block-videos__wrap-slider').forEach(function(slider) {
   slider.addEventListener('click', function() {
      updateActiveClass(slider); // Обновляем классы
   });
});

// Добавляем класс 'active' первому блоку при открытии страницы
document.addEventListener('DOMContentLoaded', function() {
   const firstBlock = document.querySelector('.video-carousel-page-block-videos__wrap-slider');
   if (firstBlock) {
      firstBlock.parentNode.classList.add('active');
   }
});

if (window.matchMedia("(min-width: 576px)").matches) {
   const spotlightBlockPhotos = document.querySelectorAll('.spotlight-block__blockPhoto');
   spotlightBlockPhotos.forEach(function(spotlightBlockPhoto) {
      spotlightBlockPhoto.classList.add('wrap-lazy-load-image');
   });
}
if (window.matchMedia("(max-width: 575.98px)").matches) {
   const spotlightBlocksPhoto = document.querySelectorAll('.spotlight-block__blockPhoto img');
   spotlightBlocksPhoto.forEach(function(spotlightBlockPhoto) {
      spotlightBlockPhoto.setAttribute('loading', 'lazy');
   });
	const spotlightSlider = document.querySelector('.spotlight-slider');
   if (spotlightSlider) {
      new Swiper(spotlightSlider, {
         autoHeight: true,
         slidesPerView: 2.17,
         slidesPerGroup: 1,
         watchOverflow: true,
         spaceBetween: 21,
         //loop: true,
         //freeMode: true,
         speed: 800,
         effect: 'slide',
         preloadImages: false,
         lazy: {
            loadOnTransitionStart: true,
            loadPrewNext: true,
         },
         watchSlidesProgress: true,
         watchSlidesVisibility: true,
      });
   }
}