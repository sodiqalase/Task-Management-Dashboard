/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                appBg: "#F1F5FF",
                blueGray: "#617091",
                inputGray: "#667085",
                gray2: "#A3ABBC",
                dbGray: "#283656",
                lightGray: "#E6E9ED",
                primary: "#1977F2",
            },
            boxShadow: {
                card: "0px 0px 15px 0px rgba(159, 169, 191, 0.10)",
                action: "0 0 22px rgba(0,0,0,.1)",
            },
            fontFamily: {
                black: ["Jost-Black", "sans-serif"],
                normal: ["Jost-Regular", "sans-serif"],
                medium: ["Jost-Medium", "sans-serif"],
                bold: ["Jost-Bold", "sans-serif"],
                semibold: ["Jost-SemiBold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
