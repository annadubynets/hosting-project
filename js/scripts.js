if ($('.tabbed-content').length > 0) {
    tabControl();

    var resizeTimer;
    $(window).on('resize', function(e) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            tabControl();
        }, 250);
    });

    function tabControl() {
        var tabs = $('.tabbed-content').find('.tabs');
        if (tabs.is(':visible')) {
            tabs.find('a').on('click', function(event) {
                event.preventDefault();
                var target = $(this).attr('href'),
                    tabs = $(this).parents('.tabs'),
                    buttons = tabs.find('a'),
                    item = tabs.parents('.tabbed-content').find('.item');
                buttons.removeClass('active');
                item.removeClass('active');
                $(this).addClass('active');
                $(target).addClass('active');
            });
        } else {
            $('.item').on('click', function() {
                var container = $(this).parents('.tabbed-content'),
                    currId = $(this).attr('id'),
                    items = container.find('.item');
                container.find('.tabs a').removeClass('active');
                items.removeClass('active');
                $(this).addClass('active');
                container.find('.tabs a[href$="#' + currId + '"]').addClass('active');
            });
        }
    }
}

let el = $('.switch');
let cur = el.find('.current');
let options = el.find('.options li');
let content = $('#content');

// Open language dropdown panel

el.on('click', function(e) {
    el.addClass('show-options');

    setTimeout(function() {
        el.addClass('anim-options');
    }, 50);

    setTimeout(function() {
        el.addClass('show-shadow');
    }, 200);
});


// Close language dropdown panel

options.on('click', function(e) {
    e.stopPropagation();
    el.removeClass('anim-options');
    el.removeClass('show-shadow');

    let newLang = $(this).data('lang');

    cur.find('span').text(newLang);
    content.attr('class', newLang);

    setLang(newLang);

    options.removeClass('selected');
    $(this).addClass('selected');

    setTimeout(function() {
        el.removeClass('show-options');
    }, 600);
});


// Save selected options into Local Storage

function getLang() {
    let lang;
    if (localStorage.getItem('currentLang') === null) {
        lang = cur.find('span').text();
    } else {
        lang = JSON.parse(localStorage.getItem('currentLang')).toLowerCase();
    }

    // console.log(lang);

    cur.find('span').text(lang);
    options.parent().find(`li[data-lang="${lang}"]`).addClass('selected');

    content.attr('class', lang);
}

getLang();

function setLang(newLang) {
    localStorage.setItem('currentLang', JSON.stringify(newLang).toLowerCase());

    content.attr('class', newLang);
}