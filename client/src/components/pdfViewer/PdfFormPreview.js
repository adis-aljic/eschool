import { useRef, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import PSPDFKit from "pspdfkit"
// import file from "https://cdn.filestackcontent.com/gRFZaOdnRtewMBprTRa4"
const PdfFormPreview = (props) => {
  const containerRef = useRef(null);

    // const { pdfUrl, formData } = props.obj
    useEffect(() => {
      const loadPdf = async () => {
        const instance = await PSPDFKit.load({
          container: containerRef.current,
          document: "https://cdn.filestackcontent.com/gRFZaOdnRtewMBprTRa4",
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
        });
    //    await instance.setFormFieldValue(JSON.stringify(props.formData));
           instance.getFormFields()
    // then(() => {
          
         instance.setFormFieldValues(props.formData);
    //   });
        // Fill the form fields with data from the formData object
        // Object.entries(props.formData).forEach(([fieldName, fieldValue]) => {
            // console.log(fieldName, fieldValue);
        // });
      };
      const unload = PSPDFKit.unload(containerRef.current);
  
      loadPdf();
      
      return () => unload

    }, [ props.formData]);
    
    // problem with clean up use effect

    return (
    <>
    <div ref={containerRef}  style={{ width: "100%", height: "100vh"}} />;
    <Button  onClick={props.onClick}>Close</Button>

    </>)
  };
  
  export default PdfFormPreview