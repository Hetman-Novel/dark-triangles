const lazyImages = document.querySelectorAll('img[loading="lazy"]');
function addLoadedClass(image) {
   const parentElement = image.parentElement;
   if (image.complete) {
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() {
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass);