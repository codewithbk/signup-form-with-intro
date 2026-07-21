// Firstly we check to no input will empty

const form = document.getElementById("form");
const fname = document.getElementById("firstname");
const lname = document.getElementById("lastname");
const email = document.getElementById("emailaddress");
const pass = document.getElementById("password");
const btn = document.getElementById("submitbtn");
const progress = document.querySelector("#password_S_progress");
let pass_visible = false;
let valid = [false, false, false, false, false, false, false, false];
let timer;

// blink border two notice error (!This is a part of show error function!)

function blink(inputboxid, blinktime, duration) {
    let error = false;
    let count = 0;
    let input = document.querySelector(inputboxid);

    const intervalId = setInterval(() => {

        if (error) {
            input.classList.remove("error_border");
            error = false;
        } else {
            input.classList.add("error_border");
            error = true;
        }

        count++;

        if (count === blinktime) {
            clearInterval(intervalId);
        }


    }, duration);

    input.classList.add("error_border");

}

//  These function use to visible all the error elements

function show_error(imgid, inputboxid, textid, error_message) {
    // Unblock the image and show the error
    let img = document.querySelector(imgid);
    img.classList.remove("block");
    // Unblock the text 
    let text = document.querySelector(textid);
    text.classList.remove("block");
    // Chnage input box border toward red
    blink(inputboxid, 6, 100);
    // Error meesgae for text
    document.querySelector(textid).textContent = error_message;

}

//  These function use to hide all the error elements

function hide_error(imgid, textid, inputboxid) {
    // block the image and show the error
    let img = document.querySelector(imgid);
    img.classList.add("block");
    // block the text 
    let text = document.querySelector(textid);
    text.classList.add("block");
    // Hide red error border from input box

}

// These function take input data and tell it empty or not

function isempty(data) {
    if (data.value.trim() === "") {
        return true;
    } else {
        return false;
    }
}

//  These function check length of input return true if max and false if small and in btw of min max data it will null

function minmax_checker(data, min, max) {
    const length = data.value.trim().length;
    if (length > max) {
        return true;      // Too long
    }
    if (length < min) {
        return false;     // Too short
    }
    return null;          // Valid
}

// Thes fuction check there is no number[0-9] in name

function isNumber(data) {

    if (/\d/.test(data.value)) {
        return true;

    } else {
        return false;
    }

}

// The function must ansure there will no gap btw string words

function nogap(data) {
    if (/\s/.test(data.value)) {
        return true;
    }
    return false;
}

// passowrd show and hide by these fuction (eyes)

function showpass() {
    if (pass_visible == false) {
        document.getElementById('password_protection').src = 'images/eye-svgrepo-com.svg';
        pass_visible = true;
        document.getElementById("password").type = "text";
    } else {
        document.getElementById('password_protection').src = 'images/eye-slash-svgrepo-com.svg';
        pass_visible = false;
        document.getElementById("password").type = "password";
    }
}

// The is our keyboard smash detector (May be incorect)
function inputValidator(data) {
    let input = data.value.toLowerCase();
    const keyboardRows = [
        "qwertyuiop",
        "asdfghjkl",
        "zxcvbnm"
    ];

    for (const row of keyboardRows) {
        if (row.includes(input)) {
            return true;
        }
    }



    return false;
}

// this function help is to check email is correct or not
function emailChecker(data) {
    const email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = data.value;
    if (email_check.test(email)) {
        return false;
    }
    return true;
}

// Function for progress bar 

function updateProgress(score){



    if(score === 0){
        progress.style.setProperty("--progress","0%");
        progress.style.setProperty("--gradient","#E8E6F7");
    }

    else if(score === 1){
        progress.style.setProperty("--progress","20%");
        progress.style.setProperty("--gradient","#6055A5");
    }

    else if(score === 2){
        progress.style.setProperty("--progress","40%");
        progress.style.setProperty(
            "--gradient",
            "linear-gradient(90deg,#6055A5,#7B7AE5)"
        );
    }

    else if(score === 3){
        progress.style.setProperty("--progress","60%");
        progress.style.setProperty(
            "--gradient",
            "linear-gradient(90deg,#6055A5,#7B7AE5,#58D39B)"
        );
    }

    else if(score === 4){
        progress.style.setProperty("--progress","80%");
        progress.style.setProperty(
            "--gradient",
            "linear-gradient(90deg,#6055A5,#7B7AE5,#58D39B,#46D191)"
        );
    }

    else{
        progress.style.setProperty("--progress","100%");
        progress.style.setProperty(
            "--gradient",
            "linear-gradient(90deg,#6055A5,#7B7AE5,#58D39B,#38CC8C)"
        );
    }

    if(score == 5){
        progress.classList.add("progress_complete");
    }

}

