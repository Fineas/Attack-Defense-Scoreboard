const axios = require("axios");
const fs = require("fs");

setInterval(() => {
  axios.get("http://localhost:3000/export").then((res) => {
    fs.writeFileSync(
      "./snaps/" + Date.now() + ".json",
      JSON.stringify(res.data)
    );
    console.log(res.data);
  });
}, 1000 * 30);
