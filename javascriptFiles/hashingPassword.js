function hashingFunctionNoSalt() {
    const password = document.getElementById("no-salt-input");
    var hashedPassword = CryptoJS.MD5(password.value);

    document.getElementById("no-salt-hashed-password").innerText = hashedPassword;

}

function hashingFunctionSalt() {
    const passwordElement = document.getElementById("salt-input");
    const saltElement = document.getElementById("salt-enter-input");

    const password = passwordElement.value;
    const salt = saltElement.value;
    const passwordPlusSalt = password + salt;
    var hashedPassword = CryptoJS.MD5(passwordPlusSalt).toString();

    document.getElementById("salt-hashed-password").innerText = hashedPassword;

}