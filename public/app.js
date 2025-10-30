// Everything lives in the global closure so nobody knows what depends on what.
(function () {
  const apiUrl = '/api/olympic';
  let pieChart;
  let lineChart;

  function fetchOlympicData(onSuccess, onError) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Liste des données : ${JSON.stringify(data)}`);
        if (typeof onSuccess === 'function') {
          onSuccess(data);
        }
      })
      .catch((error) => {
        console.log('erreur :', error);
        if (typeof onError === 'function') {
          onError(error);
        }
      });
  }

  function buildPieChart(countries, sumOfAllMedalsYears) {
    const chartElementId = 'DashboardPieChart';
    const existing = document.getElementById(chartElementId);
    if (!existing) {
      return;
    }
    pieChart = new Chart(chartElementId, {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        onClick: function (evt) {
          const points = pieChart.getElementsAtEventForMode(evt, 'point', { intersect: true }, true);
          if (points.length) {
            const firstPoint = points[0];
            const countryName = pieChart.data.labels[firstPoint.index];
            window.location.href = '/country/' + encodeURIComponent(countryName);
          }
        }
      }
    });
  }

  function buildLineChart(years, medals) {
    const chartElementId = 'countryChart';
    const existing = document.getElementById(chartElementId);
    if (!existing) {
      return;
    }
    lineChart = new Chart(chartElementId, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'medals',
          data: medals,
          backgroundColor: '#0b868f'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  function updateText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function initHomePage() {
    fetchOlympicData(
      function (data) {
        if (!Array.isArray(data) || !data.length) {
          updateText('home-error', 'No data found');
          return;
        }
        const totalJOs = Array.from(new Set(data.map((i) => i.participations.map((f) => f.year)).flat())).length;
        const countries = data.map((i) => i.country);
        const totalCountries = countries.length;
        const medals = data.map((i) => i.participations.map((p) => p.medalsCount));
        const sumOfAllMedalsYears = medals.map((i) => i.reduce((acc, item) => acc + item, 0));

        updateText('totalJOs', totalJOs);
        updateText('totalCountries', totalCountries);
        buildPieChart(countries, sumOfAllMedalsYears);
      },
      function (error) {
        updateText('home-error', error.message || 'An error occurred');
      }
    );
  }

  function extractCountryNameFromPath() {
    const pieces = window.location.pathname.split('/');
    return decodeURIComponent(pieces[pieces.length - 1] || '');
  }

  function initCountryPage() {
    fetchOlympicData(
      function (data) {
        const countryName = extractCountryNameFromPath();
        const selectedCountry = data.find((item) => item.country === countryName);
        if (!selectedCountry) {
          window.location.href = '/not-found';
          return;
        }

        const participations = selectedCountry.participations.map((item) => item);
        const totalEntries = participations.length;
        const years = participations.map((p) => p.year);
        const medals = participations.map((p) => p.medalsCount.toString());
        const totalMedals = medals.reduce((accumulator, item) => accumulator + parseInt(item, 10), 0);
        const nbAthletes = participations.map((p) => p.athleteCount.toString());
        const totalAthletes = nbAthletes.reduce((accumulator, item) => accumulator + parseInt(item, 10), 0);

        updateText('country-title', selectedCountry.country);
        updateText('totalEntries', totalEntries);
        updateText('totalMedals', totalMedals);
        updateText('totalAthletes', totalAthletes);

        buildLineChart(years, medals);
      },
      function (error) {
        updateText('country-error', error.message || 'An error occurred');
      }
    );
  }

  function boot() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      initHomePage();
    } else if (window.location.pathname.indexOf('/country') === 0) {
      initCountryPage();
    } else {
      // nothing to do, plain HTML handles the not found page
    }
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
