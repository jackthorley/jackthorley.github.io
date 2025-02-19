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

  //24-12-31
  async function getElec(region, product = "22-11-25") {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-FLEX-${product}/electricity-tariffs/E-1R-SILVER-FLEX-${product}-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getGas(region, product = "22-11-25") {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-FLEX-${product}/gas-tariffs/G-1R-SILVER-FLEX-${product}-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getNewElec(region, product = "23-12-06") {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-BB-${product}/electricity-tariffs/E-1R-SILVER-BB-${product}-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }

  async function getNewGas(region, product = "23-12-06") {
    const response = await fetch(`https://api.octopus.energy/v1/products/SILVER-BB-${product}/gas-tariffs/G-1R-SILVER-BB-${product}-${region}/standard-unit-rates/`);
    const elec = await response.json();
    return elec;
  }


  function createChart(element, data, cap, color, min = 0) {
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
              order: 1
            },
            {
              label: 'Cap',
              data: cap,
              backgroundColor: "#7770df",
              borderColor: "#7770df",
              borderWidth: 2,
              type: 'line',
              order: 0,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
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

  getNewElec("F").then(elecValues => {
    var elec = document.getElementById("elecNew")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecNewChart", last10, [], '#FFB1C1', 10)
  });

  getNewGas("F").then(gasValues => {
    var gas = document.getElementById("gasNew")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasNewChart", last10, [], '#000000', 3.5)
  });

  getNewElec("F", "24-12-31").then(elecValues => {
    var elec = document.getElementById("elecNew2")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = elecValues.results.slice(0, 10).reverse();
    createChart("elecNew2Chart", last10, [23.86,23.86,23.86,23.86,23.86,23.86,23.86,23.86,23.86,23.86], '#FFB1C1', 10)
  });

  getNewGas("F", "24-12-31").then(gasValues => {
    var gas = document.getElementById("gasNew2")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
    var last10 = gasValues.results.slice(0, 10).reverse();
    createChart("gasNew2Chart", last10, [6.31, 6.31,6.31,6.31,6.31,6.31,6.31,6.31,6.31,6.31], '#000000', 3.5)
  });
})();



