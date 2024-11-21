console.log("connected");
function validateForm() {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let emailError = false;
    let passwordError = false;
    let emailPara = "";
    let passwordPara = "";
    console.log("running");
    const emailInput = document.getElementById("input--email");
    const passwordInput = document.getElementById("input--password");
    emailInput.addEventListener("focus", () => {
        emailError = false;
        passwordError = false;
        emailPara = "";
        passwordPara = "";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
    });

    passwordInput.addEventListener("focus", () => {
        emailError = false;
        passwordError = false;
        emailPara = "";
        passwordPara = "";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
    });
    const email = document.getElementById("input--email").value;
    const password = document.getElementById("input--password").value;
    if (email === null || email === "") {
        emailPara = "Email can't be blank";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        emailError = true;
        return false;
    }
    if (!regex.test(password)) {
        passwordPara =
            "password should be of minimum length 8 and must include one lowercase, one uppercase, one special symbol and one numerical";
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        passwordError = true;
        return false;
    }
    if (!emailError && !passwordError) {
        return true;
    }
}

function doctorValidation() {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let emailError = false;
    let passwordError = false;
    let confirmationError = false;
    let emailPara = "";
    let passwordPara = "";
    console.log("running");
    const passwordInput = document.getElementById("input--password");
    const conformInput = document.getElementById("confirmPassword");

    passwordInput.addEventListener("focus", () => {
        emailError = false;
        passwordError = false;
        emailPara = "";
        passwordPara = "";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        document.getElementById("confirmPassError").innerHTML = "";
    });
    const password = document.getElementById("input--password").value;
    const confirmPass = conformInput.value;

    if (!regex.test(password)) {
        passwordPara =
            "password should be of minimum length 8 and must include one lowercase, one uppercase, one special symbol and one numerical";
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        passwordError = true;
        return false;
    }
    if (password !== confirmPass) {
        document.getElementById("confirmPassError").innerHTML =
            "password doesn't match confirm password";
        confirmationError = true;
        return false;
    }
    if (!emailError && !passwordError && !confirmationError) {
        return true;
    }
}

function hospitalValidation() {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let passwordError = false;
    let confirmationError = false;
    let passwordPara = "";
    const passwordInput = document.getElementById("input--password");
    const conformInput = document.getElementById("confirmPassword");
    passwordInput.addEventListener("focus", () => {
        passwordError = false;
        passwordPara = "";
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        document.getElementById("confirmPassError").innerHTML = "";
    });
    const password = document.getElementById("input--password").value;
    const confirmPass = conformInput.value;
    if (!regex.test(password)) {
        passwordPara =
            "password should be of minimum length 8 and must include one lowercase, one uppercase, one special symbol and one numerical";
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        passwordError = true;
        return false;
    }
    if (password !== confirmPass) {
        document.getElementById("confirmPassError").innerHTML =
            "password doesn't match confirm password";
        confirmationError = true;
        return false;
    }
    if (!passwordError && !confirmationError) {
        return true;
    }
}

function patientValidation() {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let emailError = false;
    let passwordError = false;
    let confirmationError = false;
    let emailPara = "";
    let passwordPara = "";
    console.log("running");
    const emailInput = document.getElementById("input--email");
    const passwordInput = document.getElementById("input--password");
    const conformInput = document.getElementById("confirmPassword");
    emailInput.addEventListener("focus", () => {
        emailError = false;
        passwordError = false;
        emailPara = "";
        passwordPara = "";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        document.getElementById("confirmPassError").innerHTML = "";
    });

    passwordInput.addEventListener("focus", () => {
        emailError = false;
        passwordError = false;
        emailPara = "";
        passwordPara = "";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        document.getElementById("confirmPassError").innerHTML = "";
    });
    const email = document.getElementById("input--email").value;
    const password = document.getElementById("input--password").value;
    const confirmPass = conformInput.value;
    if (email === null || email === "") {
        emailPara = "Email can't be blank";
        document.getElementById("emailErrorPara").innerHTML = emailPara;
        emailError = true;
        return false;
    }
    if (!regex.test(password)) {
        passwordPara =
            "password should be of minimum length 8 and must include one lowercase, one uppercase, one special symbol and one numerical";
        document.getElementById("passwordErrorPara").innerHTML = passwordPara;
        passwordError = true;
        return false;
    }
    if (password !== confirmPass) {
        document.getElementById("confirmPassError").innerHTML =
            "password doesn't match confirm password";
        confirmationError = true;
        return false;
    }
    if (!emailError && !passwordError && !confirmationError) {
        return true;
    }
}
