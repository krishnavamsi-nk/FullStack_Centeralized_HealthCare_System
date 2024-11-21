import styles from "./DownloadPdf.module.css"
const DownloadPDFButton = ({ id }) => {
    const handleDownloadPDF = async () => {
        try {
            console.log(id);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/patients/medicalrecord/${id}`, {
                credentials: 'include',
                method: 'GET'
            });
            const pdfBlob = await response.blob();
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'MedicalRecord.pdf';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };
    return (
        <div>
            <button onClick={handleDownloadPDF} className={styles.btn}>Download PDF</button>
        </div>
    );
};

export default DownloadPDFButton;