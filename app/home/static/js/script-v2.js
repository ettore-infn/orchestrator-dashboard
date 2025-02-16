/* ON PAGE LOAD */
$( document ).ready(() => {
    set_loading(false);

    add_loading_on_redirect();
    add_navbar_dropdown_toggle();
    add_navbar_mobile_toggle();
    add_role_dropdown_hover();
    add_service_info_details();
    add_cards_input_filter();
    add_max_length_counter();
    add_max_file_length();
});


/* 
*
*   TOGGLE NAVBAR DROPDOWNS 
*
*/

function add_navbar_dropdown_toggle() {
    let dropdowns = $('.navbar-left-dropdown')
    
    dropdowns.each((i, e) => {
        let dropdown = $(e.children[0]);
        let link = $(e.children[1]);
    
        dropdown.on('click', () => {
            let icon = $(dropdown[0].children[1].children[0])
            
            if(icon.css('transform').toString() == 'none') {
                open_popup_menu(e)
            } else {
                close_dropdown_menu(e)
            }
    
            dropdowns.each((i, e) => {
                let otherLink = $(e.children[1]);
                
                if(!link.is(otherLink)) {
                    close_dropdown_menu(e);
                }
            })
        })
    })
    
    function open_popup_menu(e) {
        let dropdown = $(e.children[0]);
        let link = $(e.children[1]);
        let icon = $(dropdown[0].children[1].children[0]);
    
        icon.css('transform', 'rotate(180deg)')
        link.slideDown();
    }
    
    function close_dropdown_menu(e) {
        let dropdown = $(e.children[0]);
        let link = $(e.children[1]);
        let icon = $(dropdown[0].children[1].children[0]);
    
        icon.css('transform', 'none')
        link.slideUp();
    }
}


/* 
*
*   TOGGLE ROLE SELECTION MENU ON HOVER
*
*/

function add_role_dropdown_hover() {
    $('.navbar-left-user-profile-role')
        .on( "mouseenter", () => {
            $('.navbar-left-user-profile-role-dropdown-menu-container').show()
            $('.navbar-left-user-profile-role > .navbar-left-dropdown-parent-icon > i').css('transform', 'rotate(180deg)')
        })
        .on( "mouseleave", () => {
            $('.navbar-left-user-profile-role-dropdown-menu-container').hide()
            $('.navbar-left-user-profile-role > .navbar-left-dropdown-parent-icon > i').css('transform', 'none')
        });
}


/* 
*
*   TOGGLE NAVBAR MENU ON MOBILE
*
*/

function add_navbar_mobile_toggle() {
    let nav_toggle_button = $('.navbar-left-header-mobile-toggle');
    
    nav_toggle_button.on('click', () => {
        let bars = $('.navbar-left-header-mobile-toggle > .fas.fa-bars');
        let times = $('.navbar-left-header-mobile-toggle > .fas.fa-times');
    
        if(times.css('display').toString() === 'none') {
            bars.hide();
            times.show();
    
            $('.navbar-left-dropdowns-container').show();
            $('.navbar-left-bottom').show();
            $('.navbar-left').css('height', '100%');
        } else {
            times.hide();
            bars.show();
            
            $('.navbar-left-dropdowns-container').hide();
            $('.navbar-left-bottom').hide();
            $('.navbar-left').css('height', 'auto');
        }
    })
}


/* 
*
*   SHOW SERVICE INFO DETAILS
*
*/

function add_service_info_details() {
    let cards = $('.dashboard-card');
    let close_buttons = $('.dashboard-card-info-close');
    let info_blurred_bg = $('.dashboard-card-info-container');
    
    cards.on('click', (e) => {
        if(!e.target.classList.contains('exclude-detail-opening')) {
            let id = e.currentTarget.id.split('_').pop();
            let elementName = e.currentTarget.id.split('_')[0];
    
            showCardInfo(id, true, elementName);
        }
    })
    
    close_buttons.on('click', (e) => {
        let id = e.currentTarget.id.split('_').pop();
        let elementName = e.currentTarget.id.split('_')[0];
        showCardInfo(id, false, elementName);
    });
    
    info_blurred_bg.on('click', (e) => {
        if(e.target.classList.contains('dashboard-card-info-container')) {
            let id = e.currentTarget.id.split('_').pop();
            let elementName = e.currentTarget.id.split('_')[0];
            showCardInfo(id, false, elementName);
        }    
    })
    
    function showCardInfo(id, show = true, elementName) {
        let info_detail = $('#' + elementName + '_Info_'+ id);
    
        if(show) {
            info_detail.fadeIn('fast', 'swing')
        } else {
            info_detail.fadeOut('fast', 'swing');
        }
    }
}


/* 
*
*   CARD FILTER
*
*/

