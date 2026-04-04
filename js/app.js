let inventoryData = [];

// Use date key for daily history
const todayKey = "inventory_" + new Date().toLocaleDateString();

// Load today's data
window.onload = function () {
    const savedData = localStorage.getItem(todayKey);
    if (savedData) {
        inventoryData = JSON.parse(savedData);
        renderTable();
    }
};

// Add Item
function addItem() {
    const name = document.getElementById("itemName").value;
    const stock = parseInt(document.getElementById("stockQty").value);
    const system = parseInt(document.getElementById("systemQty").value);
    let sold = parseInt(document.getElementById("soldQty").value);

    if (!name || isNaN(stock) || isNaN(system)) {
        alert("Please fill all required fields correctly");
        return;
    }

    // If Sold not entered, calculate automatically
    if (isNaN(sold)) sold = stock - system;

    const now = new Date();

    const item = {
        name,
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

// Save data to localStorage (daily key)
function saveData() {
    localStorage.setItem(todayKey, JSON.stringify(inventoryData));
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    let totalSold = 0;

    inventoryData.forEach((item, index) => {
        const row = tableBody.insertRow();

        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item.stock;
        row.insertCell(2).innerText = item.system;

        // Editable Sold field
        const soldCell = row.insertCell(3);
        const soldInput = document.createElement("input");
        soldInput.type = "number";
        soldInput.value = item.sold;
        soldInput.onchange = function() {
            item.sold = parseInt(this.value);
            saveData();
            updateTotal();
        };
        soldCell.appendChild(soldInput);

        row.insertCell(4).innerText = item.date;
        row.insertCell(5).innerText = item.time;

        totalSold += item.sold;

        if (item.sold < 0) row.classList.add("error");

        // Edit button
        const editCell = row.insertCell(6);
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function () {
            editItem(index);
        };
        editCell.appendChild(editBtn);

        // Delete button
        const deleteCell = row.insertCell(7);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () {
            deleteItem(index);
        };
        deleteCell.appendChild(deleteBtn);
    });

    updateTotal();
}

function updateTotal() {
    let total = inventoryData.reduce((sum, item) => sum + item.sold, 0);
    document.getElementById("totalSold").innerText = total;
}

// Delete
function deleteItem(index) {
    inventoryData.splice(index, 1);
    saveData();
    renderTable();
}

// Edit
function editItem(index) {
    const item = inventoryData[index];

    document.getElementById("itemName").value = item.name;
    document.getElementById("stockQty").value = item.stock;
    document.getElementById("systemQty").value = item.system;
    document.getElementById("soldQty").value = item.sold;

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

// Clear input fields
function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("stockQty").value = "";
    document.getElementById("systemQty").value = "";
    document.getElementById("soldQty").value = "";
}