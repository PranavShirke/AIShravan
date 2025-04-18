// Font Settings Manager
const FontSettings = {
    // Default values
    defaults: {
        fontSize: '16',
        fontFamily: "'Poppins', sans-serif"
    },

    // Initialize font settings
    init() {
        this.loadSettings();
        this.applySettings();
    },

    // Load settings from localStorage
    loadSettings() {
        const savedFontSize = localStorage.getItem('fontSize');
        const savedFontFamily = localStorage.getItem('fontFamily');
        
        if (savedFontSize) {
            document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);
        }
        
        if (savedFontFamily) {
            document.documentElement.style.setProperty('--font-family', savedFontFamily);
        }
    },

    // Apply settings to the page
    applySettings() {
        const savedFontSize = localStorage.getItem('fontSize') || this.defaults.fontSize;
        const savedFontFamily = localStorage.getItem('fontFamily') || this.defaults.fontFamily;

        document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);
        document.documentElement.style.setProperty('--font-family', savedFontFamily);
    },

    // Reset to default settings
    reset() {
        localStorage.setItem('fontSize', this.defaults.fontSize);
        localStorage.setItem('fontFamily', this.defaults.fontFamily);
        this.applySettings();
    },

    // Save new settings
    save(fontSize, fontFamily) {
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('fontFamily', fontFamily);
        this.applySettings();
    }
};

// Initialize font settings when the page loads
document.addEventListener('DOMContentLoaded', () => {
    FontSettings.init();
}); 