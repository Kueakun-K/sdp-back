$.validator.addMethod("noSpace",function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "ห้ามใช้ช่องว่าง"
);
$.validator.addMethod(
    "regex",
    function(value, element, regexp) 
    {
        console.log(value, regexp, regexp.test(value))
        if (regexp.constructor != RegExp)
            regexp = new RegExp(regexp);
        else if (regexp.global)
            regexp.lastIndex = 0;
        return regexp.test(value);
    },
    "Please check your input."
);
$(function(){
    var $Form = $("#formforgot");
    if($Form.length){
        $Form.validate({
            rules:{
                email:{
                    required:true,
                    email:true,
                    noSpace:true,
                    regex: /^[A-Za-z0-9_]+\@[A-Za-z0-9_]+\.[A-Za-z0-9_]+/,
                    
                }
            },
            messages:{
                email:{
                    required:'กรุณาป้อนอีเมลล์',
                    email:'อีเมลล์ไม่ถูกต้อง',
                    regex:'อีเมลล์ไม่ถูกต้อง'
                }
            }
        })
    }
    
})