$(function(){
    var $Form = $("#formlogin");
    if($Form.length){
        $Form.validate({
            rules:{
                username:{
                    required: true
                
                },
                password:{
                    required:true
                    
                }
            },
            messages:{
                username:{
                    required:'กรุณาป้อนชื่อผู้ใช้งาน'
                    
                    
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน'
                    
                }
            },
            errorPlacement: function(error, element) 
      {
        
        
            error.insertAfter( element );
        
        
       }
        })
    }
    
})