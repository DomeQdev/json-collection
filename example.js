const Database = require("./index");

let db = new Database({ path: "./db.json", sync: true, space: 4 });

db.clear();
db.set("1337", {
    name: "John Doe",
    age: 42,
    phone: "123-456-7890"
});
db.setMany({
    "2137": {
        name: "Jane Doe",
        age: 43,
        phone: "123-456-7891"
    },
    "3137": {
        name: "Jack Doe",
        age: 44,
        phone: "123-456-7892"
    }
}, false);

console.log(db.toJSON());