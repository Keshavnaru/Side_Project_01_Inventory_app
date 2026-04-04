function exportExcel() {
    if (typeof XLSX === "undefined") {
        alert("XLSX library not loaded!");
        return;
    }

    const wb = XLSX.utils.book_new();
    const todaySafe = new Date().toLocaleDateString().replace(/[\/\\\?\*\[\]]/g, "-");

    // 1️⃣ Full Inventory
    const table = document.getElementById("inventoryTable");
    const wsFull = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, wsFull, "Inventory_" + todaySafe);

    // 2️⃣ Discrepancies
    const discrepancyData = inventoryData
        .filter(item => item.stock !== item.system)
        .map(item => ({
            "Item Name": item.name,
            "Type": item.type,
            "In Stock": item.stock,
            "In System": item.system,
            "Sold": item.sold,
            "Date": item.date,
            "Time": item.time
        }));

    if (discrepancyData.length > 0) {
        const wsDiscrepancy = XLSX.utils.json_to_sheet(discrepancyData);
        XLSX.utils.book_append_sheet(wb, wsDiscrepancy, "Discrepancies_" + todaySafe);
    }

    // 3️⃣ Current Stock
    const currentStockData = inventoryData.map(item => ({
        "Item Name": item.name,
        "In System": item.system,
        "Sold": item.sold,
        "Current Stock": item.system - item.sold
    }));

    const wsCurrentStock = XLSX.utils.json_to_sheet(currentStockData);
    XLSX.utils.book_append_sheet(wb, wsCurrentStock, "CurrentStock_" + todaySafe);

    // Write file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Inventory_Report.xlsx";
    a.click();
    URL.revokeObjectURL(url);
}