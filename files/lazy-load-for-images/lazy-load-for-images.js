document.addEventListener("DOMContentLoaded", function() {
    const wrapLazyLoadImage = document.querySelectorAll('.wrap-lazy-load-image')
    /*wrapLazyLoadImage.forEach(imageWrapper => {
        const image = imageWrapper.querySelector('img')
        if (image) {
            const spinner = document.createElement('span')
            spinner.className = 'sk-spinner-pulse'
            image.insertAdjacentElement('afterend', spinner)
        }
    })*/
    
    const lazyLoadImages = document.querySelectorAll('.wrap-lazy-load-image img');
    lazyLoadImages.forEach(img => {
      if (img.getAttribute('data-src') === null) {
        img.setAttribute('data-src', img.getAttribute('src'));
        img.removeAttribute('src');
        img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
      }
    })
    const lazyImages = lazyLoadImages;
    const windowHeight = document.documentElement.clientHeight;
    let lazyImagesPositions = []
    if (lazyImages.length > 0) {
        lazyImages.forEach(img => {
            if (img.dataset.src || img.dataset.srcset) {
                lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset)
                lazyScrollCheck();
            }
        })
    }
    window.addEventListener("scroll", lazyScroll)
    function lazyScroll() {
        if (lazyLoadImages) {
            lazyScrollCheck()
        }
    }
    function lazyScrollCheck() {
        let imgIndex = lazyImagesPositions.findIndex(
            item => pageYOffset > item - windowHeight
        );
        if (imgIndex >= 0) {
            if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
                lazyImages[imgIndex].removeAttribute('data-src')
                lazyImages[imgIndex].addEventListener("load", event => {
                    lazyImages[imgIndex].parentNode.classList.add('img-loaded')
                });
            } else if (lazyImages[imgIndex].dataset.src) {
                lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.srcset
                lazyImages[imgIndex].removeAttribute('data-srcset')
                lazyImages[imgIndex].addEventListener("load", event => {
                    lazyImages[imgIndex].parentNode.classList.add('img-loaded')
                })
            }
            delete lazyImagesPositions[imgIndex]
        }
    }
})