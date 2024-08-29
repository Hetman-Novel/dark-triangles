document.addEventListener('DOMContentLoaded', function () {

   // Filter top
   if (document.querySelector('.video-carousel-page-fs__topFilters')) {
      let videoTopFilters = document.querySelectorAll('.video-carousel-page-fs__topFilters li a');
      let wrapVideos = document.querySelector('.wrap-videos');
   
      // Добавляем класс 'block-active' к wrap-videos при загрузке страницы
      if (wrapVideos) {
         wrapVideos.classList.add('block-active');
      }
   
      videoTopFilters.forEach(function(videoTopFilter) {
         videoTopFilter.addEventListener('click', function(e) {
            e.preventDefault();
            videoTopFilters.forEach(function(videoTopFilter) {
               videoTopFilter.classList.remove('active');
            });
            this.classList.add('active');
   
            var id = this.getAttribute('data-id-menu');
            if (id === 'all') {
               if (wrapVideos) {
                  wrapVideos.classList.add('block-active');
                  var VideosBlocks = document.querySelectorAll('.video-carousel-page-block-videos__block');
                  VideosBlocks.forEach(function(VideosBlock) {
                     VideosBlock.classList.remove('block-active');
                  });
               }
            } else {
               if (wrapVideos) {
                  wrapVideos.classList.remove('block-active');
               }
               var ProfileItemBlocks = document.querySelectorAll('.video-carousel-page-block-videos__block');
               ProfileItemBlocks.forEach(function(ProfileItemBlock) {
                  if (ProfileItemBlock.id === id) {
                     ProfileItemBlock.classList.add('block-active');
                     ProfileItemBlock.classList.add('active');
                  } else {
                     ProfileItemBlock.classList.remove('block-active');
                     ProfileItemBlock.classList.remove('active');
                  }
               });
            }
         });
      });
   }

   // Buttons episodes




   let videoSingleEpisodesButtons = document.querySelector('.video-single__episodesButtons');
   let episodes = [1, 2, 3, 4, 5];
   let allVideos = document.querySelectorAll('.video-single__blockVideo iframe');
   let activeVideo = document.querySelector('.video-single__blockVideo iframe.active');
   let activeButton = document.querySelector('.video-single__episodesButtons button.active');
   let progressBar;
   
   function logError(message, error) {
       console.error(`Error: ${message}`, error);
       alert(`Error: ${message}`);
   }
   
   function updateProgress(currentTime, duration, progressBarElement) {
       try {
           if (duration > 0) {
               let progressPercent = (currentTime / duration) * 100;
               if (progressPercent > 100 || progressPercent < 0) {
                   throw new Error(`Invalid progress: ${progressPercent}%`);
               }
               progressBarElement.style.width = `${progressPercent}%`;
           }
       } catch (error) {
           logError('Failed to update progress', error);
       }
   }
   
   function trackVideoProgress(videoElement, progressBarElement) {
       let playerWindow = videoElement.contentWindow;
       let duration = 0;
   
       function update() {
           try {
               playerWindow.postMessage(JSON.stringify({
                   event: "command",
                   func: "getCurrentTime",
                   args: []
               }), "*");
   
               window.addEventListener('message', function(event) {
                   if (event.origin === "https://www.youtube.com" && typeof event.data === 'string') {
                       try {
                           let data = JSON.parse(event.data);
   
                           if (data.event === 'infoDelivery' && data.info) {
                               let currentTime = data.info.currentTime || 0;
                               duration = data.info.duration || 0;
                               updateProgress(currentTime, duration, progressBarElement);
                           }
                       } catch (e) {
                           logError('Error parsing message data', e);
                       }
                   }
               });
           } catch (error) {
               logError('Failed to track video progress', error);
           }
   
           requestAnimationFrame(update);
       }
   
       requestAnimationFrame(update);
   }
   
   function initializeProgressTracking(videoElement, buttonElement) {
       try {
           allVideos.forEach(video => {
               video.contentWindow.postMessage(JSON.stringify({
                   event: "command",
                   func: "pauseVideo",
                   args: []
               }), "*");
           });
   
           episodes.forEach(i => {
               document.getElementById(`episode-${i}`).classList.remove('active');
               document.getElementById(`episode-btn-${i}`).classList.remove('active');
               document.getElementById(`episode-btn-${i}`).querySelector('.progress-bar').style.width = '0%';
           });
   
           videoElement.classList.add('active');
           buttonElement.classList.add('active');
           
           progressBar = buttonElement.querySelector('.progress-bar');
           trackVideoProgress(videoElement, progressBar);
       } catch (error) {
           logError('Failed to initialize progress tracking', error);
       }
   }
   
   if (activeVideo && activeButton) {
       initializeProgressTracking(activeVideo, activeButton);
   }
   
   episodes.forEach(num => {
       let episode = document.getElementById(`episode-${num}`);
       let episodeBtn = document.getElementById(`episode-btn-${num}`);
   
       if (episode) {
           episodeBtn.addEventListener('click', () => {
               try {
                   episodeBtn.querySelector('.progress-bar').style.width = '0%';
                   initializeProgressTracking(episode, episodeBtn);
               } catch (error) {
                   logError('Failed to handle button click', error);
               }
           });
       }
   });
   





   


   /* --- */
   
   let blockSearchForm = document.querySelector('.block-search-form')
   if (blockSearchForm) {
      document.getElementById('show-form-search').addEventListener('click', () => {
         blockSearchForm.classList.toggle('show')
      })
   }
   
   const to_top_btn = document.getElementById("back-to-top");
   if (to_top_btn) {
      to_top_btn.addEventListener("click", function () {
         window.scrollBy({ top: -document.documentElement.scrollHeight, behavior: "smooth" });
      });
   }

});