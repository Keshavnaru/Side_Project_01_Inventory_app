// STORAGE KEYS
const MASTER_KEY = "items_master";
const LOG_KEY = "inventory_logs";

let masterItems = [];
let logs = [];

window.onload = function () {
    masterItems = JSON.parse(localStorage.getItem(MASTER_KEY)) || [];
    logs = JSON.parse(localStorage.getItem(LOG_KEY)) || [];

    renderMaster();
    populateDropdown();
    renderInventory();
};

// 🔹 ADD PERMANENT ITEM
function addMasterItem() {
    const name = document.getElementById("newItemName").value;
    const type = document.getElementById("newItemType").value;

    if (!name || !type) return alert("Fill all fields");

    masterItems.push({ name, type });
    localStorage.setItem(MASTER_KEY, JSON.stringify(masterItems));

    renderMaster();
    populateDropdown();
}

// 🔹 POPULATE DROPDOWN
function populateDropdown() {
    const select = document.getElementById("itemSelect");
    select.innerHTML = "";

    masterItems.forEach((item, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.text = item.name + " (" + item.type + ")";
        select.appendChild(option);
    });
}

// 🔹 ADD DAILY INVENTORY
function addInventory() {
    const index = document.getElementById("itemSelect").value;
    const stock = parseInt(document.getElementById("stockQty").value);
    const system = parseInt(document.getElementById("systemQty").value);
    const sold = parseInt(document.getElementById("soldQty").value) || 0;

    const item = masterItems[index];

    const entry = {
        name: item.name,
        type: item.type,
        stock,
        system,
        sold,
        date: new Date().toLocaleDateString()
    };

    logs.push(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));

    renderInventory();
}

// 🔹 SHOW TODAY ONLY
function renderInventory() {
    const tbody = document.querySelector("#inventoryTable tbody");
    tbody.innerHTML = "";

    const today = new Date().toLocaleDateString();

    logs.filter(l => l.date === today).forEach((item, i) => {
        const row = tbody.insertRow();

        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.type;
        row.insertCell(2).innerText = item.stock;
        row.insertCell(3).innerText = item.system;
        row.insertCell(4).innerText = item.sold;
        row.insertCell(5).innerText = item.date;

        const del = row.insertCell(6);
        del.innerHTML = `<button onclick="deleteLog(${i})">Delete</button>`;
    });
}

// 🔹 DELETE LOG
function deleteLog(i) {
    logs.splice(i, 1);
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));
    renderInventory();
}

// 🔹 MASTER TABLE
function renderMaster() {
    const tbody = document.querySelector("#masterTable tbody");
    tbody.innerHTML = "";

    masterItems.forEach((item, i) => {
        const row = tbody.insertRow();

        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.type;

        const del = row.insertCell(2);
        del.innerHTML = `<button onclick="deleteMaster(${i})">Delete</button>`;
    });
}

// 🔹 DELETE MASTER ITEM
function deleteMaster(i) {
    masterItems.splice(i, 1);
    localStorage.setItem(MASTER_KEY, JSON.stringify(masterItems));
    renderMaster();
    populateDropdown();
}