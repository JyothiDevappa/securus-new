
        fetch("footer.html")
          .then(res => res.text())
          .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;

            setTimeout(() => {
              const script = document.createElement("script");
              script.src = "js/bootstrap.min.js";
              document.body.appendChild(script);
            }, 100);
          });
          
        setTimeout(function () {
          document.getElementById("heading").style.display = "block";
        }, 5000); // 5000ms = 5 seconds

        
    <div id="footer-placeholder"></div>

      fetch("footer.html")
        .then(res => res.text())
        .then(data => {
          document.getElementById("footer-placeholder").innerHTML = data;

          setTimeout(() => {
            const script = document.createElement("script");
            script.src = "js/bootstrap.min.js";
            document.body.appendChild(script);
          }, 100);
        });

        
        // swiper

         const swiper = new Swiper('.awards-swiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 4,
        spaceBetween: 5,
        breakpoints: {
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });




      
    