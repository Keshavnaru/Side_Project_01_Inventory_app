function exportExcel() {
    const workbook = XLSX.utils.book_new();

    const table = document.getElementById("inventoryTable");
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, ws, "Inventory_" + new Date().toLocaleDateString());

    XLSX.writeFile(workbook, "Inventory_Report.xlsx");
}