var documentHTML = document;
var clientsCounter = documentHTML.getElementById("clients-counter");
var likesCounter = documentHTML.getElementById("likes-counter");
var projectCounter = documentHTML.getElementById("project-counter");
var awardCounter = documentHTML.getElementById("award-counter");
var lookUpBTN = documentHTML.getElementById("lookUpBtn");
var SkillsC = documentHTML.getElementById("skills");

var strokColor =documentHTML.querySelectorAll('.strokeColor');

var svgCircle = document.querySelectorAll(".foreground-circle svg circle");
var htmlNumberInsideCircle = document.getElementById("html-number-inside-circle");
var cssNumberInsideCircle = document.getElementById("css-number-inside-circle");
var sassNumberInsideCircle = document.getElementById("sass-number-inside-circle");
var bootNumberInsideCircle = document.getElementById("boot-number-inside-circle");
var jsNumberInsideCircle = document.getElementById("js-number-inside-circle");
var jqNumberInsideCircle = document.getElementById("jq-number-inside-circle");
var angNumberInsideCircle = document.getElementById("ang-number-inside-circle");

/******************************JQuery Part************************** */

$(function() {
  // Settings toggle behavior
  $(".settings__button").click(function () {
    //document.getElementById("settingContainer").style.display = document.getElementById("settingContainer").style.display === "block" ? "none" : "block";
    $("#settingContainer").toggleClass("d-none");
     $("#settingContainer").toggleClass("animate__slideInLeft");
  });


  // Settings Color behavior
  $('.color').click(function(){
    var color = $(this).data('value');
    // console.log(color);
    for(var i =0; i<strokColor.length; i++){
      strokColor[i].setAttribute('stroke',color);
    }
    $(".targetColor").css("color", color);
    $(".targetBgColor").css("background-color", color);
    document.documentElement.style.setProperty('--secondText__color',color);
  })

});

$(document).ready(function() {
   //Owl Carousel 2 Behaviors
  $('#blogCarousel').owlCarousel({
    loop:true,
    dots:false,
    margin:10,
    responsive:{
        0:{
            items:1
        },
        575:{
            items:2
        },
        767:{
            items:3
        }
    }
}) 

$('#priceCarousel').owlCarousel({
    loop:true,
    dots:false,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    responsive:{
      0:{
          items:1
      },
      575:{
          items:2
      },
      1024:{
          items:3
      }
  }
    
})
$('#clientCarousel').owlCarousel({
    loop:true,
    dots:false,
    margin:10,
    autoplay:true,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    responsive:{
      0:{
          items:1
      },
      767:{
          items:2
      },
  }
    
})
})
 

/*******************************Functions*************************** */

/* Start Counter*/
//start fire the function one section before
var counter = documentHTML.getElementById("counter");
var speed = 10;

function incEltNbr(element) {

  endNbr = +element.getAttribute('data-counter');
  //endNbr = +element.innerHTML;
  incNbrRec(0, endNbr, element);
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
  if (i <= endNbr) {
    elt.innerHTML = i;
    setTimeout(function () {
      //Delay a bit before calling the function again.
      incNbrRec(i + 1, endNbr, elt);
    }, speed);
  }
}

/* Change Navbar Color*/
function scrollFixNav(){
  if (scrollY > 400) {
    documentHTML.querySelector("nav").style.backgroundColor='#000'

 } else {
    //documentHTML.querySelector("nav").classList.remove("fixed-top");
    documentHTML.querySelector("nav").style.backgroundColor='transparent'
 }
}

/* Show LookUp Button */
function scrollShowLookUpBtn(){
  if (scrollY > 70) {
  lookUpBTN.classList.remove('d-none');
  lookUpBTN.classList.add('animate__fadeIn');

 } else {
  lookUpBTN.classList.add('d-none');
  lookUpBTN.classList.remove('animate__fadeIn');
 }
}

