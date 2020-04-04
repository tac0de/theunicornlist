function addMobileTableData() {
  var table = document.querySelector("table");
  var bodyTrCollection = table.querySelectorAll("tbody tr");
  var th = table.querySelectorAll("th");
  var thCollection = Array.from(th);

  for (var i = 0; i < bodyTrCollection.length; i++) {
    var td = bodyTrCollection[i].querySelectorAll("td");
    var tdCollection = Array.from(td);
    for (var j = 0; j < tdCollection.length; j++) {
      if (j === thCollection.length) {
        continue;
      }
      var headerLabel = thCollection[j].innerHTML;
      tdCollection[j].setAttribute("data-th", headerLabel);
    }
  }
}

function json2Table(json) {
  let cols = Object.keys(json[0]);

  // let headerRow = cols.map(col => `<th>${col}</th>`).join("");

  let rows = json
    .map(row => {
      let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  //build the table
  const table = `
	<table>
		<thead>
      <tr>
        <th>company</th>
        <th>valuation ($b)</th>
        <th>date joined</th>
        <th>country</th>
        <th>industry</th>
        <th>select investors</th>
      </tr>
		<thead>
		<tbody>
			${rows}
		<tbody>
	<table>`;

  return table;
}

fetch("./data.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    output = document.getElementById("output");
    output.innerHTML = json2Table(data);
    console.log(data);
    addMobileTableData();
  })
  .catch(err => {
    console.log(err);
  });
