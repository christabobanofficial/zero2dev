
/* ---------- 1. DARK MODE TOGGLE ---------- */
// FIND the button by its id.
const themeToggle = document.querySelector('#theme-toggle');
// LISTEN for a click.
themeToggle.addEventListener('click', () => {
  // CHANGE: add the 'dark' class if missing, remove it if present.
  // CSS then re-reads every var(--surface), var(--ink), etc.
  document.body.classList.toggle('dark');
  // Swap the icon to match the current mode.
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'; // nn or n
});
/* ---------- 2. BACK-TO-TOP BUTTON ---------- */
// FIND the button.
const toTop = document.querySelector('#to-top');
// LISTEN for scrolling on the whole window.
window.addEventListener('scroll', () => {
  // CHANGE: show the button only after scrolling down 300px.
  if (window.scrollY > 300) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});
// LISTEN for a click on the button itself.
toTop.addEventListener('click', () => {
  // CHANGE: scroll smoothly back to the top of the page.
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
/* ---------- 3. SCROLL REVEAL ---------- */
// FIND every element that has the class "reveal".
const revealItems = document.querySelectorAll('.reveal');
// IntersectionObserver watches elements and tells us when
// they enter the screen. It is far smoother than the scroll event.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // When an element scrolls into view...
    if (entry.isIntersecting) {
      // CHANGE: add the class that fades + slides it in.
      entry.target.classList.add('is-visible');
      // Stop watching it — it only needs to animate once.
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15 // fire when 15% of the element is visible
});
// Tell the observer to watch each reveal element.
revealItems.forEach((item) => observer.observe(item));

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("weather-result");

  const apiKey = "30d038c0511cc734017d7c85f50df2a9";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // for debugging

    if (data.cod != 200) {
      result.innerHTML = "City not found ❌";
      return;
    }

    result.innerHTML = `
      🌍 City: ${data.name} <br>
      🌡 Temperature: ${data.main.temp}°C <br>
      🌥 Condition: ${data.weather[0].description} <br>
      💧 Humidity: ${data.main.humidity}%
    `;
  } catch (error) {
    result.innerHTML = "Error fetching weather data ❌";
  }
}