/* FIRST NAME VALLIDATION
    Length 20 max 3 min 
    isNumber 
    nogap
    nameValidator
*/

fname.addEventListener("input", (event) => {

    const result = minmax_checker(fname, 3, 20);


    valid[0] = false;

    // length check here
    if (result === true) {
        show_error('.fname_error_img', '#firstname', '.fname_error', "First name can't be greater than 20 char.");
        return;
    }
    if (result === false) {
        show_error('.fname_error_img', '#firstname', '.fname_error', "First name can't small than 3 char.");
        return;
    }

    // Not a number checker
    if (isNumber(fname)) {
        show_error('.fname_error_img', '#firstname', '.fname_error', "First name can't be a number");
        return;
    }

    // Check there is no gap in name
    if (nogap(fname)) {
        show_error('.fname_error_img', '#firstname', '.fname_error', "There are no gap allowed in name");
        return;
    }

    // Validateinput of fname
    if (inputValidator(fname)) {
        show_error('.fname_error_img', '#firstname', '.fname_error', "Name are incorrect... Try again");
        return;
    }

    hide_error('.fname_error_img', '.fname_error', '#firstname');
    valid[0] = true;
});


/* Second NAME VALLIDATION
    Length 20 max 3 min 
    isNumber 
    nogap
    nameValidator
*/

lname.addEventListener("input", (event) => {

    const result = minmax_checker(lname, 3, 15);

    valid[1] = false;

    // length check here
    if (result === true) {
        show_error('.lname_error_img', '#lastname', '.lname_error', "Last name can't be greater than 15 char.");
        return;
    }
    if (result === false) {
        show_error('.lname_error_img', '#lastname', '.lname_error', "Last name can't small than 3 char.");
        return;
    }
    // Not a number checker
    if (isNumber(lname)) {
        show_error('.lname_error_img', '#lastname', '.lname_error', "Last name can't be a number");
        return;
    }
    // Check there is no gap in fname
    if (nogap(lname)) {
        show_error('.lname_error_img', '#lastname', '.lname_error', "There are no gap allowed in name");
        return;
    }
    // Validateinput of lname
    if (inputValidator(lname)) {
        show_error('.lname_error_img', '#lastname', '.lname_error', 'Last Name are incorrect... Try agian');
        return;
    }

    hide_error('.lname_error_img', '.lname_error', '#firstname');
    valid[1] = true;
});

/* EMAIL VERIFICATION
    emailChecker
    + no gap
*/

email.addEventListener("input", (event) => {

    valid[2] = false;

    let isempty_c, emailCheck_c, nogap_c = false;


    if (isempty(email)) {
        show_error('.email_error_img', '#emailaddress', '.email_error', 'Please enter a valid email id');
        return;
    } else if (nogap(email)) {
        show_error('.email_error_img', '#emailaddress', '.email_error', 'Email ID not contain any gap');
        return;
    } else if (emailChecker(email)) {
        show_error('.email_error_img', '#emailaddress', '.email_error', 'Email ID is not correct');
        return;
    }

    hide_error('.email_error_img', '.email_error', '#emailaddress');
    valid[2] = true;
});

/* Password verification (MAIN) */

// Active my progress bar of pass and text

pass.addEventListener("focus", event => {
    document.getElementById('password_S_progress').style.visibility = "visible";
    let pass_req = document.querySelectorAll('#length, #uppercase, #number, #lowercase, #special');
    pass_req.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("on_pass_focus");
        }, (index + 1) * 200)
    })
});

// DeActive my progress bar of pass and text
pass.addEventListener("focusout", event => {
    if (isempty(pass)) {
        let progress_bars = document.getElementById('password_S_progress');
        progress_bars.style.visibility = "hidden";
        progress.style.setProperty("--progress","");
        progress.style.setProperty("--gradient","");
        progress.classList.remove("progress_complete");
        let pass_req = document.querySelectorAll('#length, #uppercase, #number, #lowercase, #special');
        pass_req.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove("on_pass_focus");
            }, (index + 1) * 200)
        })
        pass_req.forEach((item) => {
            item.classList.remove("on_pass_focus");
            item.classList.remove("on_pass_error");
            item.classList.remove("on_pass_fullfil");
        })
    }

});


