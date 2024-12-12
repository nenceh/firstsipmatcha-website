const menu = [
    {
        category_name: 'Matcha',
        category_list: [
            {
                item_name: 'Iced Matcha Latte',
                item_description: 'Smooth and creamy iced matcha latte made with high-quality blend from Uji, Japan',
                item_price: 7,
            },
            {
                item_name: 'Strawberry Iced Matcha Latte',
                item_description: 'A refreshing blend of the signature matcha blend and homemade strawberry syrup, served iced',
                item_price: 7.5,
            },
            {
                item_name: 'Iced Matcha Latte with Strawberry Cream Foam',
                item_description: 'An indulgent twist on our classic iced matcha latte, topped with a fluffy strawberry cream foam',
                item_price: 7.5,
            },
        ],
    },
    {
        category_name: 'Others',
        category_list: [
            {
                item_name: 'Iced Strawberry Milk',
                item_description: 'A sweet, creamy blend of fresh milk, homemade strawberry syrup, and ice',
                item_price: 6,
            },
        ],
    },
]

const init_menu = () => {
    for (let i = 0; i < menu.length; i++){
        let catID = menu[i].category_name.toLowerCase().replace(/\s+/g,'-')
        
        $('<div>',{
            'id' : catID,
            'class' : 'menu-category',
            'html' : $('<h2>',{
                'class' : 'menu-category-heading',
            }).text(menu[i].category_name).add($('<ul>',{
                'class' : 'menu-category-list',
            }))
        }).appendTo('.page#menu .page-body') 

        for(let j = 0; j < menu[i].category_list.length; j++){
            $('<li>',{
                'class' : 'list-item',
                'html' : $('<div>',{
                    'class' : 'list-item-name',
                }).text(menu[i].category_list[j].item_name).add($('<div>',{
                    'class' : 'list-item-info',
                    'html' : $('<div>',{
                        'class' : 'description',
                    }).text(menu[i].category_list[j].item_description).add($('<div>',{
                        'class' : 'price',
                    }).text(menu[i].category_list[j].item_price))
                }))
            }).appendTo('.menu-category#'+catID+' ul.menu-category-list')
        }
    }
}

const init_countdown = () => {
    var date = new Date(new Date("2024-12-21 11:00:00").toLocaleString('en-US', { timeZone: 'America/New_York' }))

    var timeUntil = date.getTime()

    var interval = setInterval(function(){
        var timeNow = new Date().getTime()
        var distance = timeUntil - timeNow, days, hours, minutes, seconds

        if (distance < 0){
            clearInterval(interval)
            days = hours = minutes = seconds = 0

        } else{
            days = Math.floor(distance / (1000 * 60 * 60 * 24))
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            seconds = Math.floor((distance % (1000 * 60)) / 1000)
        }
    
        $('#countdown-days').text(days)
        $('#countdown-hours').text(hours)
        $('#countdown-minutes').text(minutes)
        $('#countdown-seconds').text(seconds)
    }, 1000)
}

const toggleMenu = () => {
    $('.modal-container').toggleClass('open').attr('aria-hidden', !$('.modal-container').hasClass('open'))
    $('.header-container, .header .btn-icon#nav-menu').toggleClass('active')
}

$(document).ready(function(){
    init_countdown()
    init_menu()

    $('button.btn-menuitem').on('click', function(){
        $('html, body').animate({
            scrollTop: $("section#"+$(this).attr('id')).offset().top - $('.header-container').height()
        }, 100);
    })

    $(window).on("load", function(){
        $('html').show()
    })

    $(window).on("load resize", function (){
        $('.landing-container#hero, div.page').css({'padding-top' : $('.header-container').height()})
        $('.modal-container').css({'top' : $('.header-container').height()})

        $('.btn-icon#nav-menu:hidden, .header-nav .main-nav:hidden').attr('aria-hidden', true)
        $('.btn-icon#nav-menu:visible, .header-nav .main-nav:visible').attr('aria-hidden', false)

        if ($(window).width() > 713){
            if($('.modal-container').hasClass('open')) toggleMenu()
        }
    })

    $(window).on("load resize scroll", function () {
        // header onscroll
        if (document.body.scrollTop > 45 || document.documentElement.scrollTop > 45){
            $(".header-container").addClass('drop')
            $(".header-container.home").css({"background-color": "#182939"})
        }
        else{
            if(!$('.modal-container').hasClass('open')){
                $(".header-container").removeClass('drop')
            }

            $(".header-container.home").css({"background-color": "transparent"})
            // sessionStorage.scrollPos = $(window).scrollTop()
        }
    })
})