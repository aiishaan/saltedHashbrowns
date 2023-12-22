document.addEventListener('DOMContentLoaded', () => {
    
    const banner = document.querySelector('.header-banner-section');
    const motivationText = document.querySelector('.motivation-text');
    const motivationHeader = document.querySelector('.motivation-text-h1');
    const boxElements = document.querySelectorAll('.motivation-card'); 

    window.addEventListener('scroll', () => {
        const rect = banner.getBoundingClientRect();
        const bannerHalfHeight = (banner.offsetHeight / 2) + 200; 

        if (rect.bottom <= bannerHalfHeight) {
            
            motivationText.classList.add('fade-in-element');
            motivationHeader.classList.add('fade-in-element');
           
            boxElements.forEach((element, index) => {
                const delay = index * 0.4;
                element.style.animationDelay = `${delay}s`;
                element.classList.add('fade-in-element');

            });
        } else {
            

            motivationText.classList.remove('fade-in-element');
            motivationHeader.classList.remove('fade-in-element');
            boxElements.forEach(element => {
                element.classList.remove('fade-in-element');
            });
        }
    });
});

// Literally just using the same code but changing class names
document.addEventListener('DOMContentLoaded', () => {
    
    const banner = document.querySelector('.motivation-section');
    const motivationText = document.querySelector('.team-text');
    const motivationHeader = document.querySelector('.team-text-h1');
    const boxElements = document.querySelectorAll('.team-card'); 

    window.addEventListener('scroll', () => {
        const rect = banner.getBoundingClientRect();
        const bannerHalfHeight = (banner.offsetHeight / 2) + 200; 

        if (rect.bottom <= bannerHalfHeight) {
            
            motivationText.classList.add('fade-in-element');
            motivationHeader.classList.add('fade-in-element');
           
            boxElements.forEach((element, index) => {
                // Making the timing quicker tho becuase with 6 elements, its too slow.
                const delay = index * 0.3;
                element.style.animationDelay = `${delay}s`;
                element.classList.add('fade-in-element');

            });
        } else {
            

            motivationText.classList.remove('fade-in-element');
            motivationHeader.classList.remove('fade-in-element');
            boxElements.forEach(element => {
                element.classList.remove('fade-in-element');
            });
        }
    });
});

