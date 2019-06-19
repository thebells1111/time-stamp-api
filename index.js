const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/timestamp/:datestring?', (req, res) => {
  function timestamp(t) {
    const time = Number(t) ? Number(t) : t   
    const unix = time ? new Date(time).getTime() : new Date().getTime();
    const utc = time ? new Date(time).toUTCString() : new Date().toUTCString();
    return JSON.stringify(unix ? { unix: unix, utc: utc } : { error: "Invalid Date" });
  }

  res.send(timestamp(req.params.datestring));
});

app.listen(3000, () => console.log('server started'));