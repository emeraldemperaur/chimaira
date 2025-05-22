import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';

const ContextEditor = ({ context, toggleOpen, handleSubmit }) => {
    const [ category, setCategory ] = useState(context.category);
    const [ isQCMD, setIsQCMD ] = useState(false);
    const [ contextName, setContextName] = useState(context.name);
    useEffect(() => {

    }, [context, category, isQCMD]);

   

    const onSubmitAction = (context) => {
        setCategory(context.category);
        setIsQCMD(context.isQueryCommand);
        handleSubmit(context);
    }
    const fetchContextName = (event) => {
        setContextName(event.target.value);
        context.name = contextName;
        console.log(`Context Name: ${context.name}`);
    }
    return(
        <>
        <Container fluid>
        <Row>
            <Col size={5}>
                <p className="modal-neo-title modal-viewer-title">CONTEXT NAME</p>
                 <input id='context-name' style={{height: '50px'}} name='context-name' type="text" className="form__input" onChange={fetchContextName}
                     value={contextName} placeholder="Enter a context profile name"/>
            </Col>
            <Col size={4}>
                <p className="modal-neo-title modal-viewer-title">CATEGORY</p>
                <Form.Select id="context-category" name="context-category" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                                        <option>Select Category</option>
                                        <option>Large select 1</option>
                                        <option>Large select 2</option>
                                    </Form.Select>
            </Col>
            <Col size={3}>
                <p className="modal-neo-title modal-viewer-title">QUERY CMD</p>
                <label className="label">
                    <div className="toggle">
                    <input id="stackedMode" className="toggle-state" type="checkbox" name="check" value={isQCMD} onClick={()=> setIsQCMD(!isQCMD)} />
                    <div className="indicator"></div>
                    </div>
                    <div className="label-text"><i style={{color: '#999'}}  className="fa-solid fa-terminal"></i></div>
                </label>
            </Col>
        </Row> 
        <Row style={{marginTop: '13px', marginBottom: '13px'}}>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">PROLOGUE</p>
                <textarea id='context-prologue' name='context-prologue' style={{paddingTop: '9px', width: '666px', marginRight: '13px'}} rows="2" className="form__input" onChange={fetchContextName}
                value={contextName} placeholder="Enter a prologue or context summary..."/>
                {context.prologue ? <><p className="modal-viewer-text">{context.prologue}</p></> : <><p className="modal-viewer-text">Not Provided</p></>}
            </Col>
            <Col size={6}>
                {isQCMD ? 
                <>
                <Row>
                    <Col size={12}>
                    <p className="modal-neo-title modal-viewer-title">{`QUERY COMMAND`}</p>
                    <Form.Select id="context-query-model" name="context-query-model" style={{marginLeft: '0px', width: '400px'}} className="form__input" size="lg">
                                                <option>Select Query Command</option>
                                                <option>Large select 1</option>
                                                <option>Large select 2</option>
                    </Form.Select>
                    </Col>
                </Row>
                </>
                : 
                <></>}
            </Col>
        </Row>
         <Row>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">DOCUMENT URL</p>
                <input id='context-document-url' style={{height: '50px', width: '500px'}} name='context-document-url' type="text" className="form__input" onChange={fetchContextName}
                     value={contextName} placeholder="Enter a document source url"/>
            </Col>
            <Col size={6}>
                <p className="modal-neo-title modal-viewer-title">TARGET URL</p>
                <input id='context-target-url' style={{height: '50px', width: '500px'}} name='context-target-url' type="text" className="form__input" onChange={fetchContextName}
                     value={contextName} placeholder="Enter a target source url"/>
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
        <hr/>
         <Row style={{marginTop: '13px', marginBottom: '13px'}}>
                    <Col size={3}>
                        <div className="btn btn__modal" onClick={toggleOpen}><p className="neo-modal-button">CANCEL <i className="fa-solid fa-xmark"></i></p></div>
                    </Col>
                    <Col size={3}>
                        <div className="btn btn__modal" onClick={() => onSubmitAction(context)}><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                    </Col>
        </Row>
        </Container>
        </>
    )

}

ContextEditor.propTypes = {
    context: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default ContextEditor;