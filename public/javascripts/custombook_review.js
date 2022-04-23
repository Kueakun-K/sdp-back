const star_button1 = document.getElementById('star_button1')
const star_button2 = document.getElementById('star_button2')
const star_button3 = document.getElementById('star_button3')
const star_button4 = document.getElementById('star_button4')
const star_button5 = document.getElementById('star_button5')
const submit_review = document.getElementById('submit_review')
const review_text = document.getElementById('review_text')
var toggle_bool1 = false
var toggle_bool2 = false
var toggle_bool3 = false
var toggle_bool4 = false
var toggle_bool5 = false
var ratings = 0
var result


star_button1.addEventListener('click',function(){

    if(!toggle_bool1){
        ratings = 1
        toggle_bool1 = true
        toggle_bool2 = false
        toggle_bool3 = false
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button1.style.color = "orange"
        star_button2.style.color = "black"
        star_button3.style.color = "black"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool1,toggle_bool2,toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
    else{
        ratings = 0
        toggle_bool1 = false
        toggle_bool2 = false
        toggle_bool3 = false
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button1.style.color = "black"
        star_button2.style.color = "black"
        star_button3.style.color = "black"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool1,toggle_bool2,toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
})
star_button2.addEventListener('click',function(){

    if(!toggle_bool2 && toggle_bool1 === true){
        ratings = 2
        toggle_bool2 = true
        toggle_bool3 = false
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button2.style.color = "orange"
        star_button3.style.color = "black"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool2,toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
    else if(toggle_bool1 === true){
        ratings = 1
        toggle_bool2 = false
        toggle_bool3 = false
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button2.style.color = "black"
        star_button3.style.color = "black"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool2,toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
})
star_button3.addEventListener('click',function(){

    if(!toggle_bool3 && toggle_bool2 === true ){
        ratings = 3
        toggle_bool3 = true
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button3.style.color = "orange"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
    else if(toggle_bool2 === true){
        ratings = 2
        toggle_bool3 = false
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button3.style.color = "black"
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool3,toggle_bool4,toggle_bool5,ratings
    }
})
star_button4.addEventListener('click',function(){

    if(!toggle_bool4 && toggle_bool3 === true ){
        ratings = 4
        toggle_bool4 = true
        toggle_bool5 = false
        getrating(ratings)
        star_button4.style.color = "orange"
        star_button5.style.color = "black"
        return toggle_bool4,toggle_bool5,ratings
    }
    else if(toggle_bool3 === true){
        ratings = 3
        toggle_bool4 = false
        toggle_bool5 = false
        getrating(ratings)
        star_button4.style.color = "black"
        star_button5.style.color = "black"
        return toggle_bool4,toggle_bool5,ratings
    }
})
star_button5.addEventListener('click',function(){

    if(!toggle_bool5 && toggle_bool4 === true ){
        ratings = 5
        toggle_bool5 = true
        getrating(ratings)
        star_button5.style.color = "orange"
        return toggle_bool5,ratings
    }
    else if(toggle_bool3 === true){
        ratings = 4
        toggle_bool5 = false
        getrating(ratings)
        star_button5.style.color = "black"
        return toggle_bool5,ratings
    }
})

submit_review.addEventListener('click',function(){
    console.log(review_text.value)
    console.log(ratings)
})



function getrating(event){
    ratings = event
    console.log(ratings)
 }