pass.addEventListener("input", (event) => {

    

    valid[3] = false;

    //  For thr length
    const lengthOfPass = pass.value.length;

    if (lengthOfPass >= 2) {
        let pass_req = document.querySelectorAll('#length, #uppercase, #number, #lowercase, #special');
        pass_req.forEach((item) => {
            item.classList.remove("on_pass_focus");
            item.classList.add("on_pass_error");
        })
    }

    // Porgress bar
    let score = 0;

    // Input pass 
    const input_string = pass.value;

    // Pass data
    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 ";

    // For other selector
    let reqiuelength = false;
    let hasLower = false;
    let hasUpper = false;
    let hasNumber = false;
    let hasSymbol = false;


    // progressbar.style.setProperty("--progress", "20%");
    // progressbar.style.setProperty("--gradient", "#6055A5");


    if (lengthOfPass >= 8) {
        let lenght_li = document.querySelector('#length');
        lenght_li.classList.remove("on_pass_error")
        lenght_li.classList.add("on_pass_fullfil");
        score++;
    }
    if (lengthOfPass >= 1)  {
        hide_error('.password_error_img', '.pass_error', '#password');
    }

    for (let i = 0; i < lengthOfPass; i++) {
        if (input_string[i] >= "a" && input_string[i] <= "z") {
            hasLower = true;

        }
        if (input_string[i] >= "A" && input_string[i] <= "Z") {
            hasUpper = true;
        }
        if (input_string[i] >= "0" && input_string[i] <= "9") {
            hasNumber = true;
        }
        if (!normalChars.includes(input_string[i])) {
            hasSymbol = true;
        }

        // https://www.geeksforgeeks.org/dsa/program-check-strength-password/
    }

    if (hasLower) {
        let lowercase = document.querySelector('#lowercase');
        lowercase.classList.remove("on_pass_error")
        lowercase.classList.add("on_pass_fullfil");
        score++;
    } else{
        let lowercase = document.querySelector('#lowercase');
        lowercase.classList.add("on_pass_error");
        lowercase.classList.remove("on_pass_fullfil")
    }

    if (hasUpper) {
        let uppercase = document.querySelector('#uppercase');
        uppercase.classList.remove("on_pass_error")
        uppercase.classList.add("on_pass_fullfil");
        score++;
    } else {
         let uppercase = document.querySelector('#uppercase');
        uppercase.classList.add("on_pass_error")
        uppercase.classList.remove("on_pass_fullfil");
    }

    if (hasNumber) {
        let number = document.querySelector('#number');
        number.classList.remove("on_pass_error")
        number.classList.add("on_pass_fullfil");
        score++;
    } else {
         let number = document.querySelector('#number');
        number.classList.add("on_pass_error")
        number.classList.remove("on_pass_fullfil");
    }
    if (hasSymbol){
        let number = document.querySelector('#special');
        number.classList.remove("on_pass_error")
        number.classList.add("on_pass_fullfil");
        score++;
    } else {
        let number = document.querySelector('#special');
        number.classList.add("on_pass_error")
        number.classList.remove("on_pass_fullfil");
    }

    if(score >= 1){
        updateProgress(score);
    } 
    if(score == 5){
        valid[3] = true;
    }

})





form.addEventListener("submit", (event) => {

    event.preventDefault(); // Stop to submit the form


    valid[4,5,6,7] = false;        

    // first name empty check
    if (isempty(fname)) {
        show_error('.fname_error_img', '#firstname', '.fname_error', 'First name cannot be empty');
    } else {
        valid[4] = true;
    } 
    // Last name empty check 
    if (isempty(lname)) {
        show_error('.lname_error_img', '#lastname', '.lname_error', 'Last name cannot be empty');
    } else {
        valid[5] = true;
    }
    // Email empty check
    if (isempty(email)) {
        show_error('.email_error_img', '#emailaddress', '.email_error', 'Email ID cannot be empty');
    } else {
        valid[6] = true;
    }
    // Password can't be null
    if (isempty(pass)) {
        show_error('.password_error_img', '#password', '.pass_error', 'Password filed cannot be empty');
    } else {
        valid[7] = true;
    }

    // Check all input are not empty

    if (valid.includes(false)){
        alert('Please fill form first');
    } else {
        localStorage.setItem("fistname", "Your First Name:- " + fname.value);
        localStorage.setItem("Lastname", "Your Last Name:- " + lname.value);
        localStorage.setItem("Email Id", "Your Email Name:- " + email.value);
        localStorage.setItem("Password", "Your Password:- " + pass.value);             
                      alert("Your form will Submit Long Press 'Claim your free trial Button' to see")
       
    }
   

});


btn.addEventListener("mousedown", () => {

     timer = setTimeout(() => {
        
        let see_or_delet = prompt("Press Y to see data and N to delet data", "Y");
        if(see_or_delet.toLowerCase() == ('y')){
            alert(localStorage.getItem("fistname") + '\n' + localStorage.getItem("Lastname") + "\n" + localStorage.getItem("Email Id") + "\n" +  localStorage.getItem("Password"))
        } else if (see_or_delet.toLowerCase() == ('n')){
            localStorage.clear();
            alert('Your data been deleted');
        } else {
            alert('You enter a wrong input');
        }

    }, 2000);

});

btn.addEventListener("mouseup", () => {
    
    clearTimeout(timer);

});


