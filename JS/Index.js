document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});