function exportExcel() {
    const workbook = XLSX.utils.book_new();

    // Only one sheet for today for now
    const table = document.getElementById("inventoryTable");
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, ws, "Inventory_" + new Date().toLocaleDateString());

    XLSX.writeFile(workbook, "Inventory_Report.xlsx");
}