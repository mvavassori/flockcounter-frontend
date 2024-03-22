// Prepare payload data
const now = new Date();
const formattedStamp = now.toISOString();
const url = 'http://localhost:8080/api/visit';

// Get the current time in milliseconds when the page loads
let startTime = performance.now();
let totalElapsedTime = 0;
let currentUrl = window.location.href;

console.log('Page loaded, startTime:', startTime);

// Function to handle sending the visit data
function sendVisit() {
    const payloadData = {
        timestamp: formattedStamp,
        referrer: document.referrer || null,
        url: currentUrl,
        pathname: window.location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timeSpentOnPage: Math.round(totalElapsedTime)
    };
    let data = JSON.stringify(payloadData);
    // if the visitor has just spent less than 5 seconds on the page, don't count it as a visit
    if (totalElapsedTime < 5000) {
        console.log('Visit time less than 5 seconds, not sending data.');
        return;
    }
    console.log('Sending visit data:', payloadData);
    navigator.sendBeacon(url, data);
}

// Event listener for page visibility changes
window.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState === 'visible') {
        // Page became visible, restart the timer
        startTime = performance.now();
        console.log('Page became visible, startTime updated:', startTime);
    } else {
        // Page became hidden
        const elapsedTime = performance.now() - startTime;
        console.log('Page became hidden, elapsed time:', elapsedTime);
        totalElapsedTime += elapsedTime;
        console.log('Total elapsed time:', totalElapsedTime);
        sendVisit();
        // Reset the timer after sending the visit data
        startTime = 0;
        totalElapsedTime = 0;
        console.log('Timer reset, startTime:', startTime, 'totalElapsedTime:', totalElapsedTime);
    }
});

// Event listener for route changes
window.addEventListener('popstate', handleRouteChange);
window.history.pushState = overridePushStateFunction(window.history.pushState);
window.history.replaceState = overrideReplaceStateFunction(window.history.replaceState);

function handleRouteChange() {
    const newUrl = window.location.href;
    if (newUrl !== currentUrl) {
        console.log('URL changed from', currentUrl, 'to', newUrl);
        const elapsedTime = performance.now() - startTime;
        console.log('Page changed, elapsed time:', elapsedTime);
        totalElapsedTime += elapsedTime;
        console.log('Total elapsed time:', totalElapsedTime);
        sendVisit();
        currentUrl = newUrl;
        startTime = performance.now();
        console.log('New page, startTime updated:', startTime);
    }
}

function overridePushStateFunction(originalPushState) {
    return function overridenPushState(...args) {
        const result = originalPushState.apply(this, args);
        handleRouteChange();
        return result;
    };
}

function overrideReplaceStateFunction(originalReplaceState) {
    return function overridenReplaceState(...args) {
        const result = originalReplaceState.apply(this, args);
        handleRouteChange();
        return result;
    };
}