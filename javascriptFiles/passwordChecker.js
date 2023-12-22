document.getElementById('password-input').addEventListener('input', function() {
    var password = this.value;
    var strength = zxcvbn(password);
    var timeToCrack = strength.crack_times_seconds.offline_slow_hashing_1e4_per_second;
    var formattedTime = formatTime(timeToCrack);

    if (strength.score == 0) {
        document.getElementById('password-strength-span').innerText = 'Very Weak';
        document.getElementById('password-checker-background').style.backgroundColor = "rgb(255, 105, 97)";
    }
    else if (strength.score == 1) {
        document.getElementById('password-strength-span').innerText = 'Weak';
        document.getElementById('password-checker-background').style.backgroundColor = "rgb(255, 150, 79)";
    }
    else if (strength.score == 2) {
        document.getElementById('password-strength-span').innerText = 'Fair';
        document.getElementById('password-checker-background').style.backgroundColor = "rgb(253, 253, 150)";
    }
    else if (strength.score == 3) {
        document.getElementById('password-strength-span').innerText = 'Strong';
        document.getElementById('password-checker-background').style.backgroundColor = "rgb(178, 251, 165)";
    }
    else if (strength.score == 4) {
        document.getElementById('password-strength-span').innerText = 'Very Strong';
        document.getElementById('password-checker-background').style.backgroundColor = "rgb(119, 221, 119)";
    }

    document.getElementById('password-time-span').innerText = formattedTime;
});

function formatTime(seconds) {
    var string = "";

    if (seconds < 60) {
        string = `${seconds} seconds`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        if (minutes == 1) {
            string = `${minutes} minute`;
        } else {
            string = `${minutes} minutes`;
        }
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        if (hours == 1) {
            string = `${hours} hour`;
        } else {
            string = `${hours} hours`;
        }
    } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        if (days == 1) {
            string = `${days} day`;
        } else {
            string = `${days} days`;
        }
    } else if (seconds < 2629746) {
        const weeks = Math.floor(seconds / 604800);
        if (weeks == 1) {
            string = `${weeks} week`;
        } else {
            string = `${weeks} weeks`;
        }
    } else if (seconds < 31556952) {
        const months = Math.floor(seconds / 2629746);
        if (months == 1) {
            string = `${months} month`;
        } else {
            string = `${months} months`;
        }
    } else if (seconds < 315569520) {
        const years = Math.floor(seconds / 31556952);
        if (years == 1) {
            string = `${years} year`;
        } else {
            string = `${years} years`;
        }
    } else if (seconds < 31556952000) {
        const decades = Math.floor(seconds / 315569520);
        if (decades == 1) {
            string = `${decades} decade`;
        } else {
            string = `${decades} decades`;
        }
    } else if (seconds < 315569520000) {
        const centuries = Math.floor(seconds / 31556952000);
        if (centuries == 1) {
            string = `${centuries} century`;
        } else {
            string = `${centuries} centuries`;
        }
    } else {
        const millennia = Math.floor(seconds / 315569520000);
        if (millennia == 1) {
            string = `${millennia} millennium`;
        } else {
            string = `${millennia} millennia`;
        }
    }

    return string;
}
