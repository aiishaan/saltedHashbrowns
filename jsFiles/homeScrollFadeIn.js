document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const motivationSection = document.getElementById('motivation-section');
    const boxElements = motivationSection.querySelectorAll('div.motivation-box')

    window.addEventListener('scroll', () => {
        const rect = banner.getBoundingClientRect();

        /* Trying to get it when the banner is halfway out of the screen?*/
        /* Changed it to 50 cause it seems better tbh*/
        const bannerHalfHeight = (banner.offsetHeight / 2) + 200;

        if (rect.bottom <= bannerHalfHeight) {
            motivationSection.style.opacity = '1';

            boxElements.forEach((element, index) => {
                const delay = index * 0.4;
                element.style.animationDelay = `${delay}s`;
                element.classList.add('fade-in-element');
            });
            
        } else {
            motivationSection.style.opacity = '0';
            boxElements.forEach(element => {
                element.classList.remove('fade-in-element');
            });
            
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const motivationSection = document.getElementById('motivation-section');
    const teamSection = document.getElementById('team-section');

    window.addEventListener('scroll', () => {
        const rect = motivationSection.getBoundingClientRect();

        /* Trying to get it when the banner is halfway out of the screen?*/
        const motivationHalfHeight = (motivationSection.offsetHeight / 2) + 200;

        if (rect.bottom <= motivationHalfHeight) {
            teamSection.style.opacity = '1';
        } else {
            teamSection.style.opacity = '0';
        }
    });
});
