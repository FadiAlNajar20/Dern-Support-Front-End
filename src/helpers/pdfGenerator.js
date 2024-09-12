// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async (chartElements) => {
  const doc = new jsPDF();
  
  for (let i = 0; i < chartElements.length; i++) {
    const chart = chartElements[i];
    const canvas = await html2canvas(chart);
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 180, 160); 
    if (i < chartElements.length - 1) {
      doc.addPage();
    }
  }

  doc.save('dashboard-report.pdf');
};

export default generatePDF;