let passwordCopy = document.querySelector('#password-input');
let copyIcon = document.querySelector('#copy-icon'); // Select the copy icon

let passLen = document.getElementById('value');
let genHere = document.querySelector('#gen-here');
const strengthCircle = document.getElementById('circle-sign');

let password = "";

let uppercaseCheck = document.getElementById('uppercase-check');
let lowercaseCheck = document.getElementById('lowercase-check');
let numberCheck = document.getElementById('numbers-check');
let symbolCheck = document.getElementById('symbols-check');

let boolUpper = false;
let boolLower = false;
let boolNumber = false;
let boolSymbol = false;

const slider = document.getElementById("mySlider");

let len = slider.value;

slider.oninput = function() {
    passLen.textContent = this.value;
    len = this.value;
}

function checkCheckbox() {
    boolUpper = uppercaseCheck.checked;
    boolLower = lowercaseCheck.checked;
    boolNumber = numberCheck.checked;
    boolSymbol = symbolCheck.checked;
}

function changeCircleColor() {
    let strength = 0;

    // Check password conditions for strength
    if (password.length >= 6) strength++; // Length greater than 6
    if (/[A-Z]/.test(password)) strength++; // Contains uppercase letters
    if (/[0-9]/.test(password)) strength++; // Contains numbers
    if (/[\W]/.test(password)) strength++; // Contains symbols

    // Reset circle's color
    strengthCircle.classList.remove('weak', 'medium', 'strong');

    // Apply different color based on strength
    if (strength === 0 || strength === 1) {
        strengthCircle.classList.add('weak'); // Weak strength
    } else if (strength === 2) {
        strengthCircle.classList.add('medium'); // Medium strength
    } else if (strength >= 3) {
        strengthCircle.classList.add('strong'); // Strong strength
    }
}


function getPassword() {
    let characterPool = "";
    
    if (boolUpper) {
        characterPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (boolLower) {
        characterPool += "abcdefghijklmnopqrstuvwxyz";
    }
    if (boolNumber) {
        characterPool += "0123456789";
    }
    if (boolSymbol) {
        characterPool += "!@#$%^&*()_+[]{}|;:',.<>/?";
    }
    
    if (characterPool === "") {
        alert('Please select at least one of the checkbox');
    }

    let password1 = "";
    for (let i = 0; i < len; i++) {
        let randomIndex = Math.floor(Math.random() * characterPool.length);
        password1 += characterPool.charAt(randomIndex);
    }
    password = password1;
    passwordCopy.value = password1;

    changeCircleColor();
}

function genPassword() {
    checkCheckbox();
    getPassword();
}

genHere.addEventListener('click', genPassword);

// Copy password to clipboard functionality
copyIcon.addEventListener('click', function() {
    if (passwordCopy.value) {
        navigator.clipboard.writeText(passwordCopy.value).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    } else {
        alert("No password to copy!");
    }
});
