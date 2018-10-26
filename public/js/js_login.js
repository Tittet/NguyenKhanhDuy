$(document).ready(() => {
    $('#username').focus();
    $('#username').keyup( e => {
        if(e.keyCode == 13){
            $('#password').focus();
        }
    })
    $('#password').keyup( e => {
        if(e.keyCode == 13){
            $('#form-login').submit();
        }
    })
    $('#chap_nhan').click(() => {
        $('#form-login').submit();
    })
})