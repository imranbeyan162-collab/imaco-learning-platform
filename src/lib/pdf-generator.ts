import { jsPDF } from 'jspdf';

export interface CertificateData {
  verificationCode: string;
  recipientName: string;
  courseTitle: string;
  completionDate: string;
  issuerName?: string;
  issuerTitle?: string;
  grade?: string;
}

export function generateCertificatePDF(data: CertificateData) {
  // Landscape A4 certificate
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210mm

  // Background gradient fill
  doc.setFillColor(7, 11, 20); // #070B14
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer Border (Gold/Blue double borders)
  doc.setDrawColor(37, 99, 235); // #2563EB
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setDrawColor(245, 158, 11); // Gold #F59E0B
  doc.setLineWidth(0.75);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // Corner decorative marks
  doc.setFillColor(245, 158, 11);
  doc.circle(13, 13, 2, 'F');
  doc.circle(pageWidth - 13, 13, 2, 'F');
  doc.circle(13, pageHeight - 13, 2, 'F');
  doc.circle(pageWidth - 13, pageHeight - 13, 2, 'F');

  // Header Brand
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('IMACO ACADEMY • DIGITAL AGENCY TALENT LAUNCHPAD', pageWidth / 2, 28, { align: 'center' });

  // Main Certificate Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 44, { align: 'center' });

  doc.setTextColor(148, 163, 184); // Slate 400
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('THIS IS PROUDLY CONFERRED UPON', pageWidth / 2, 54, { align: 'center' });

  // Student Name
  doc.setTextColor(96, 165, 250); // Blue 400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text(data.recipientName, pageWidth / 2, 70, { align: 'center' });

  // Underline beneath student name
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 60, 74, pageWidth / 2 + 60, 74);

  // Achievement narrative
  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('for successfully mastering the rigorous curriculum and practical agency projects in', pageWidth / 2, 84, { align: 'center' });

  // Course Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(data.courseTitle, pageWidth / 2, 96, { align: 'center' });

  // Grade / Honors
  if (data.grade) {
    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Classification: ${data.grade}`, pageWidth / 2, 106, { align: 'center' });
  }

  // Description / Agency endorsement
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  const narrative = 'This credential certifies practical competence, industry-standard execution, and readiness for enterprise client marketing & technical operations.';
  doc.text(narrative, pageWidth / 2, 118, { align: 'center', maxWidth: 220 });

  // Divider
  doc.setDrawColor(30, 45, 74);
  doc.setLineWidth(0.5);
  doc.line(30, 132, pageWidth - 30, 132);

  // Date and Verification Info (Left / Center)
  const formattedDate = new Date(data.completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Date of Issuance: ${formattedDate}`, 35, 145);
  doc.text(`Verification Code: ${data.verificationCode}`, 35, 152);
  doc.setTextColor(59, 130, 246);
  doc.text('Verify Online at: imacoacademy.com/verify', 35, 159);

  // Signatures of Founders (Right side)
  // Imran
  doc.setDrawColor(148, 163, 184);
  doc.line(145, 165, 195, 165);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Imran Mohammedbeyan', 170, 171, { align: 'center' });
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Co-Founder & Growth Lead', 170, 176, { align: 'center' });

  // Mikiyas
  doc.line(215, 165, 265, 165);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Mikiyas Alemu', 240, 171, { align: 'center' });
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Co-Founder & Operations Lead', 240, 176, { align: 'center' });

  // Official Seal Emblem in Bottom Left Center
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.8);
  doc.circle(pageWidth / 2 - 40, 158, 10);
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('IMACO', pageWidth / 2 - 40, 156, { align: 'center' });
  doc.text('SEAL OF EXCELLENCE', pageWidth / 2 - 40, 160, { align: 'center' });

  // Save the document
  const fileName = `Imaco-Certificate-${data.recipientName.replace(/\s+/g, '-')}-${data.verificationCode}.pdf`;
  doc.save(fileName);
}
