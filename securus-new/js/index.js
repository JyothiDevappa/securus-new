
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
