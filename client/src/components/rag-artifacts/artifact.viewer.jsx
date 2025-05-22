import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const ArtifactViewer = ({ artifact }) => {
    useEffect(() => {

    }, [artifact])
    return(
        <>
        <Container >
        <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">AGENT NAME</p>
                {artifact.name ? <><p className="modal-view-neo-text modal-viewer-text">{artifact.name}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">CONTEXT</p>
                {artifact.context ? <><p className="modal-viewer-category">{artifact.context}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">QUERY MODEL</p>
                {artifact.query  ? 
                <>
                  <p className="modal-viewer-category">{artifact.query}</p>
                </> 
                : 
                <><p className="modal-viewer-text">No Model Specified</p></>}
            </Col>
        </Row> 
        <Row style={{marginTop: '13px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">SYNOPSIS</p>
                {artifact.synopsis ? <><p className="modal-viewer-text">{artifact.synopsis}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
        </Row>
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">RESPONSE</p>
                {artifact.response ? <><p className="modal-viewer-text">{artifact.response}</p></> : <><p className="modal-viewer-boolean">No RAG Response Found</p></>}
            </Col>
        </Row> 
        <hr/>
        <Row>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">MEMENTOS</p>
                {artifact.mementos.length > 0 ? <><p className="modal-viewer-text">{artifact.mementos}</p></> : <><p className="modal-viewer-boolean">No RAG Mementos Found</p></>}

            </Col>
        </Row> 
        </Container>
        </>
    )

}

ArtifactViewer.propTypes = {
    artifact: PropTypes.object.isRequired
}

export default ArtifactViewer;