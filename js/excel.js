function exportExcel() {
    const table = document.getElementById("inventoryTable");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();

    // Fix: replace forbidden characters in date
    const todaySafe = new Date().toLocaleDateString().replace(/[\/\\\?\*\[\]]/g, "-");

    XLSX.utils.book_append_sheet(wb, ws, "Inventory_" + todaySafe);

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Inventory_Report.xlsx";
    a.click();
    URL.revokeObjectURL(url);
}