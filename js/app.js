let inventoryData = [];

// Daily key for sessionStorage
const todayKey = "inventory_" + new Date().toLocaleDateString();

// Simple encryption/decryption helper (use a proper library for production)
const encryptData = (data) => btoa(JSON.stringify(data));
const decryptData = (data) => JSON.parse(atob(data));

// Load existing data
window.onload = function () {
    const savedData = sessionStorage.getItem(todayKey);
    if (savedData) {
        try {
            inventoryData = decryptData(savedData);
            renderTable();
        } catch (e) {
            console.error("Failed to load data:", e);
            inventoryData = [];
        }
    }
};

// Add item
function addItem() {
    const name = document.getElementById("itemName").value;
    const type = document.getElementById("itemType").value;
    const stock = parseInt(document.getElementById("stockQty").value);
    const system = parseInt(document.getElementById("systemQty").value);
    let sold = parseInt(document.getElementById("soldQty").value);

    if (!name || !type || isNaN(stock) || isNaN(system)) {
        alert("Please fill all required fields correctly");
        return;
    }

    if (isNaN(sold)) sold = stock - system;

    const now = new Date();

    const item = {
        name,
        type,
        stock,
        system,
        sold,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };

    inventoryData.push(item);
    saveData();
    renderTable();
    clearInputs();
}

// Save to sessionStorage
function saveData() {
    try {
        sessionStorage.setItem(todayKey, encryptData(inventoryData));
    } catch (e) {
        console.error("Failed to save data:", e);
    }
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    inventoryData.forEach((item, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.type;
        row.insertCell(2).innerText = item.stock;
        row.insertCell(3).innerText = item.system;

        const soldCell = row.insertCell(4);
        const soldInput = document.createElement("input");
        soldInput.type = "number";
        soldInput.value = item.sold;
        soldInput.onchange = function() {
            item.sold = parseInt(this.value);
            saveData();
            updateTotal();
        };
        soldCell.appendChild(soldInput);

        row.insertCell(5).innerText = item.date;
        row.insertCell(6).innerText = item.time;

        if (item.sold < 0) row.classList.add("error");

        const editCell = row.insertCell(7);
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function () { editItem(index); };
        editCell.appendChild(editBtn);

        const deleteCell = row.insertCell(8);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () { deleteItem(index); };
        deleteCell.appendChild(deleteBtn);
    });

    updateTotal();
}

function updateTotal() {
    let total = inventoryData.reduce((sum, item) => sum + item.sold, 0);
    document.getElementById("totalSold").innerText = total;
}

// Edit item
function editItem(index) {
    const item = inventoryData[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemType").value = item.type;
    document.getElementById("stockQty").value = item.stock;
    document.getElementById("systemQty").value = item.system;
    document.getElementById("soldQty").value = item.sold;

    inventoryData.splice(index, 1);
    saveData();
    renderTable();
}

// Delete item
function deleteItem(index) {
    inventoryData.splice(index, 1);
    saveData();
    renderTable();
}

// Clear all
function clearAll() {
    if (confirm("Are you sure you want to clear all data for today?")) {
        inventoryData = [];
        saveData();
        renderTable();
    }
}

// Clear inputs
function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemType").value = "";
    document.getElementById("stockQty").value = "";
    document.getElementById("systemQty").value = "";
    document.getElementById("soldQty").value = "";
}