var hostUri = window.location.href;
var api = {};
var user = {};
var defaults = {'username': 'Administrator', 'password': 'password'}
$(function() {
    console.log( "ready!" );
    checkUriForAPI(hostUri);
    
    
    $('.form-location').submit(function( event ) {
        event.preventDefault();
        var newUri = $('.form-location #inputAddress').val();
        checkUriForAPI(newUri);
        $('.container.location').hide();
        $('.container.loading').fadeIn();
    });
    
    $('.form-signin').submit(function( event ) {
        event.preventDefault();
        var username = $('.form-signin #inputUsername').val();
        var password = $('.form-signin #inputPassword').val();
        console.log(username+' - '+password);
        $.ajax({
            method: "POST",
            url: hostUri+api.Authentication.replace(/^.*\/\/[^\/]+/, ''),
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
        }).error(function(error) {
            console.log(error);
        }).done(function( response ) {
            console.log('login posted');
            console.log(response);
        });
    });
    
    
    $('.form-setup-1').submit(function(event) {
        event.preventDefault();
        if(user.hasOwnProperty('resource')){
            $.ajax({
                method: "PATCH",
                url: hostUri+user.resource.replace(/^.*\/\/[^\/]+/, ''),
            }).error(function(error) {
                console.log(error);
            }).done(function( response ) {
                console.log(response);
            });
        }
    });
    
    
    
});

function checkUriForAPI(uri) {
    $.ajax({
        url: uri+'/api',
        dataType: "json",
        timeout: 1000
    }).error(function(error) {
        switch(error.status) {
            case 0:
                console.log('timeout');
                break;
            case 404:
                console.log('not found');
                break;
            default:
                console.log('unknown error, code: '+error.status+' given');
                break;
        }
        $('.container.loading').hide();
        $('#inputAddress').val($.cookie("hostUri"));
        $('.container.location').fadeIn("slow");
    }).done(function(response) {
        api = response;
        hostUri = uri;
        $.cookie("hostUri", hostUri);
        checkInitialInstall();
    });
}

function checkInitialInstall() {
    if(api.hasOwnProperty('Authentication')){
        console.log("yes, i have an authentication route");
        // try default login
        $.ajax({
            method: "POST",
            dataType: "json",
            url: hostUri+api.Authentication.replace(/^.*\/\/[^\/]+/, ''),
            headers: {
                "Authorization": "Basic " + btoa(defaults.username + ":" + defaults.password),
                "Accept": "application/prs.bastet.Session+json; version=1"
            },
        }).error(function(error) {
            switch(error.status) {
                case 0:
                    console.log('timeout');
                    break;
                case 401:
                    $('.container.loading').hide();
                    $('.container.login').fadeIn("slow");
                    break;
                case 404:
                    console.log('not found');
                    break;
                default:
                    console.log('unknown error, code: '+error.status+' given');
                    break;
            }
        }).success(function(response) {
            console.log(response);
            for (var property in response) {
                if (object.hasOwnProperty(property)) {
                    console.log('has property: '+property);
                }
            }
            if(response.hasOwnProperty('SessionKey')) {
                $.cookie("Bastet_Session_Key", response.SessionKey);
            }
            console.log('default auth working, proceeding to setup...');
            $('.container.loading').hide();
            $('.container.setup').fadeIn("slow");
        });
    } else {
        alert("invalid api");
    }
}
