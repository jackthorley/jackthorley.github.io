(async function () {

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  async function getElec(region) {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-FLEX-22-11-25/electricity-tariffs/E-1R-SILVER-FLEX-22-11-25-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getGas(region) {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-FLEX-22-11-25/gas-tariffs/G-1R-SILVER-FLEX-22-11-25-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getNewElec(region) {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-BB-23-12-06/electricity-tariffs/E-1R-SILVER-BB-23-12-06-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getNewGas(region) {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-BB-23-12-06/gas-tariffs/G-1R-SILVER-BB-23-12-06-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }


  function createChart(element, data, color, min = 0) {
    new Chart(
      document.getElementById(element),
      {
        type: 'bar',
        data: {
          labels: data.map(row => new Date(row.valid_from).toLocaleDateString("en-gb")),
          datasets: [
            {
              label: 'Prices Over Time',
              data: data.map(row => row.value_inc_vat),
              backgroundColor: color,
            }
          ]
        },
        options: {
          scales: {
            y: {
              min: min
            }
          },
          plugins: {
            customCanvasBackgroundColor: {
              color: 'white',
            }
          }
        },
        plugins: [plugin],
      }
    );
  };

  getElec("B").then(elecValues => {
    var elec = document.getElementById("elec")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`

    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecChart", last10, '#FFB1C1', 10)
  });

  getGas("B").then(gasValues => {
    var gas = document.getElementById("gas")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasChart", last10, '#000000', 3.5)
  });


  getElec("M").then(elecValues => {
    var elec = document.getElementById("elecY")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecYChart", last10, '#FFB1C1', 10)
  });

  getGas("M").then(gasValues => {
    var gas = document.getElementById("gasY")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasYChart", last10, '#000000', 3.5)
  });


  getElec("F").then(elecValues => {
    var elec = document.getElementById("elecYY")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecYYChart", last10, '#FFB1C1', 10)
  });

  getGas("F").then(gasValues => {
    var gas = document.getElementById("gasYY")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasYYChart", last10, '#000000', 3.5)
  });


  getNewElec("F").then(elecValues => {
    var elec = document.getElementById("elecNew")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecNewChart", last10, '#FFB1C1', 10)
  });

  getNewGas("F").then(gasValues => {
    var gas = document.getElementById("gasNew")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasNewChart", last10, '#000000', 3.5)
  });
})();



