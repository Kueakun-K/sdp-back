
$.validator.addMethod("noSpace",function(value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "ห้ามใช้ช่องว่าง"
);

$.validator.addMethod("ext",function(value, element, param) {
    var length = ( element.files.length )
    const image = ['image/jpeg', 'image/jpg', 'image/png']
    for(var i =0;i<length;i++){
        if(!image.includes(element.files[i].type)){
            console.log(element.files[i].type)
            console.log(image.includes(element.files[i]))
            return false
        }
    }
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
    var $Form = $("#formaddbook");
    if($Form.length){
        $Form.validate({
            rules:{
                book_name:{
                    required: true,
                    noSpace:true
                },
                book_description:{
                    required:true
                    
                },
                book_price:{
                    required:true,
                    noSpace:true,
                    regex: /[0-9]$/
                },
                "multiimg[]":{
                    required:true,
                    ext: "jpg|jpeg|png"
                }
            },
            messages:{
                book_name:{
                    required:'กรุณากรอกชื่อหนังสือ'               
                },
                book_description:{
                    required:'กรุณากรอกคำอธิบาย'
                },
                book_price:{
                    required:'กรุณากรอกราคา',
                    regex: 'กรุณากรอกตัวเลข'
                },
                "multiimg[]":{
                    required:'กรุณาเลือกรูป'
                    
                }
            }
            
        })
    }
    
})