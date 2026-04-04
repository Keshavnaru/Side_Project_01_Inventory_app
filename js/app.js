function addItem() {
    const name = document.getElementById("itemName").value;
    const stock = parseInt(document.getElementById("stockQty").value);
    const system = parseInt(document.getElementById("systemQty").value);

    if (!name || isNaN(stock) || isNaN(system)) {
        alert("Please fill all fields correctly");
        return;
    }

    const sold = stock - system;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const table = document
        .getElementById("inventoryTable")
        .getElementsByTagName("tbody")[0];

    const row = table.insertRow();

    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = stock;
    row.insertCell(2).innerText = system;
    row.insertCell(3).innerText = sold;
    row.insertCell(4).innerText = date;
    row.insertCell(5).innerText = time;

    // Highlight if something is wrong
    if (sold < 0) {
        row.classList.add("error");
    }

    clearInputs();
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("stockQty").value = "";
    document.getElementById("systemQty").value = "";
}