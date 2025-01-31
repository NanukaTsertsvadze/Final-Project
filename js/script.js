function toggleMenu() {
  const burger = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  
  burger.classList.toggle('active');
  mobileNav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    //weather
    const apiKey = '887aaff89bee4fd742287bfd4afa2483'; // Your API key
    const weatherContainer = document.getElementById('weather-info');
    const cityInput = document.getElementById('city-input');
    const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
  
    async function fetchWeather(city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error('City not found');
  
        const data = await response.json();
        const temperature = data.main.temp;
  
        weatherContainer.innerHTML = `
          <p class="city">Weather in <strong>${city}</strong></p>
          <p class="temperature">${temperature}°C</p>
          <p>Have a great day!</p>
        `;
      } catch (error) {
        console.error('Error fetching weather:', error);
        weatherContainer.innerHTML = '<p>City not found. Please try again.</p>';
      }
    }


    fetchWeatherBtn.addEventListener('click', () => {
      const city = cityInput.value.trim(); 
      if (city) {
        fetchWeather(city); 
      } else {
        weatherContainer.innerHTML = '<p>Please enter a city name.</p>';
      }
    });


    document.getElementById("accept-btn").addEventListener("click", function() {
      localStorage.setItem("cookiesAccepted", "true");
      document.getElementById("cookie-banner").style.display = "none";
    });
    
    if (localStorage.getItem("cookiesAccepted") === "true") {
      document.getElementById("cookie-banner").style.display = "none";
    }
    

    //Scroll to top functionality
    const scrollbtn = document.getElementById('scrollbtn');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollbtn.classList.add('show');
      } else {
        scrollbtn.classList.remove('show');
      }
    });

    scrollbtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });


    //contact form

    const form = document.getElementById("contactForm");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;

        if (!firstNameInput.value.trim()) {
            showError(firstNameInput, "First name is required");
            isValid = false;
        } else {
            clearError(firstNameInput);
        }

        if (!lastNameInput.value.trim()) {
            showError(lastNameInput, "Last name is required");
            isValid = false;
        } else {
            clearError(lastNameInput);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError(emailInput, "Email is required");
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, "Enter a valid email address");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, "Message is required");
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });

    function showError(input, message) {
        const error = input.nextElementSibling;
        error.textContent = message;
        input.style.borderColor = "red";
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        error.textContent = "";
        input.style.borderColor = "#ccc";
    }

});

localStorage.clear();

  
