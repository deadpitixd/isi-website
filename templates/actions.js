document.addEventListener("DOMContentLoaded", () => {
    fetch("templates/navigation.html")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load navigation layout.");
            return response.text();
        })
        .then(htmlContent => {
            const placeholder = document.getElementById("navbar-placeholder");
            if (placeholder) {
                placeholder.innerHTML = htmlContent;
                
                // Wait for the window (including CSS) to fully load before calculating widths
                if (document.readyState === "complete") {
                    applyButtonWidths();
                } else {
                    window.addEventListener("load", applyButtonWidths);
                }
            }
        })
        .catch(error => console.error("Error loading navbar:", error));
        const loadLogoButton = () => {
        fetch("templates/isi-logo-btn.html")
            .then(response => {
                if (!response.ok) throw new Error("Could not fetch icon asset.");
                return response.text();
            })
            .then(html => {
                const target = document.getElementById("logo-button-placeholder");
                if (target) target.innerHTML = html;
            })
            .catch(err => console.error(err));
        };

    });
function applyButtonWidths() {
    const allButtons = document.querySelectorAll('.button');
    const extraWidth = 40;

    allButtons.forEach((button) => {
        const currentWidth = button.getBoundingClientRect().width;
        button.style.width = `${currentWidth + extraWidth}px`;
    });
}