/* Get the Progress Bar Value */
function progressBarValue(value ,ele, svgCircle){
  // Get the stroke-dasharray value from CSS
var svgStrokeDashArray = parseInt(window
  .getComputedStyle(svgCircle)
  .getPropertyValue("stroke-dasharray")
  .replace("px", "")
);

  // To animte the circle from the previous value
var previousStrokeDashOffset = svgStrokeDashArray;

// To animate the number from the previous value
var previousValue = 0;
var animationDuration = 2000;
// Call this method and pass any value to start the animation
// The 'value' should be in between 0 to 100
var offsetValue = Math.floor(((100 - value) * svgStrokeDashArray) / 100);

  // This is to animate the circle
  svgCircle.animate(
    [
      // initial value
      {
        strokeDashoffset: previousStrokeDashOffset,
      },
      // final value
      {
        strokeDashoffset: offsetValue,
      },
    ],
    {
      duration: animationDuration,
    }
  );

  // Without this, circle gets filled 100% after the animation
  svgCircle.style.strokeDashoffset = offsetValue;

  // This is to animate the number.
  // If the current value and previous values are same,
  // no need to do anything. Check the condition.
  if (value != previousValue) {
    var speed;
    if (value > previousValue) {
      speed = animationDuration / (value - previousValue);
    } else {
      speed = animationDuration / (previousValue - value);
    }

    // start the animation from the previous value
    var counter = previousValue;

    var intervalId = setInterval(() => {
      if (counter == value || counter == -1) {
        // End of the animation

        clearInterval(intervalId);

        // Save the current values
        previousStrokeDashOffset = offsetValue;
        previousValue = value;
      } else {
        if (value > previousValue) {
          counter += 1;
        } else {
          counter -= 1;
        }

        ele.innerHTML = counter + "%";
      }
    }, speed);
  }

}


/* MixItUp Filter */
var containerEl = document.querySelector('.portfolio__container');
if (containerEl){
const mixer = mixitup('.portfolio__container',{
  animation: {
    duration: 400
}
});
}


/* Link active portfolio */ 
var numberButtons = document.querySelectorAll(".portfolio__item")
for (var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", changeButton.bind(null, i));
}

function changeButton(selected, e) {
  var oldActive = document.getElementsByClassName("active--portfolio");
  for (var i = 0; i < oldActive.length; i++) {
    oldActive[i].classList.remove("active--portfolio");
  }
  e.target.classList.add("active--portfolio");
}

/*******************************Event Listener*************************** */

window.addEventListener("scroll", function () {
  var place = document.body.scrollTop || document.documentElement.scrollTop;
  var alertOn = counter.offsetTop;
  if (place > alertOn) {
    //alert('Function execute here');
    /*Call this funtion with the ID-name for that element to increase the number within*/
    incEltNbr(clientsCounter);
    incEltNbr(projectCounter);
    incEltNbr(likesCounter);
    incEltNbr(awardCounter);
    this.removeEventListener("scroll", arguments.callee, false);
  }
});

window.addEventListener("scroll", function () {
  scrollFixNav();
});

window.addEventListener("scroll", function () {
  scrollShowLookUpBtn();
});

window.addEventListener("scroll", function () {
  var place = document.body.scrollTop || document.documentElement.scrollTop;
  var alertOn = SkillsC.offsetTop;
  if (place > alertOn) {
    for(var i =0; i<strokColor.length; i++){
      strokColor[i].setAttribute('stroke','#f44336');
    } 
    
    //progressBarValue(97,bootNumberInsideCircle,svgCircle[3]);
    //progressBarValue(+(htmlNumberInsideCircle.innerText.replace("%",' ')),htmlNumberInsideCircle,svgCircle[0]);
    progressBarValue(+(htmlNumberInsideCircle.getAttribute('data-value')),htmlNumberInsideCircle,svgCircle[0]);
    progressBarValue(+(cssNumberInsideCircle.getAttribute('data-value')),cssNumberInsideCircle,svgCircle[1]);
    progressBarValue(+(sassNumberInsideCircle.getAttribute('data-value')),sassNumberInsideCircle,svgCircle[2]);
    progressBarValue(+(bootNumberInsideCircle.getAttribute('data-value')),bootNumberInsideCircle,svgCircle[3]);
    progressBarValue(+(jsNumberInsideCircle.getAttribute('data-value')),jsNumberInsideCircle,svgCircle[4]);
    progressBarValue(+(jqNumberInsideCircle.getAttribute('data-value')),jqNumberInsideCircle,svgCircle[5]);
    progressBarValue(+(angNumberInsideCircle.getAttribute('data-value')),angNumberInsideCircle,svgCircle[6]);
   
    this.removeEventListener("scroll", arguments.callee, false);
  }
});

