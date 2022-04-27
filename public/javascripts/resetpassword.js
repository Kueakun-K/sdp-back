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
    var $Form = $("#formreset");
    if($Form.length){
        $Form.validate({
            rules:{
                password:{
                    required:true,
                    minlength:7,
                    maxlength:20,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{7,20}$/,
                    noSpace:true
                },
                repassword:{
                    required:true,
                    equalTo:'#inputPassword3',
                    noSpace:true
                },
            },
            messages:{
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ ((!@#$%^&*_))'
                    
                },
                repassword:{
                    required:'กรุณาป้อนรหัสผ่านอีกครั้ง',
                    equalTo:'รหัสผ่านไม่เหมือนกัน'
                }
            }
        })
    }
    
})