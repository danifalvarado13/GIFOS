$(function() {
    $(".toggle").on("click", function() {
        if ($(".item").hasClass("active")) {
            $(".item").removeClass("active");
            $(this).find("a").html("<img class='img_burger' src='/Style/assets/burger.svg' alt='menu'></img>");
        } else {
            $(".item").addClass("active");
            $(this).find("a").html("<img class='img_close' src='/Style/assets/close.svg' alt='close'></img>");
        }
    });
});

/*let toggle = document.querySelectorAll('.toggle');
toggle.classList.add('active');

let item = document.querySelectorAll('.item');

toggle.addEventListener('click',function(){
    if(item.classList("active")){
        item.removeClass("active")
        this.find("a").html()
    }
})*/