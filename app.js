document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        // console.log('callback - particles.js config loaded');
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
    // const username = window.location.hostname.split('.')[0]; // Get the part before ".github.io"
    const username = 'la5u'

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
        console.log(`Fetching image from URL: ${url}`); // Log the URL being fetched
        const response = await fetch(url);
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            console.log(`Error fetching image: ${response.status} ${response.statusText}`);
            return null; // Return null if the response is not OK
        }
        const screenshot = await new Promise((resolve, reject) => {
            html2canvas(document.body, { scale: 4 }).then(canvas => { // Increased scale for a more pronounced zoom effect
                const dataUrl = canvas.toDataURL('image/png');
                resolve(dataUrl); // Return the screenshot URL
            }).catch(error => {
                console.error('Error taking screenshot:', error);
                reject(null);
            });
        });
        return screenshot; // Return the screenshot URL
    } catch (error) {
        console.log(`Fetch error: ${error}`);
        return null;
    }
}
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', async () => {
        const previewImage = card.querySelector('.preview-image');

        // Use a flag to ensure the image is fetched only once
        if (!previewImage.src && !previewImage.dataset.fetched) {
            const link = card.querySelector('.project-links a'); // Get the first link in the project card
            
            previewImage.dataset.fetched = true; // Set the flag to indicate the image has been fetched
            const imageUrl = await fetchPreviewImage(link.href);
            if (imageUrl) {
                console.log(imageUrl); // Log the image URL
                previewImage.src = imageUrl;
                previewImage.style.display = 'block'; // Correctly set the display property
            }
        }
    });
});
