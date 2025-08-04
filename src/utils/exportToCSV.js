export const exportToCSV = (filename, headers, dataRows) => {
  if (!Array.isArray(dataRows) || dataRows.length === 0) {
    alert("No data to export.");
    return;
  }

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...dataRows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
