$(document).ready(function(){
    $("#name").focus();
    $("#name").keyup(function(e){
        if(e.keyCode == 13){
            $("#birthday").focus();
        }
    })
    $("#birthday").keyup(function(e){
        if(e.keyCode == 13){
            $("#sex").focus();
        }
    })
    $("#email").keyup(function(e){
        if(e.keyCode == 13){
            $("#username").focus();
        }
    })
    $("#username").keyup(function(e){
        if(e.keyCode == 13){
            $("#password").focus();
        }
    })
    $("#password").keyup(function(e){
        if(e.keyCode == 13){
            $("#en_password").focus();
        }
    })
    $("#name").blur(function(){
        if($("#name").val() != ""){
            $("#er_name").html("");
            $("#name").val(chuanHoaTen($("#name").val()));
        }
        else{
            $("#er_name").html("Ban chua nhap ten");
        }
    })
    $("#birthday").blur(() => {
        if($("#birthday").val() == ""){
            $("#er_birthday").html("Ban chua nhap ngay sinh");
        }
        else{
            if(chuanHoaNgay($("#birthday").val())){
                $("#er_birthday").html("");
            }
            else{
                $("#er_birthday").html("Ngay sinh khong dung dinh dang");
            }
        }
    })
    $("#email").blur(() => {
        if($("#email").val() == ""){
            $("#er_email").html("Ban chua nhap email");
        }
        else{
            $("#er_email").html("");
        }
    })
    $("#username").blur(() => {
        if($("#username").val() == ""){
            $("#er_username").html("Ban chua nhap ten tai khoan");
        }
        else{
            $("#er_username").val("");
        }
    })
    $("#password").blur(() => {
        if($("#password").val() == ""){
            $("#er_password").html("Ban chua nhap mat khau");
        }
        else{
            $("#er_password").html("");
        }
    })
    $("#en_password").blur(() => {
        if($("#password").val() != "" && $("#en_password").val() != ""){
            if($("#password").val() != $("#en_password").val()){
                $("#er_en_password").html("Mat khau nhap lai khong dung");
            }
            else{
                $("#er_en_password").html("");
            }
        }
        if($("#en_password").val() == ""){
            $("#er_en_password").html("Ban chua nhap lai mat khau");
        }
        
    })
    $("#chap_nhan").click(() => {
        let oki = true;
        $("#er_name").html("");
        $("#er_birthday").html("");
        $("#er_email").html("");
        $("#er_username").html("");
        $("#er_password").html("");
        $("#er_en_password").html("");
        if($("#name").val() == ""){
            oki = false;
            $("#er_name").html("Ban chua nhap ten");
        }
        if($("#birthday").val() == ""){
            oki = false;
            $("#er_birthday").html("Ban chua nhap ngay sinh");
        }
        if($("#email").val() == ""){
            oki = false;
            $("#er_email").html("Ban chua nhap email");
        }
        if($("#username").val() == ""){
            oki = false;
            $("#er_username").html("Ban chua nhap ten tai khoan");
        }
        if($("#password").val() == ""){
            oki = false;
            $("#er_password").html("Ban chua nhap mat khau");
        }
        if($("#en_password").val() == ""){
            oki = false;
            $("#er_en_password").html("Ban chua nhap lai mat khau");
        }
        if($("#birthday").val() != ""){
            if(chuanHoaNgay($("#birthday").val())){
                $("#er_birthday").html("");
            }
            else{
                oki = false;
                $("#er_birthday").html("Ngay sinh khong dung dinh dang");
            }
        }
        if($("#en_password").val() != ""){
            if($("#password").val() != $("#en_password").val()){
                oki = false;
                $("#er_en_password").html("Mat khau nhap lai khong dung");
            }
            else{
                $("#er_en_password").html("");
            }
        }
        if(oki){
            $("#form1").submit();
        }
    })
})

function chuanHoaTen(s){
    var ss = s.split(" ");
    var str = "";
    for(var i=0; i<ss.length; i++){
        if(ss[i].length > 0){
            if(str.length > 0){
                str += " ";
            }
            str += ss[i].substring(0,1).toUpperCase();
            str += ss[i].substring(1).toLowerCase();
        }
        
    }
    return str;
}

function chuanHoaNgay(ss){
    var s = ss.split("/");
    if(s.length != 3) return false;
    if(isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2])) return false;
    var day = s[0];
    var month = s[1];
    var year = s[2];
    if(month < 1 || month > 12) return false;
    if(month == 2){
        if(year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)){
            if(day < 1 || day > 29) return false;
        }
        else if(day < 1 || day > 28) return false;
    }
    if(month == 4 || month == 6 || month == 9 || month == 11){
        if(day < 1 || day > 30) return false;
    }
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        if(day < 1 || day > 31) return false;
    }
    var date = new Date();
    if (year > date.getFullYear() || year < 1950) return false;
    return true;
}