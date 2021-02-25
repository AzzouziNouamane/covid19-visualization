import React from "react";

const Smiley = ({}) => {
    return (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="35" fill="url(#paint0_radial)"/>
            <path d="M24 23V34" stroke="#45460C" strokeWidth="3"/>
            <path d="M46 23V34" stroke="#45460C" strokeWidth="3"/>
            <path d="M15 52C25 62 44.5 62 55 52" stroke="#45460C" strokeWidth="2"/>
            <ellipse cx="52.9544" cy="18.4684" rx="1.5" ry="4.5" transform="rotate(-38.0411 52.9544 18.4684)" fill="white"/>
            <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35 35) rotate(90) scale(35)">
                    <stop offset="0.807292" stopColor="#F9FC81"/>
                    <stop offset="1" stopColor="#C3C653"/>
                </radialGradient>
            </defs>
        </svg>
    );
};

export default Smiley;
