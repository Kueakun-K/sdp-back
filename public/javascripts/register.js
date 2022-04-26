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
    var $Form = $("#formregister");
    if($Form.length){
        $Form.validate({
            rules:{
                username:{
                    required: true,
                    minlength:3,
                    maxlength:10,
                    regex: /^[A-Za-z_]{3,10}$/,
                    noSpace:true
                },
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
                email:{
                    required:true,
                    email:true,
                    noSpace:true,
                    regex: /^[A-Za-z0-9_]+\@[A-Za-z0-9_]+\.[A-Za-z0-9_]+/,
                    
                }
            },
            messages:{
                username:{
                    required:'กรุณาป้อนชื่อผู้ใช้งาน',
                    minlength:'ต้องมีอย่างน้อย 3 ตัวอักษร',
                    maxlength:'ต้องมีอย่างมากไม่เกิน 10 ตัวอักษร',
                    regex:'ชื่อผู้ใช้ต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษพิมเล็กหรือพิมใหญ่ เท่านั้น'
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ ((!@#$%^&*_))'
                    
                },
                repassword:{
                    required:'กรุณาป้อนรหัสผ่านอีกครั้ง',
                    equalTo:'รหัสผ่านไม่เหมือนกัน'
                },
                email:{
                    required:'กรุณาป้อนอีเมลล์',
                    email:'อีเมลล์ไม่ถูกต้อง',
                    regex:'อีเมลล์ไม่ถูกต้อง'
                }
            }
        })
    }
    
})