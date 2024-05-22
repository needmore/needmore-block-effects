document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // if (entry.target.classList.contains('fade-in-words')) {
                    const paragraphs = entry.target.querySelectorAll('blockquote p');
                    paragraphs.forEach(paragraph => {
                        const words = paragraph.querySelectorAll('span');
                        words.forEach((word, index) => {
                            setTimeout(() => {
                                word.classList.add('fade-in-word');
                            }, index * 120);
                        });
                    });
                // }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .reveal-left-to-right, .fade-in-words, blockquote p').forEach((el) => {
        observer.observe(el);
    });

    // Wrap words in span for fade-in-words effect
    document.querySelectorAll('.fade-in-words p').forEach((paragraph) => {
        const words = paragraph.textContent.split(' ');
        paragraph.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
    });
});
