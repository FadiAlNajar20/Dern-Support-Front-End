import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDFReprots = async (chartElements) => {
  const doc = new jsPDF('p', 'mm', 'a4');

  for (let i = 0; i < chartElements.length; i++) {
    const chart = chartElements[i];
    const canvas = await html2canvas(chart);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    doc.addImage(imgData, 'PNG', 10, 10, imgWidth - 20, imgHeight); 
    if (i < chartElements.length - 1) {
      doc.addPage();
    }
  }

  doc.save('dashboard-report.pdf');
};

export default generatePDFReprots;
