//------------------------------Feedback modal --------------------------

var feedbackPopUp=true;
if (!feedbackPopUp) {
    document.getElementById('feeback-modal').style.display = "none"
} 

function modalClose(){
    this.feedbackPopUp=false;
    document.getElementById("myDIV").style.display = "none";
}

