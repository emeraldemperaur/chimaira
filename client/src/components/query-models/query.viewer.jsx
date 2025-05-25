import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const QueryViewer = ({ query }) => {
    useEffect(() => {

    }, [query])
    return(
        <>
        <Container >
        <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">MODEL NAME</p>
                {query.name ? <><p className="modal-view-neo-text modal-viewer-text">{query.name}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">TYPE</p>
                {query.type ? <><p className="modal-view-neo-text modal-viewer-category">{query.type}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">TAGS</p>
                {query.tags.length > 0 ? 
                <>
                    <div style={{float: 'none'}} className="neo-checkbox">
                                <div className="neo-checkbox__1">
                                    <input id="heuristictag" name="heuristictag" type="checkbox" disabled
                                    checked={query.tags[0]} value={query.tags[0]}/>
                                    <label htmlFor="heuristictag">
                                    <i className="fa-brands fa-mandalorian"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="mediatag" name="mediatag" type="checkbox"
                                    checked={query.tags[1]} value={query.tags[1]}/>
                                    <label htmlFor="mediatag">
                                    <i className="fa-solid fa-icons"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="codetag" name="codetag"  type="checkbox"
                                    checked={query.tags[2]} value={query.tags[2]}/>
                                    <label htmlFor="codetag">
                                    <i className="fa-solid fa-code"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="mechatag" name="mechatag" type="checkbox"
                                    checked={query.tags[3]} value={query.tags[3]}/>
                                    <label htmlFor="mechatag">
                                    <i className="fa-solid fa-robot"></i></label>
                                </div>
                            </div>
                </> 
                : 
                <><p className="modal-viewer-boolean">No Tags Found</p></>}
            </Col>
        </Row> 
        <Row style={{marginTop: '3px', marginBottom: '3px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">CREATED ON</p>
                {query.createdOn ? <><p className="modal-neo-date modal-viewer-date">{new Date(query.createdOn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
        </Row>
        {query.isEdited ? 
        <>
        <Row style={{marginTop: '2px', marginBottom: '2px'}}>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">EDITED</p>
                {query.isEdited == true ? <><p className="modal-view-neo-text modal-viewer-boolean">YES</p></> : <><p className="modal-viewer-boolean">NO</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">EDITED BY</p>
                 {query.editedBy ? <><p className="modal-view-neo-text model-viewer-editby">{query.editedBy}</p></> : <><p className="model-viewer-editby">Not Provided</p></>}
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">EDITED ON</p>
                <p className="modal-neo-date modal-viewer-date">{new Date(query.editedOn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
            </Col>
        </Row> 
        </> 
        : 
        <></>}
        {query.jsonQueryDefinition ? 
        <>
        <Row style={{marginTop: '3px', marginBottom: '3px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">QUERY DEFINITION</p>
                <textarea id="jsonQueyDefinitionViewer" className="neo-card-fill" disabled style={{height: 'fit-content !important', marginRight: '13px !important'}} value={query.jsonQueryDefinition}/>
            </Col>
        </Row>
        </>
        : <></>} 
        </Container>
        </>
    )

}

QueryViewer.propTypes = {
    query: PropTypes.object.isRequired
}

export default QueryViewer;