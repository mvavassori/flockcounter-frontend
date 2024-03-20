const trackVisit = (isUniqueVisit, timeSpentOnPage) => {
    // Prepare payload data
    const now = new Date();
  
    // Use toISOString for ISO 8601 format with UTC timezone
    const formattedStamp = now.toISOString();
  
    const payloadData = {
      timestamp: formattedStamp,
      referrer: document.referrer || null,
      url: window.location.href,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      language: navigator.language,
      country: getCountry(),
      state: getState(),
      isUnique: isUniqueVisit,
      timeSpentOnPage: timeSpentOnPage
    };
  
    console.log(payloadData);
  
    // Construct full API endpoint URL
    const apiUrl = "http://localhost:8080/api/visit";
  
    try {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadData),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }).catch(error => {
        console.error("Error sending visit data:", error);
      });
    } catch (error) {
      console.error("Error sending visit data:", error);
    }
};

// when the user arrives to the page, start a timer to count the time spent on the page
const trackTimeSpentOnPage = () => {
    pageLoadTime = performance.now();
}

// Prepare payload data
const now = new Date();
  
// Use toISOString for ISO 8601 format with UTC timezone
const formattedStamp = now.toISOString();

// Get the current time in milliseconds when the page loads
let startTime = performance.now();



const url = 'http://localhost:8080/api/visit';

window.addEventListener("visibilitychange", (event) => {
    // Calculate the elapsed time in milliseconds
    let elapsedTime = performance.now() - startTime;
    console.log(elapsedTime)
    sendVisit(event, elapsedTime);
});

window.addEventListener("popstate", (event) => {
    // Calculate the elapsed time in milliseconds
    let elapsedTime = performance.now() - startTime;
    console.log(elapsedTime)
    sendVisit(event, elapsedTime);
})

function sendVisit(event, elapsedTime) {
    const payloadData = {
      timestamp: formattedStamp,
      referrer: document.referrer || null,
      url: window.location.href,
      pathname: window.location.pathname,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timeSpentOnPage: elapsedTime
    };
    let data = JSON.stringify(payloadData);
    // if the visitor has just spent 5 seconds on the page, don't count it as a visit
    if (elapsedTime < 7000) {
      return
    }
    if (document.visibilityState === 'hidden') {
      startTime = performance.now();
      navigator.sendBeacon(url, data);
    }
}

