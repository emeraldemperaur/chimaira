import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';

const QueryEditor = ({ query, toggleOpen, handleSubmit }) => {
    const [ type, setType ] = useState(query.type);
    const [ isQCMD, setIsQCMD ] = useState(false);
    const [ queryName, setQueryName] = useState(query.name);

    useEffect(() => {

    }, [query, type, isQCMD])

     const onSubmitAction = (query) => {
        setType(query.type);
        setIsQCMD(!isQCMD);
        handleSubmit(query);
    }

    const fetchModelName = (event) => {
        setQueryName(event.target.value);
        query.name = queryName;
        console.log(`Query Model Name: ${query.name}`);
    }

    return(
        <>
        <Container >
        <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">MODEL NAME</p>
                <input id='model-name' style={{height: '50px'}} name='model-name' type="text" className="form__input" onChange={fetchModelName}
                     value={queryName} placeholder="Enter a context profile name"/>
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">TYPE</p>
                <Form.Select id="context-category" name="context-category" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                                                        <option>Select Type</option>
                                                        <option>Context Query</option>
                                                        <option>Query CMD</option>
                                                    </Form.Select>
            </Col>
        </Row> 
        <Row>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">TAGS</p>
                <div style={{float: 'left'}} className="neo-checkbox">
                    <div className="neo-checkbox__1">
                        <input id="neo-checkbox-1" type="checkbox"/>
                        <label htmlFor="neo-checkbox-1">
                        <i className="fa-brands fa-mandalorian"></i></label>
                    </div>
                    <div className="neo-checkbox__2">
                        <input id="neo-checkbox-2" type="checkbox"/>
                        <label htmlFor="neo-checkbox-2">
                        <i className="fa-solid fa-icons"></i></label>
                    </div>
                    <div className="neo-checkbox__2">
                        <input id="neo-checkbox-3" type="checkbox"/>
                        <label htmlFor="neo-checkbox-3">
                        <i className="fa-solid fa-code"></i></label>
                    </div>
                    <div className="neo-checkbox__2">
                        <input id="neo-checkbox-4" type="checkbox"/>
                        <label htmlFor="neo-checkbox-4">
                        <i className="fa-solid fa-robot"></i></label>
                    </div>
                </div>
            </Col>
        </Row>
        {query.jsonQueryDefinition ? 
        <>
        <Row style={{marginTop: '3px', marginBottom: '3px'}}>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">QUERY DEFINITION</p>
                <textarea id="query-jsondefinition" name="query-jsondefinition" className="form__input neo-card-fill" style={{height: 'fit-content !important', marginRight: '13px !important'}} onChange={fetchModelName} value={queryName}/>
            </Col>
        </Row>
        </>
        : <></>} 
        <hr/>
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
                <Col size={3}>
                        <div className="btn btn__modal" onClick={toggleOpen}><p className="neo-modal-button">CANCEL <i className="fa-solid fa-xmark"></i></p></div>
                </Col>
                <Col size={3}>
                        <div className="btn btn__modal" onClick={() => onSubmitAction(query)}><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                </Col>
        </Row>
        </Container>
        </>
    )

}

QueryEditor.propTypes = {
    query: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default QueryEditor;