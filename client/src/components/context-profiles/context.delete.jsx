import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const ContextDelete = ({ context, toggleOpen, onDeleteFunc }) => {
    useEffect(() => {

    }, [context])
    return(
        <>
        <Container fluid>
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={12}>
                {context.name ? 
                <>
                <p className="neo-delete-content modal-viewer-text">
                    Are you sure you would like to delete the <a className="neo-delete-name">{context.name}</a> record from the database?
                </p>
                </> : 
                <>
                <p className="neo-delete-content modal-viewer-text">
                    Are you sure you would like to delete the profile record from the database?
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
                <div className="btn btn__modal" onClick={() => onDeleteFunc(context)}><p className="neo-modal-button">DELETE <i className="fa-solid fa-trash"></i></p></div>
            </Col>
        </Row>
        </Container>
        </>
    )

}

ContextDelete.propTypes = {
    context: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    onDeleteFunc: PropTypes.func.isRequired
}

export default ContextDelete;