import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFtoText() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfText, setPdfText] = useState('');

    function onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const typedArray = new Uint8Array(reader.result);
            const pdf = await pdfjs.getDocument({ data: typedArray }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join('');
                fullText += pageText + '\n';
            }
            setPdfText(fullText);
            setNumPages(pdf.numPages);
        };

        reader.readAsArrayBuffer(file);
    }

    function onPageChange(page) {
        setPageNumber(page);
    }

    function handleDownload() {
        const element = document.createElement("a");
        const file = new Blob([pdfText], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
    
        // Extracting filename from the file input
        const fileInput = document.querySelector('input[type="file"]');
        const fileName = fileInput.files[0].name;
        
        // Use PDF file name for the downloaded text file
        element.download = fileName.replace(/\.[^/.]+$/, "") + ".txt";
        
        document.body.appendChild(element); // Required for this to work in Firefox
        element.click();
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className="pdf-reader-container">
                    <h2 className='text-center' style={{fontFamily : "cursive", borderBottom:'1px solid', paddingBottom: "4px"}}>PDF Reader</h2>
                    <div className='col-sm-4 mt-4'>
                        <div className="file-input-container shadow">
                            <input type="file" className='form-control' onChange={onFileChange} />
                        </div>
                    </div><br />
                    {numPages && (
                        <p className="page-info">
                            Page {pageNumber} of {numPages}
                        </p>
                    )}
                    <div className="pdf-container">
                        <Document
                            file={null} 
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            className="pdf-document"
                        >
                            <Page
                                pageNumber={pageNumber}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                className="pdf-page"
                            />
                        </Document>
                    </div>
                </div>
                <div className='mt-4'>
                    {pdfText && (
                        <div className="text-container">
                            <h4 style={{fontFamily : "cursive"}}>Extracted Text:</h4>
                            <textarea
                                className="extracted-text"
                                rows="10"
                                value={pdfText}
                                readOnly
                                style={{width: '100%', padding: '8px'}}
                            />
                            <button className='btn btn-success' onClick={handleDownload}>Download Text</button>
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default PDFtoText;
