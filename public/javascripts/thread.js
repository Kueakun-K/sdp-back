
$.validator.addMethod("noSpace",function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "ห้ามใช้ช่องว่าง"
);



$.validator.addMethod("regex",function(value, element, regexp) {
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
    var $Form = $("#formthread");
    if($Form.length){
        $Form.validate({
            rules:{
                section:{
                    required: true,
                    noSpace:true
                },
                content:{
                    required: true,
                    
                }
            },
            messages:{
                section:{
                    required:'กรุณากรอกหัวข้อ'             
                },
                content:{
                    required:'กรุณากรอกเนื้อหา'            
                }
            }
            
        })
    }
    
})