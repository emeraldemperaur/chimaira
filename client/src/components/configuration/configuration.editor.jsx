import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';

const ConfigurationEditor = ({ configuration, toggleOpen, handleSubmit }) => {
    const [ configurationName, setConfigurationName] = useState(configuration.name);
    
    useEffect(() => {

    }, [configuration]);

    const onSubmitAction = (configuration) => {
        handleSubmit(configuration);
    }

    const fetchConfigurationName = (event) => {
        setConfigurationName(event.target.value);
        configuration.name = configurationName;
        console.log(`Configuration Name: ${configuration.name}`);
    }

    return(
        <>
        <Container fluid>
        <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">CONFIG ALIAS</p>
                <input id='configuration-name' style={{height: '50px'}} name='configuration-name' type="text" className="form__input" onChange={fetchConfigurationName}
                     value={configurationName} placeholder="Enter a configuration preset alias"/>
            </Col>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">PROVIDER</p>
                <Form.Select id="configuration-provider" name="configuration-provider" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                                                        <option>Select RAG source</option>
                                                        <option>Large select 1</option>
                                                        <option>Large select 2</option>
                                                    </Form.Select>
            </Col>
        </Row> 
        <Row>
            <Col size={12}>
                <p className="modal-neo-title modal-viewer-title">API KEY</p>
                <input id='configuration-key' style={{height: '50px'}} name='configuration-key' type="text" className="form__input" onChange={fetchConfigurationName}
                     value={configurationName} placeholder="Enter a RAG source api key"/>
            </Col>
        </Row>
         <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">RAG SOURCE URL</p>
                <input id='configuration-source-url' style={{height: '50px'}} name='configuration-source-url' type="text" className="form__input" onChange={fetchConfigurationName}
                     value={configurationName} placeholder="Enter a RAG source url"/>
            </Col>
            <Col size={3}></Col>
            <Col size={3}>
            </Col>
        </Row> 
        <hr/>
                 <Row style={{marginTop: '13px', marginBottom: '13px'}}>
                            <Col size={3}>
                                <div className="btn btn__modal" onClick={toggleOpen}><p className="neo-modal-button">CANCEL <i className="fa-solid fa-xmark"></i></p></div>
                            </Col>
                            <Col size={3}>
                                <div className="btn btn__modal" onClick={() => onSubmitAction(configuration)}><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                            </Col>
                </Row>
        </Container>
        </>
    )

}

ConfigurationEditor.propTypes = {
    configuration: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default ConfigurationEditor;