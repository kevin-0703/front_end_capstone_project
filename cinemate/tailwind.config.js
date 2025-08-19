import './index.css'; // Import Tailwind CSS here
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                brigme: ["'Brigme Serif'", "serif"],
            },
        },
    },
    plugins: [],
}
