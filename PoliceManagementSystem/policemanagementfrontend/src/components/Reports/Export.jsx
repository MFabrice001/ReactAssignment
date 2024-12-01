import React from "react";
import api from "../../services/api";

const Export = () => {
  const handleExport = async (format) => {
    try {
      const response = await api.get(`/export?format=${format}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `export.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Failed to export data.");
    }
  };

  return (
    <div>
      <h1>Export Data</h1>
      <button onClick={() => handleExport("csv")}>Export as CSV</button>
      <button onClick={() => handleExport("pdf")}>Export as PDF</button>
    </div>
  );
};

export default Export;
