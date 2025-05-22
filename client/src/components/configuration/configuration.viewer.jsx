import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { copyToClipboard } from "../artisan/vinci";

const ConfigurationViewer = ({ configuration }) => {
    useEffect(() => {

    }, [configuration])
    return(
        <>
        <Container fluid>
        <Row>
            <Col size={5}>
                <p className="modal-neo-title modal-viewer-title">CONFIG ALIAS</p>
                {configuration.name ? <><p className="modal-view-neo-text  modal-viewer-text">{configuration.name}</p></> : <><p className="modal-view-neo-text  modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={4}>
                <p className="modal-neo-title modal-viewer-title">PROVIDER</p>
                {configuration.provider ? <><p className="modal-view-neo-text  modal-viewer-category">{configuration.provider}</p></> : <><p className="modal-view-neo-text  modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">CREATED BY</p>
                {configuration.createdBy ? <><p className="modal-view-neo-text  modal-viewer-boolean">{configuration.createdBy}</p></> : <><p className="modal-view-neo-text  modal-viewer-boolean">Not Provided</p></>}
            </Col>
        </Row> 
        <Row>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">API KEY <i onClick={() => copyToClipboard('API Key', configuration.key)} className="fa-regular fa-copy"></i></p>
                {configuration.key ? <><p className="modal-view-neo-text  modal-viewer-text">{configuration.key}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
        </Row>
         <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">RAG SOURCE URL <i onClick={() => copyToClipboard('RAG Source URL', configuration.sourceUrl)} className="fa-regular fa-copy"></i></p>
                {configuration.sourceUrl ? <><p className="modal-viewer-url">{configuration.sourceUrl}</p></> : <><p className="modal-viewer-url">Not Provided</p></>}
            </Col>
            <Col size={3}></Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">CREATED ON</p>
                <p className="modal-neo-date modal-viewer-date">{configuration.createdOn}</p>
            </Col>
        </Row> 
        </Container>
        </>
    )

}

ConfigurationViewer.propTypes = {
    configuration: PropTypes.object.isRequired
}

export default ConfigurationViewer;