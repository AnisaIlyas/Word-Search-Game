
/*Registration page*/
"use strict";/*strict mode identifies certain programming mistake*/
/*these lines recognize elements from html using class*/
const registrationForm = document.getElementById("registration");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone-number");
const passwordInput = document.getElementById("password");
const confirmpasswordInput = document.getElementById("confirmpassword");
const message = document.getElementById("message");

const STORAGE_KEY =  "wordsearchUsers"; /*key name in local storage*/
/*Here we wait for user to submit the form instead of registration page running 
immediately. this is called event driven programming*/
registrationForm.addEventListener("submit", function(event){
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const username = usernameInput.value.trim();  /*here white spaces are trimmed from beginning or end(not from center)*/
    const age = ageInput.value.trim();
    const address = addressInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmpassword = confirmpasswordInput.value;


    /*if email doesnot contain any special character show below message*/
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        message.textContent = "please enter a valid email address";
        return;
    }
    /*if username length is less than 3 show message*/
    if (username.length < 3){
        message.textContent = "please enter a valid username";
        return;
    }
    /*if password length is less than 8 show below message*/
    if (password.length < 8){
        message.textContent = "please enter a password having atleast 8 characters";
        return;
    }
    if (!/[A-Z]/.test(password)){
        message.textContent = "password must contain atleast one upper case letter";
        return;
    }
    if (!/[a-z]/.test(password)){
        message.textContent = "password must contain atleast one lower case letter";
        return;
    }
    if (!/[0-9]/.test(password)){
        message.textContent = "password must contain atleast one number";
        return;
    }
    if (!/[^AZa-z0-9]/.test(password)){
        message.textContent = "password must contain atleast one special character";
        return;
    }
    if (password !== confirmpassword){
        message.textContent = "Password do not match. Please! try again";
        return;
    }

    /*store user in array because there culd be multiple users*/
    let users = []
    try{
        const stored_users = localStorage.getItem(STORAGE_KEY); /*see the local storage to get user */
        users = stored_users? JSON.parse(stored_users): []; /*parse convert JSON string to javascript value and its used*/
        
        /*if stored data is not array show message*/
    if(!Array.isArray(users)){
        message.textContent  = "unable to read saved users data";
        return;
    }

    }catch(error){
        message.textContent = "unable to read saved users data";
        return;
    }
    /*if user is already registered then show that the user is registered*/
    const existinguser = users.find(
        user => user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === email
    );
    if (existinguser){
        message.textContent = "This user is already registered";
        return;
    }


    /*store users in this format in JSON in local storage*/
    const new_user = {
        id: crypto.randomUUID(),
        email: email,
        username: username,
        age: Number(age),
        address: address,
        phone: phone,
        password: password,
        createdAt: new Date().toISOString()
    };

    /*push new user in users*/
    users.push(new_user);
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users)); /*stringify convert javascript value into JSON to save*/
    }catch(error){
        message.textContent = "Unable to save your account, please try again later!";
        return;
    } /*display this message if everything is clear from above and user is stored*/
    message.textContent = "Account created successfully! You can Login now";
    registrationForm.reset();
    const hiddenLogInButton = document.getElementById("hidden-login-button");
    hiddenLogInButton.hidden = false;

    hiddenLogInButton.addEventListener("click", () =>{
        window.location.href = "login.html";
    });
    
    })



