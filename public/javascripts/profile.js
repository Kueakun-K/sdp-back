$.validator.addMethod("notEqual", function(value, element, param) {
    return this.optional(element) || value != $(param).val();
   }, "This has to be different...");
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
    var $Form1 = $("#editusername");
    if($Form1.length){
        $Form1.validate({
            rules:{
                newusername:{
                    required: true,
                    minlength:3,
                    maxlength:10,
                    regex: /^[A-Za-z_]{3,10}$/,
                    notEqual: "#user_name",
                    noSpace:true
                },
                password:{
                    required:true,
                    // minlength:7,
                    // maxlength:20,
                    // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{7,20}$/,
                    noSpace:true
                }
            },
            messages:{
                newusername:{
                    required:'กรุณาป้อนชื่อผู้ใช้งาน',
                    minlength:'ต้องมีอย่างน้อย 3 ตัวอักษร',
                    maxlength:'ต้องมีอย่างมากไม่เกิน 10 ตัวอักษร',
                    regex:'ชื่อผู้ใช้ต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษพิมเล็กหรือพิมใหญ่ เท่านั้น',
                    notEqual:'ชื่อผู้ใช้ซ้ำ'
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    // minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    // maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    // regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ'   
                }
            }
        })
    }

    var $Form2 = $("#editpassword");
    if($Form2.length){
        $Form2.validate({
            rules:{
                newpassword:{
                    required:true,
                    minlength:7,
                    maxlength:20,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{7,20}$/,
                    noSpace:true
                },
                confirmnewpassword:{
                    required:true,
                    equalTo:'#newpassword',
                    noSpace:true
                },
                password:{
                    required:true,
                    // minlength:7,
                    // maxlength:20,
                    // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{7,20}$/,
                    noSpace:true
                }
            },
            messages:{
                newpassword:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ (!@#$%^&*_)'
                },
                confirmnewpassword:{
                    required:'กรุณาป้อนรหัสผ่านอีกครั้ง',
                    equalTo:'รหัสผ่านไม่เหมือนกัน'
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    // minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    // maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    // regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ'
                },
                
            }
        })
    }

    var $Form3 = $("#editemail");
    if($Form3.length){
        $Form3.validate({
            rules:{
                newemail:{
                    required:true,
                    email:true,
                    noSpace:true,
                    regex: /^[A-Za-z0-9_]+\@[A-Za-z0-9_]+\.[A-Za-z0-9_]+/,
                    notEqual: "#user_email"
                    
                },
                password:{
                    required:true,
                    // minlength:7,
                    // maxlength:20,
                    // regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{7,20}$/,
                    noSpace:true
                }
            },
            messages:{
                newemail:{
                    required:'กรุณาป้อนอีเมลล์',
                    email:'อีเมลล์ไม่ถูกต้อง',
                    regex:'อีเมลล์ไม่ถูกต้อง',
                    notEqual:'อีเมลล์ซ้ำ'
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    // minlength:'รหัสผ่านต้องมีอย่างน้อย 7 ตัวอักษร',
                    // maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 20 ตัวอักษร',
                    // regex:'รหัสผ่านต้องประกอบไปด้วย ตัวเลข, ตัวอักษรภาษาอังกฤษพิมเล็ก และพิมใหญ่, อักขระพิเศษ'
                }
            }
        })
    }
})