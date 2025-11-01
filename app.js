console.log("app.js loaded!");
document.addEventListener('DOMContentLoaded', () => {
    console.log("app.js loaded!");
    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        // console.log('callback - particles.js config loaded');
    });
    
    // Animated font cycling for name
    const fonts = [
        'Comic Neue',
        'Impact',
        'Courier New',
        'Times New Roman',
        'Arial',
        'Verdana',
        'Georgia',
        'Trebuchet MS',
        'Lucida Console',
        'Palatino Linotype'
    ];
    
    const nameElement = document.getElementById('name');
    
    function changeFont() {
        const randomIndex = Math.floor(Math.random() * fonts.length);
        nameElement.style.fontFamily = fonts[randomIndex];
        const randomDelay = (Math.random() * 50) + 100;
        setTimeout(changeFont, randomDelay);
    }
    
    changeFont();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add fade-in animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });
    });

    projectCards.forEach(card => observer.observe(card));

    // Extract the username from the URL
    const username = window.location.hostname.split('.')[0]; // Get the part before ".github.io"
    // const username = 'la5u'

    // Update GitHub link
    const githubLink = document.querySelector('.github-link');
    githubLink.href = `https://github.com/${username}`;
    
    // Update GitHub links for projects after the page loads
    document.querySelectorAll('.github-link[data-repo]').forEach(link => {
        const repo = link.getAttribute('data-repo');
        link.href = `https://github.com/${username}/${repo}`;
    });
});