document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

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

async function fetchPreviewImage(url) {
    try {
        const response = await fetch(url, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*', // This is typically set by the server, not the client
                'Content-Type': 'text/html'
            }
        });
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const ogImage = doc.querySelector('meta[property="og:image"]');
        return ogImage ? ogImage.content : null;
    } catch (error) {
        console.error('Error fetching preview image:', error);
        return null;
    }
}

// Example usage for a project link
const projectLinks = document.querySelectorAll('.project-links a');

projectLinks.forEach(link => {
    link.addEventListener('mouseover', async () => {
        const imageUrl = await fetchPreviewImage(link.href);
        if (imageUrl) {
            // Display the image in a tooltip or modal
            console.log('Preview Image URL:', imageUrl);
            // You can implement your own logic to show this image
        }
    });
});
