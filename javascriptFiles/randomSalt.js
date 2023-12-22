function randomSalt() {
    var length = Math.ceil(Math.random() * 10);
    const symbols = '!@#$%^&*_-+=()/[];:'
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '123456789'

    const allChars = symbols + letters + numbers;
    salt = "";
    for (index = 0; index < length; index++) {
        let index = Math.floor(Math.random() * allChars.length);
        const symbol = allChars.charAt(index);

        salt += symbol;
        
    }

    document.getElementById("salt-enter-input").value = salt;
}