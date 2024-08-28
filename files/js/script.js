document.addEventListener('DOMContentLoaded', function () {
   
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