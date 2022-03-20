# json-collection

### New JSON Collection
```js
const Database = require("fast-json-collection");

let db = new Database({
    path: "./db.json", // path to database file
    sync: true, // auto sync on data change (if set to false, use db.sync() to sync files)
    space: 4 // spacing json file
});

db.set("1", {
    name: "John Doe",
    age: 42,
    phone: "123-456-7890"
});
db.setMany({
    "2": {
        name: "Jane Doe",
        age: 43,
        phone: "123-456-7891"
    },
    "3": {
        name: "Jack Doe",
        age: 44,
        phone: "123-456-7892"
    }
}, false);

console.log(db.get("2").name); // returns "Jane Doe"
```