$.validator.addMethod("noSpace",function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "ห้ามใช้ช่องว่าง"
);
$(function(){
    var $Form = $("#formlogin");
    if($Form.length){
        $Form.validate({
            rules:{
                username:{
                    required: true,
                    noSpace:true
                
                },
                password:{
                    required:true,
                    noSpace:true
                    
                }
            },
            messages:{
                username:{
                    required:'กรุณาป้อนชื่อผู้ใช้งาน'
                    
                    
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน'
                    
                }
            }
        })
    }
    
})