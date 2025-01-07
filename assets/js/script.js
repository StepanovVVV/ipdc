// Header/burger-menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu a');

    burger.addEventListener('click', function() {
        const isActive = burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll', isActive);
    });

    overlay.addEventListener('click', function() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

// LazyLoad img/iframe/video
document.addEventListener("DOMContentLoaded", function() {
    // Specify the tags to which lazy loading will be applied
    const tags = ['img', 'iframe', 'video'];

    tags.forEach(tag => {
        // Find all elements with the specified tag
        const elements = document.querySelectorAll(tag);

        elements.forEach(element => {
            // Check if the element has a src attribute
            if (element.hasAttribute('src')) {
                // Get the value of the src attribute
                const srcValue = element.getAttribute('src');

                // Set a new data-src attribute with the same value
                element.setAttribute('data-src', srcValue);

                // Remove the original src attribute
                element.removeAttribute('src');

                // Add the lazy class
                element.classList.add('lazy');
            }

            // If this is a video, also process the source elements
            if (tag === 'video') {
                const sources = element.querySelectorAll('source');

                sources.forEach(source => {
                    if (source.hasAttribute('src')) {
                        const srcValue = source.getAttribute('src');
                        source.setAttribute('data-src', srcValue);
                        source.removeAttribute('src');
                    }
                });
            }
        });
    });

    // Initialize lazyload.js
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });

    // Load all images in slider after init
    $(document).on("init", ".slick-slider", function(e, slick) {
        var images = slick.$slides.find('img').toArray();
        if (images.length > 0) {
            lazyLoadInstance.loadAll(images);
        }
    });
});

//Remove placeholder on click
$( 'input,textarea' ).on('focus', function() {
    var $this = $(this);
    if ($this.attr('placeholder')) {
        $this.data('placeholder', $this.attr('placeholder'));
        $this.attr('placeholder', '');
    }
}).on('blur', function() {
    var $this = $(this);
    if ($this.data('placeholder')) {
        $this.attr('placeholder', $this.data('placeholder'));
    }
});

// Parallax/jarallax effect
jarallax(document.querySelectorAll('.jarallax'), {
    speed: .5,
    imgSize: 'cover',
    imgPosition: 'center',
});

// Home slider
$(document).ready(function () {
    var $slider = $('.home-slider__slick');
    var slideCount = $slider.children().length;

    $slider.slick({
        dots: slideCount > 1,
        arrows: false, 
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                }
            }
        ] 
    });
});

// Function for start page
function showPageAfterDelay() {
    if (document.readyState === 'complete') {
        setTimeout(function () {
            document.body.classList.remove('hidden');
        }, 450);
    } else {
        window.addEventListener('load', function () {
            setTimeout(function () {
                document.body.classList.remove('hidden');
            }, 450);
        });
    }
}

showPageAfterDelay();

// Partners slider
$('.partners__slick').slick({
    arrows: false, 
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                variableWidth: false,
            }
        },
        {
            breakpoint: 756,
            settings: {
                slidesToShow: 4,
                variableWidth: false,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 3,
                variableWidth: false,
            }
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 3,
                variableWidth: false,
                dots: false,
            }
        }
    ] 
});

// For active form
const input = document.querySelector('.form__input');
const label = document.querySelector('.form__label');

input.addEventListener('focus', function() {
    label.classList.add('active');
});

input.addEventListener('blur', function() {
    if (input.value === '') {
        label.classList.remove('active');
    }
});

// Add class for header scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});