function add_cards_input_filter() {
    let input = $('#inputCardFilter');
    let cards = $('.dashboard-card');
    
    input.on('keyup', () => {
        let fadeTime = 300;
        let val = input.val().toUpperCase();
    
        let centralised_count = 0;
        let on_demand_count = 0;
        
        for(let i = 0; i < cards.length; i++) {
            let card = $(cards[i]);
            let title = card.find('.dashboard-card-title').text().toUpperCase();
            let type = card.attr('id').split('_')[0];
    
            if(title.indexOf(val) == -1 && val !== "") {
                card.fadeOut(fadeTime);
            } else {
                card.fadeIn(fadeTime);
    
                if(type == 'dashboardCard') {
                    centralised_count++;
                } else {
                    on_demand_count++;
                }
            }
        }
    
        if($('#dashboardCardsNoResult_1').length > 0) {
            if(centralised_count == 0) {
                $('#dashboardCardsNoResult_1').fadeIn(fadeTime)
            } else {
                $('#dashboardCardsNoResult_1').fadeOut(fadeTime)
            }
        }
    
        if($('#dashboardCardsNoResult_2').length > 0) {
            if(on_demand_count == 0) {
                $('#dashboardCardsNoResult_2').fadeIn(fadeTime)
            } else {
                $('#dashboardCardsNoResult_2').fadeOut(fadeTime)
            }
        }
    })
}


/*
*
* -- LOADING --
*
*/

function add_loading_on_redirect() {
    $('a').click((e) => {
        let link_redirect = $(e.currentTarget).attr('href');

        if(link_redirect == null || link_redirect == undefined) {
            link_redirect = $(e.currentTarget).attr('data-target');
        }

        if(link_redirect == null || link_redirect == undefined) {
            link_redirect = '/';
        }

        // loading if not ID to a section
        if(link_redirect.charAt(0) != '#') {
            // remove loading for external link
            if(this.origin !== window.location.origin) {
                set_loading(false);
            } else {
                set_loading(true, 'You are being redirected to the requested page.<br>Wait on this page without reloading.');
            }
        } 
    });

    // remove loading when page loaded
    $(window).bind("pageshow", (event) => {
        set_loading(false)
    });
}
    
function set_loading(state = true, title = false) {
    let element = $('.dashboard-loading-container');
    let elementTitle = $('.dashboard-loading-title');

    if(typeof title == 'string') {
        if(title !== '') {
            elementTitle.html(title)
        }
    } else {
        elementTitle.html('Your request is being processed.<br>Wait on this page without reloading.')
    }

    if(state) {
        element.show();
    } else {
        element.hide();
    }
}


/*
*
*   -- ALERT --
*
*/

function alert_message(type = 'success', message = 'Success!', icon = '', time = 2000) {
    if(icon == '') {
        switch(type) {
            case 'success':
                icon = '<i class="far fa-check-circle"></i>';
            break;
            
            case 'danger':
                icon = '<i class="far fa-times-circle"></i>';
            break;
        }
    }

    $('#dashboard_alert_message > div').html(icon + message)
    $('#dashboard_alert_message > div').removeClass()
    $('#dashboard_alert_message > div').addClass('alert alert-'+ type)

    $('#dashboard_alert_message').animate({
        right: 40,
        opacity: 1
    });

    setTimeout(() => {
        $('#dashboard_alert_message').animate({
            right: -100,
            opacity: 0
        });
    }, time)
}


/* 
*
*   -- MAX LENGTH COUNTER --
*
*/

function add_max_length_counter() {
    let inputGroup = $("[maxlength]").parent()

    for(let i = 0; i < inputGroup.length; i++) {
        let label = $($(inputGroup[i]).children()[0]);
        let input = $($(inputGroup[i]).children()[1]);
        let maxlength = input.attr('maxlength');
        let chars = input.val().length;
        let text = label.text();
        
        label.text(text +' ('+ chars +'/'+ maxlength +')');

        input.on('keyup', () => {
            chars = input.val().length;
        
            label.text(text +' ('+ chars +'/'+ maxlength +')');
        })
    }
}


/* 
*
*   -- MAX SIZE --
*
*/

function add_max_file_length() {
    for(let i = 0; i < $('[maxsize]').length; i++) {
        $($('[maxsize')[i]).on('change', (e) => {
            if(e.currentTarget.files.length > 0) {
                if(e.currentTarget.files[0].size > $($('[maxsize')[i]).attr('maxsize')) {
                    $('[maxsize')[i].parentElement.lastElementChild.innerHTML = '';
                    $('[maxsize')[i].value = '';
                    alert_message('danger', 'The selected file exceeds the allowed size. Impossible to proceed.', '', 5000)
                }
            }
        })
    }
}