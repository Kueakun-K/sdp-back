window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    // console.log(document.body.scrollTop)
    console.log(document.documentElement.scrollTop)
  }
//   document.body.scrollTop
//   document.documentElement.scrollTop

//-------------------------------------------------------------------------//
<input type="hidden" value="<%= scroll %>" id="scroll">
    <form action="/api/save" method="post" id="test">
        <input type="hidden" value="<%= user._id %>" name="user_id">
        <input type="hidden" value="<%= book._id %>" name="book_id">
        <input type="hidden" value="0" id="scrollsave" name="scrollsave">
        <button type="button" id="testbtn">test</button>
    </form>

//-------------------------------------------------------------------------//

    <script>
        // var scroll = document.getElementById('scroll')
        document.documentElement.scrollTop = document.getElementById('scroll').value
        // window.onscroll = function () {
        //     scrollFunction();
        // };
        // function scrollFunction() {
        // // console.log(document.body.scrollTop)
        // console.log(document.documentElement.scrollTop)
        // }
        var testbtn = document.getElementById("testbtn")
        var scrollsave = document.getElementById("scrollsave")
        testbtn.addEventListener("click", save)

        function save(){ 
            console.log(document.documentElement.scrollTop)
            scrollsave.value = document.documentElement.scrollTop
            console.log(document.getElementById('scrollsave').value)
            document.getElementById('test').submit()
        }

    </script>

 //-------------------------------------------------------------------------//