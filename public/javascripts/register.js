$(function(){
    var $Form = $("#formregister");
    if($Form.length){
        $Form.validate({
            rules:{
                username:{
                    required: true,
                    minlength:3,
                    maxlength:12,
                    // remote:{
                    //     url:"mock_checkexist.php"
                    // }
                },
                password:{
                    required:true,
                    minlength:4,
                    maxlength:10

                },
                repassword:{
                    required:true,
                    equalTo:'#inputPassword3'
                },
                email:{
                    required:true,
                    email:true
                },
                tel:{
                    required: true,
                    minlength: 10,
                    maxlength: 10,
                    
                }
            },
            messages:{
                username:{
                    required:'กรุณาป้อนชื่อผู้ใช้งาน',
                    minlength:'ต้องมีอย่างน้อย 3 ตัวอักษร',
                    maxlength:'ต้องมีอย่างมากไม่เกิน 12 ตัวอักษร',
                    remote:'ชื่อนี้มีผู้ใช้งานแล้ว'
                },
                password:{
                    required:'กรุณาป้อนรหัสผ่าน',
                    minlength:'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร',
                    maxlength:'รหัสผ่านต้องมีอย่างมากไม่เกิน 10 ตัวอักษร'
                },
                repassword:{
                    required:'กรุณาป้อนรหัสผ่านอีกครั้ง',
                    equalTo:'รหัสผ่านไม่เหมือนกัน'
                },
                email:{
                    required:'กรุณาป้อนอีเมลล์',
                    email:'อีเมลล์ไม่ถูกต้อง'
                },
                tel:{
                    required:'กรุณาป้อนเบอร์โทร',
                    minlength:'เบอร์โทรต้องมี 10 ตัว',
                    maxlength:'เบอร์โทรต้องมี 10 ตัว',
                }
            }
        })
    }
    
})





















// const form = document.getElementById('form');
// const username = document.getElementById('inputUsername3');
// const password = document.getElementById('inputPassword3');
// const confirmpassword = document.getElementById('inputPasswordConfirm');
// const email = document.getElementById('inputEmail3');

// form.addEventListener('submit',function(e){
//     e.preventDefault();
//     // console.log("Submit")
//     if(username.value == ""){
//         console.log('None');
//         showerorr_message(username,"กรุณาป้อนชื่อผู้ใช้งาน");
//     }
//     else{
//         console.log("complete");
//         return_normal(username);
//     }

// });





// function showerorr_message(input,message){
//     const control = input.parentElement;
//     control.className = 'message erorr';
//     const small = control.querySelector('small');
//     small.innerText = message;
    
// }

// function return_normal(input){
//     const control = input.parentElement;
//     control.className = 'message';
// }




