window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;

if (!window.indexedDB) alert("Seu navegador não suporta");

let db;
let request = window.indexedDB.open("db_son", 1);

request.onerror = (event) => {
  console.log("error: ", event);
};

request.onsuccess = (event) => {
  db = request.result;
  console.log("sucess: ", event);
};

request.onupgradeneeded = (event) => {
  let db = event.target.result;

  let objectStore = db.createObjectStore("users", { keyPath: "id" });
};

function add() {
  let store = db.transaction(["users"], "readwrite").objectStore("users");

  let request = store.add({
    id: 2,
    name: "Erik 2",
    age: 29,
  });

  request.onsuccess = (event) => {
    console.log("success: ", event);
  };
}

function edit() {
  let transaction = db
    .transaction(["users"], "readwrite")
    .objectStore("users")
    .get(1);

  transaction.onsuccess = (event) => {
    let user = transaction.result;
    user.age = 33;
    db.transaction("users", "readwrite").objectStore("users").put(user);
    console.log("result: ", user);
  };
}

function remove() {
  let transaction = db
    .transaction(["users"], "readwrite")
    .objectStore("users")
    .delete(2);

  transaction.onsuccess = (event) => {
    console.log("result: ", event);
  };
}

function get() {
  let transaction = db
    .transaction(["users"], "readwrite")
    .objectStore("users")
    .get(1);

  transaction.onsuccess = (event) => {
    console.log("result: ", transaction.result);
  };
}
function getAll() {
  let transaction = db
    .transaction(["users"], "readwrite")
    .objectStore("users")
    .getAll();

  transaction.onsuccess = (event) => {
    console.log("result: ", transaction.result);
  };
}

document.getElementById("add").addEventListener("click", add);
document.getElementById("edit").addEventListener("click", edit);
document.getElementById("remove").addEventListener("click", remove);
document.getElementById("get").addEventListener("click", get);
document.getElementById("getAll").addEventListener("click", getAll);
