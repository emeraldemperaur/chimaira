import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const QueryDelete = ({ query, toggleOpen, onDeleteFunc }) => {
    useEffect(() => {

    }, [query])
    return(
        <>
        <Container fluid>
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={12}>
                {query.name ? 
                <>
                <p className="neo-delete-content modal-viewer-text">
                    Are you sure you would like to delete the <a className="neo-delete-name">{query.name}</a> record from the database?
                </p>
                </> : 
                <>
                <p className="neo-delete-content modal-viewer-text">
                    Are you sure you would like to delete the model record from the database?
                </p>
                </>}
            </Col>
        </Row>
         <hr/>
         <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={3}>
                <div className="btn btn__modal" onClick={toggleOpen}><p className="neo-modal-button">CANCEL <i className="fa-solid fa-xmark"></i></p></div>
            </Col>
            <Col size={3}>
                <div className="btn btn__modal" onClick={() => onDeleteFunc(query)}><p className="neo-modal-button">DELETE <i className="fa-solid fa-trash"></i></p></div>
            </Col>
        </Row>
        </Container>
        </>
    )

}

QueryDelete.propTypes = {
    query: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    onDeleteFunc: PropTypes.func.isRequired
}

export default QueryDelete;