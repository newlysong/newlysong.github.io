// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDmZstEpQap3zO3uw3mSnkTr0XAb7JbTP0",
  authDomain: "portfolio-12b2d.firebaseapp.com",
  projectId: "portfolio-12b2d",
  storageBucket: "portfolio-12b2d.appspot.com",
  messagingSenderId: "569613237454",
  appId: "1:569613237454:web:81d5c90cdd257d4be4249f",
  measurementId: "G-LZV9B5DEZZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let index = 0;
 const totalWorkItems = $(".work-item").length;

  $(window).on("load",function(){
     $(".preloader").addClass("loaded");
  })

  $(document).ready(function () {

    // nav toggle
    $(".nav-toggle").click(function(){
      $(".header .nav").slideToggle();
    })
    $(".header .nav a").click(function(){
      if($(window).width() < 768){
         $(".header .nav").slideToggle();
      }
    })

    // fixed header
    $(window).scroll(function(){
      if($(this).scrollTop() > 100){
        $(".header").addClass("fixed");
      }
      else{
        $(".header").removeClass("fixed");
      }
    })

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
    });

     $('.work-item-inner').click(function() {
         var largeImage = $(this).find('img').data('large');
         var fileType = largeImage.split('.').pop();

         if (fileType === 'mp4') {
             $('.lightbox-video').attr('src', largeImage).show();
             $('.lightbox-iframe').hide();
         } else if (fileType === 'html') {
             $('.lightbox-iframe').attr('src', largeImage).show();
             $('.lightbox-video').hide();
         }

         $('.lightbox').addClass('open');
     });

     $('.lightbox-close').click(function() {
         $('.lightbox').removeClass('open');
         $('.lightbox-video').attr('src', '').hide();
         $('.lightbox-iframe').attr('src', '').hide();
     });

     $('.contact-form form').submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    var name = $('#nameInput').val();
    var email = $('#emailInput').val();
    var message = $('#messageInput').val();

    // Add data to Firebase
    firebase.firestore().collection("messages").add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Message sent successfully!"); // Display success message
        // clear the form fields
        $('#nameInput').val('');
        $('#emailInput').val('');
        $('#messageInput').val('');

    }).catch((error) => {
        console.error("Error sending message: ", error);
    });
});

 });
