async function getSheet() {
  const id = process.env.SCRIPT_ID;
  if (!id) {
    throw new Error('SCRIPT_ID env var not set (expected `SHEET_ID="<id>"` in `.env` file)')
  }
  const res = await fetch(`https://script.google.com/macros/s/${id}/exec`,
    {
      method: 'GET',
      mode: "cors",
      redirect: "follow",
      headers:
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  const json = await res.json();
  return json;
}

getSheet().then(json => {
  // console.log(json)
  const appointments = [];
  // const today = '10/24/2023'
  const today = new Date().toLocaleString('en-US').replace(' ', 'T').split(',')[0]
  const todaysAppointments = json.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex, cells) => {
      if (getTimezoneDateStr(cell).startsWith(today) && cells[cellIndex + 1]?.trim()) {
        appointments.push(
          {
            time: getTimezoneDateStr(cell).split('T')?.[1]?.replace(/(:00:00|:00)\s/, '')?.toLowerCase(),
            name: cells?.[cellIndex + 1]?.trim()
          })
      }
    })
  })
  console.log(appointments.map(a => a.time + ' ' + a.name).join('\n'))
});

// e.g. str = "2023-10-25T00:00:00.000Z" => "10/25/2023,T12:00:00 PM
function getTimezoneDateStr(str) {
  return new Date(str).toLocaleString('en-US').replace(' ', 'T')
}
