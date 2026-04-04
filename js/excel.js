function exportExcel() {
    const table = document.getElementById("inventoryTable");

    const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Inventory Report"
    });

    XLSX.writeFile(workbook, "Inventory_Report.xlsx");
}