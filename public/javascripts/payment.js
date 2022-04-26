
$.validator.addMethod("noSpace",function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "ห้ามใช้ช่องว่าง"
);

$.validator.addMethod("ext",function(value, element, param) {
    // console.log(value)
    // console.log(element.files[0].type)
    const image = ['image/jpeg', 'image/jpg', 'image/png']
    // for(var i =0;i<length;i++){
        if(!image.includes(element.files[0].type)){
            console.log(element.files[0].type)
            console.log(image.includes(element.files[0].type))
            return false
        }
    // }
    return true
},
"เลือกไฟล์ png , jpg หรือ jpeg เท่านั้น"
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
    var $Form = $("#formpayment");
    if($Form.length){
        $Form.validate({
            rules:{
                date:{
                    required: true,
                },
                hour:{
                    required: true,
                    min:0,
                    // noSpace:true
                },
                minute:{
                    required:true,
                    min:0,
                },
                money:{
                    required:true,
                    min:0,
                    noSpace:true,
                    regex: /[0-9]$/,
                },
                "img":{
                    required:true,
                    ext: "jpg|jpeg|png"
                }
            },
            messages:{
                date:{
                    required:'กรุณาเลือกวันที่'             
                },
                hour:{
                    min:'กรุณาเลือกเวลา'               
                },
                minute:{
                    min:'กรุณาเลือกเวลา' 
                },
                money:{
                    required:'กรุณากรอกจำนวนเงิน',
                    regex: 'กรุณากรอกตัวเลข',
                    min:'กรุณากรอกจำนวนเงินที่ถูกต้อง' 
                },
                "img":{
                    required:'กรุณาเลือกรูป'
                    
                }
            }
            
        })
    }
    
})