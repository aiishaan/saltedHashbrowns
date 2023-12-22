async function generatePassword() {
    const symbols = '!@#$%^&*_-+=()/[];:'
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '123456789'
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word');
        const word = await response.json();
        
        let symbolsInt = Math.floor(Math.random() * symbols.length);
        const symbol = symbols[symbolsInt];

        let lettersInt = Math.floor(Math.random() * letters.length);
        const letter = letters[lettersInt];

        let numbersInt = Math.floor(Math.random() * numbers.length);
        const number = numbers[numbersInt];
        
        return word + symbol + letter + number

    } catch (error) {
        console.error('There was a problem fetching the random word:', error);
    }
    
}

// Event listener for the the no salt random password button
document.getElementsByClassName('random-password')[0].addEventListener('click', async function() {
    const password = await generatePassword();
    document.getElementById('no-salt-input').value = password;
});

// event listener for the salt random password button
document.getElementsByClassName('random-password-salt')[0].addEventListener('click', async function() {
    const password = await generatePassword();
    document.getElementById('salt-input').value = password;
});
