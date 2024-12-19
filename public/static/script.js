// todo test referrer in SPAs
// Prepare payload data
const metaTag = document.querySelector('meta[name="backend-url"]');
const backendUrl = metaTag
  ? metaTag.content + "/visit"
  : "http://localhost:8080/api/visit";

// Get the current time in milliseconds when the page loads
let startTime = performance.now();
let totalElapsedTime = 0;
let currentUrl = window.location.href;

let currentReferrer = document.referrer || null;

if (currentReferrer) {
  let url = new URL(currentReferrer);
  currentReferrer = url.origin + url.pathname;
}

let previousPathname = window.location.pathname;

// Function to handle sending the visit data
function sendVisit(elapsedTime) {
  const now = new Date();
  const formattedStamp = now.toISOString();
  const payloadData = {
    timestamp: formattedStamp,
    referrer: currentReferrer,
    url: currentUrl,
    pathname: previousPathname,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timeSpentOnPage: Math.round(elapsedTime),
  };
  let data = JSON.stringify(payloadData);
  navigator.sendBeacon(backendUrl, data);
}

// Event listener for page visibility changes
window.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState === "visible") {
    // Page became visible, restart the timer
    startTime = performance.now();
  } else {
    // Page became hidden
    const elapsedTime = performance.now() - startTime;
    totalElapsedTime += elapsedTime;

    if (totalElapsedTime < 2000) {
      // Reset the timer without sending the visit data
      startTime = 0;
      totalElapsedTime = 0;
    } else {
      sendVisit(totalElapsedTime);
      // Reset the timer after sending the visit data
      startTime = 0;
      totalElapsedTime = 0;
    }
  }
});

// Event listener for route changes
window.addEventListener("popstate", handleRouteChange);
window.history.pushState = overridePushStateFunction(window.history.pushState);
window.history.replaceState = overrideReplaceStateFunction(
  window.history.replaceState
);

function handleRouteChange() {
  const newUrl = window.location.href;
  let referrer;

  if (document.referrer) {
    // Parse the referrer URL
    let referrerURL = new URL(document.referrer);

    // Construct the referrer without query parameters
    referrer = referrerURL.origin + referrerURL.pathname;
  } else {
    referrer = "Direct";
  }

  if (newUrl !== currentUrl) {
    // Store the current URL as the previous referrer
    currentReferrer = referrer;

    const elapsedTime = performance.now() - startTime;
    totalElapsedTime += elapsedTime;
    if (totalElapsedTime < 2000) {
      // Reset the timer without sending the visit data
      startTime = performance.now();
      totalElapsedTime = 0;
    } else {
      sendVisit(totalElapsedTime);
      currentUrl = newUrl;
      startTime = performance.now();
      totalElapsedTime = 0;
    }
  }
}

function overridePushStateFunction(originalPushState) {
  return function overridenPushState(...args) {
    previousPathname = window.location.pathname; // Store the previous pathname before calling handleRouteChange
    const result = originalPushState.apply(this, args);
    handleRouteChange();
    return result;
  };
}

function overrideReplaceStateFunction(originalReplaceState) {
  return function overridenReplaceState(...args) {
    previousPathname = window.location.pathname;
    const result = originalReplaceState.apply(this, args);
    handleRouteChange();
    return result;
  };
}
