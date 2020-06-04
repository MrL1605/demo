import axios from "axios";

export let DB = {};
axios
    .create({
        baseURL: "https://raw.githubusercontent.com/MrL1605/demo/master/",
        responseType: "json"
    })
    .get("/large-db-v3.json")
    .then(content => {
        DB = content.data;
    });

// https://raw.githubusercontent.com/MrL1605/demo/master/db.json
// https://raw.githubusercontent.com/MrL1605/demo/master/large-db.json
// https://raw.githubusercontent.com/MrL1605/demo/master/large-db-v3.json
