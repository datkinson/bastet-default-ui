var hostUri = window.location.href;
var api = {};
var defaults = {'username': 'Administrator', 'password': 'password'}
$(function() {
    console.log( "ready!" );
    checkUriForAPI(hostUri);
    
    
    $('.form-location').submit(function( event ) {
        event.preventDefault();
        var newUri = $('.form-location #inputAddress').val();
        checkUriForAPI(newUri);
        $('.container.location').fadeOut();
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
        $('.container.loading').fadeOut();
        $('#inputAddress').val('http://192.168.1.7:10000');
        $('.container.location').fadeIn("slow");
    }).done(function(response) {
        api = response;
        hostUri = uri;
        document.cookie="hostUri="+hostUri;
        checkInitialInstall();
    });
}

function checkInitialInstall() {
    if(Authentication in api){
        console.log("yes, i have an authentication route");
        $('.container.loading').fadeOut();
        $('.container.login').fadeIn("slow");
    } else {
        alert("invalid api");
    }
}
