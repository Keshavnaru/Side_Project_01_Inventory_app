function exportExcel() {
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(logs);
    XLSX.utils.book_append_sheet(wb, ws, "All Logs");

    XLSX.writeFile(wb, "Inventory_Full_Log.xlsx");
}