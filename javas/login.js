/*Login Page*/
//defing variables in js, recognizing from id of html
const login_form = document.getElementById("login-user")
const login_email_input = document.getElementById("login-email");
const login_password_input = document.getElementById("login-password");
const login_msg = document.getElementById("login-msg");

//define the localStorage key to used to store registered users
const L_STORAGE_KEY = "wordsearchUsers";


//add an event listener to detect when login form is submitted and prevent the page from refreshing
login_form.addEventListener("submit", function(event){
event.preventDefault();

//retrieve email remove extra space and convert into lowercase
const login_email = login_email_input.value.trim().toLowerCase();
const login_password = login_password_input.value; //retrieve password
 
//convert the stored JSON data into javascript arrayand if no user is there create empty string
const stored_users = localStorage.getItem(L_STORAGE_KEY);
const users = stored_users? JSON.parse(stored_users): [];

//search for registered user whose email matches the entered email
const existinguser = users.find(user =>
   (user.email || "").trim().toLowerCase() === login_email
);

//if no user like that is stored display this message
    if(!existinguser){
        login_msg.textContent = "User needs to register";
        const registerButton = document.getElementById("register-button");
        registerButton.hidden = false;
     
        //redirect the user to registration page when button is clicked
        registerButton.addEventListener("click", () =>{
            window.location.href="registration.html";
        });
        return;
    }
    //if password is not same as stored password display message
    if (existinguser.password !== login_password){
        login_msg.textContent = "Incorrect password. please try again.";
        return;
    }
    //if above all requirements fullfill display this message and redirect to game.html
login_msg.textContent = "User logged in successfully";
localStorage.setItem("loggedInUser", existinguser.email);
window.location.href = "game.html";
});