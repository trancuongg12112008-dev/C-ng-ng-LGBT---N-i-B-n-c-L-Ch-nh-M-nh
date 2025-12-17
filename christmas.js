document.addEventListener('DOMContentLoaded', function () {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.prepend(snowContainer);

    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

        snowContainer.appendChild(snowflake);

        // Remove and recreate snowflake after animation ends to keep DOM clean-ish or just let them loop
        // CSS animation iteration-count: infinite handles the looping, 
        // but we might want them to restart at different positions?
        // Simple infinite loop in CSS is easier.
    }
});