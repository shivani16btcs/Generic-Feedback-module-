
//------------------------------Feedback form --------------------------
var forObj={
    Question:[
        {ques:'1', value:'',textValue:''},
        {ques:'2', value:'',textValue:''},
        {ques:'3', value:'',textValue:''},
    ],
    selectedRecommendation:'',
    comment:''
}
var rateText=['very Satisfied', 'Satisfied', 'Neutral','unsatisfied','very Unsatisfied'];
var isFeedbackFormValid=false;
var formSubmitted = false;
var appName;
var userEmail;
var dropDownOpen;
var prevSelectedID='';

window.onload = function() {
    let currentUrl = new URLSearchParams(window.location.search);
    appName = currentUrl.get('app')||'Dispatch';
    userEmail = currentUrl.get('email')||'ayush.omer@daffodilsw.com';
    setInitialValue();
 
};

function setInitialValue(){
    closeToaster('toastError');
    closeToaster('toastSuccess');
    document.getElementById('Recommendation-validation').style.visibility = "hidden";
    document.getElementById('RadioQues-validation').style.visibility = "hidden";
    document.getElementById('dropdownList').style.visibility = "hidden";
    document.getElementById("appName").innerHTML = "Chalo "+appName+" Feedback";
    document.getElementById("userEmail").innerHTML = userEmail;
    // document.getElementById("selectedRecommendation").value = '';

    formSubmitted = false;
    isFeedbackFormValid=false;
    dropDownOpen=false
}

function reInitialize(){
    setInitialValue();
    document.getElementById("selectid").value='';
    forObj={
    Question:[
        {ques:'1', value:'',textValue:''},
        {ques:'2', value:'',textValue:''},
        {ques:'3', value:'',textValue:''},
    ],
    selectedRecommendation:'',
    comment:''
    }
    document.getElementById("comment").value='';
    uncheckRadio("ques1");
    uncheckRadio("ques2");
    uncheckRadio("ques3");
}

function uncheckRadio(name){
    var ele = document.getElementsByName(name);
    for(var i=0;i<ele.length;i++){
       ele[i].checked = false;
    }
}

function setRadio(quesIndex,value){
    forObj.Question[quesIndex].value= value
    forObj.Question[quesIndex].textValue=rateText[value-1];
    checkValidation();
}

function submitFeedback(){
    formSubmitted=true;
    //recommendation
    forObj.selectedRecommendation =document.getElementById("selectid").value;

    //comment
    forObj.comment = document.getElementById("comment").value;
    checkValidation();
    console.log(forObj);
    if(isFeedbackFormValid){
        promiseAjax('/url');
    }
}

function promiseAjax(url){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true); 
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Response
        var response = this.responseText;
        launch_toast('toastSuccess');
    }else{
        launch_toast('toastError');

    }
    };
    let data=forObj;
    xhttp.send(JSON.stringify(data));
}

function launch_toast(id) {
    showToaster(id);
    setTimeout(function(){
       closeToaster(id);
       reInitialize();
    }, 3000);
}

function closeToaster(id){
    document.getElementById(id).style.visibility = "hidden"
}

function showToaster(id){
    document.getElementById(id).style.visibility = "visible"
}

function checkValidation(){
    if(!formSubmitted){
        return;
    }
    document.getElementById('RadioQues-validation').style.visibility = 
        (forObj.Question[0].value&&forObj.Question[1].value&&forObj.Question[2].value)?"hidden":"visible";
    document.getElementById('Recommendation-validation').style.visibility = (forObj.selectedRecommendation)?"hidden":"visible";
    if(!forObj.selectedRecommendation || !forObj.Question[0].value || !forObj.Question[1].value || !forObj.Question[2].value || !forObj.selectedRecommendation){
        isFeedbackFormValid = false;
    }else{
        isFeedbackFormValid = true;
    }
}

function rateDropdownOpen(){
    dropDownOpen= !dropDownOpen
    document.getElementById('dropdownList').style.visibility =  dropDownOpen?"visible":"hidden";
}


function selectRecommendation(value){
    document.getElementById("selectid").value=value;
    forObj.selectedRecommendation=value
    var selectedId= "rate"+value;
    if(document.getElementById(selectedId).value == value){
        let obj = document.getElementById(selectedId);
        obj.style.backgroundColor = "#f2f2f2";
        obj.style.color="#fe7c00";
    }
    if(!prevSelectedID){
        prevSelectedID=selectedId;
    }
    else if(prevSelectedID != selectedId){
        let obj1 = document.getElementById(prevSelectedID);
        obj1.style.backgroundColor = "transparent";
        obj1.style.color="black";
        prevSelectedID=selectedId;
    }
    rateDropdownOpen();
    checkValidation();
}