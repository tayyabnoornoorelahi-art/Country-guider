const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value.trim();
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  if (!countryName) {
    result.innerHTML = `<h3 class="error-msg">The input field cannot be empty</h3>`;
    return;
  }

  fetch(finalURL)
    .then((response) => {
      if (!response.ok) throw new Error("Country not found");
      return response.json();
    })
    .then((data) => {
      const country = data[0];
      const currencyKey = Object.keys(country.currencies)[0];
      const languages = Object.values(country.languages).join(", ");

      result.innerHTML = `
        <div class="country-full-info" style="animation: fadeIn 0.5s ease forwards;">
            <div class="full-info-flag">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            </div>
            
            <div class="full-info-content">
                <h2>${country.name.common}</h2>
                
                <div class="stats-grid">
                    <div class="left-stats">
                        <p><span>Capital:</span> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><span>Continent:</span> ${country.continents[0]}</p>
                        <p><span>Population:</span> ${country.population.toLocaleString()}</p>
                    </div>
                    
                    <div class="right-stats">
                        <p><span>Currency:</span> ${country.currencies[currencyKey].name} (${currencyKey})</p>
                        <p><span>Languages:</span> ${languages}</p>
                    </div>
                </div>
            </div>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error-msg">Country not found. Please try again.</h3>`;
    });
});
