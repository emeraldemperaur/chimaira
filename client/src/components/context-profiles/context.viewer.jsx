import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const ContextViewer = ({ context }) => {
    useEffect(() => {

    }, [context])
    return(
        <>
        <Container fluid>
        <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">CONTEXT NAME</p>
                {context.name ? <><p className="modal-view-neo-text modal-viewer-text">{context.name}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">CATEGORY</p>
                {context.category ? <><p className="modal-view-neo-text modal-viewer-category">{context.category}</p></> : <><p className="modal-view-neo-text modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">QUERY CMD</p>
                {context.isQueryCommand == true ? <><p className="modal-view-neo-text modal-viewer-boolean">Yes</p></> : <><p className="modal-view-neo-text modal-viewer-boolean">No</p></>}
            </Col>
        </Row> 
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">PROLOGUE</p>
                {context.prologue ? <><p className="modal-viewer-text">{context.prologue}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
        </Row>
         <Row>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">DOCUMENT URL</p>
                {context.documentUrl ? <><p className="modal-viewer-url">{context.documentUrl}</p></> : <><p className="modal-viewer-url">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">TARGET URL</p>
                 {context.targetUrl ? <><p className="modal-viewer-url">{context.targetUrl}</p></> : <><p className="modal-viewer-url">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">CREATED ON</p>
                <p className="modal-neo-date modal-viewer-date">{context.createdOn}</p>
            </Col>
        </Row> 
        {context.codeSnippet ? 
        <>
        <Row>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">CODE SNIPPET</p>
                <textarea width={'100%'}>{context.codeSnippet}</textarea>
            </Col>
        </Row>
        </>
        : <></>} 
        </Container>
        </>
    )

}

ContextViewer.propTypes = {
    context: PropTypes.object.isRequired
}

export default ContextViewer;