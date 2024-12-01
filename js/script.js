const init_countdown = () => {
    var date = new Date(new Date("2024-12-07 11:00:00").toLocaleString('en-US', { timeZone: 'America/New_York' }))

    var timeUntil = date.getTime(), expired = false

    console.log("here!")

    function updateCountdown() {
        console.log("here2")
        var timeNow = new Date().getTime()
        var distance = timeUntil - timeNow
    
        var days = Math.floor(distance / (1000 * 60 * 60 * 24))
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
        $('#countdown-days').text(days)
        $('#countdown-hours').text(hours)
        $('#countdown-minutes').text(minutes)
        $('#countdown-seconds').text(seconds)
    }

    setInterval(updateCountdown, 1000)
}

const toggleMenu = () => {
    // $(".modal-container.submenu").toggleClass("open")
    // $('.modal-container.submenu').attr('aria-hidden', !$('.modal-container.submenu').hasClass("open"))

    // $(".submenu-modal").toggleClass("open")
    // $("body").toggleClass("modal-open")
    // $(".header-nav").toggleClass("modal-open")

    // modalOpenPadding()

    $('.modal-container').toggleClass('open')
    $('.header .btn-icon-menu').toggleClass('active')

    $('.header .btn-icon-menu svg').toggleClass('rotate')
    $('.header .btn-icon-menu svg').toggleClass('rotate-reset')
}

$(document).ready(function(){
    $('button.btn-menuitem').on('click', function(){
        console.log($(this).attr('id'))

        $('html, body').animate({
            scrollTop: $("section#"+$(this).attr('id')).offset().top - $('.header-container').height()
        }, 100);
    })

    $(window).on("load", function(){
        init_countdown()
    })

    $(window).on("load resize", function (){
        $('body main').css({'margin-top' : $('.header-container').height()})
        $('.modal-container').css({'top' : $('.header-container').height()})

        $('.btn-icon-menu:hidden, .modal-container:hidden, .header-nav .main-nav:hidden').attr('aria-hidden', true)
        $('.btn-icon-menu:visible, .modal-container:visible, .header-nav .main-nav:visible').attr('aria-hidden', false)

        if ($(window).width() > 713){
            if($('.modal-container').hasClass('open')) toggleMenu()
        }
    })

    $(window).on("scroll", function (){
        //
    })
})