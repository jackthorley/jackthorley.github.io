(function () {


  async function getElec() {
    const response = await fetch("https://api.octopus.energy/v1/products/SILVER-FLEX-22-11-25/electricity-tariffs/E-1R-SILVER-FLEX-22-11-25-B/standard-unit-rates/");
    const elec = await response.json();
    return elec;
  }

  async function getGas() {
    const response = await fetch("https://api.octopus.energy/v1/products/SILVER-FLEX-22-11-25/gas-tariffs/G-1R-SILVER-FLEX-22-11-25-B/standard-unit-rates/");
    const elec = await response.json();
    return elec;
  }

  getElec().then(elecValues => {
    var elec = document.getElementById("elec")
    var date = new Date(elecValues.results[0].valid_from).toDateString();

    elec.innerText = `${elecValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
  });

  getGas().then(gasValues => {
    var gas = document.getElementById("gas")
    var date = new Date(gasValues.results[0].valid_from).toDateString();

    gas.innerText = `${gasValues.results[0].value_inc_vat}p on ${date.toLocaleString('en-GB', { timeZone: 'UTC' })}`
  });
})();

