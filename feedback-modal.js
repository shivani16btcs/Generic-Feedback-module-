//------------------------------Feedback modal --------------------------
var email=''
var app=''
window.onload = function() {
    appName = 'Dispatch';
    userEmail = 'ayush.omer@daffodilsw.com';
}
var feedbackPopUp=true;
if (!feedbackPopUp) {
    document.getElementById('feeback-modal').style.display = "none"
} 

function modalClose(){
    this.feedbackPopUp=false;
    document.getElementById("myDIV").style.display = "none";
}

function giveFeedback(){
    console.log("sljhfd")
    let url='http://127.0.0.1:5500/feedback.html'
    let Url=url+'?email='+email+'&app='+appName;
    alert(Url);
    window.open(Url, "_blank");
}
