import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import '../artisan/neo.toggle.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import FormLabel from "react-bootstrap/esm/FormLabel";


const ChimeraConsole = ({ multiline }) => {
    const [inputHeight, setInputHeight] = useState('4rem');
    const [clientInput, setClientInput] = useState('');

    useEffect(() => {
        if(multiline) setInputHeight('4rem');
        if(!multiline) setInputHeight('4rem')
    }, [multiline]);

    const inputEvents = (event) => { setClientInput(event.target.value); }



    return(
        <>
        <Row id='mecha'>
            <Col size={6}>
                {multiline ? 
                <>
                <textarea id='mechatron-input' style={{paddingTop: '9px'}} rows="4" className="form__input" onChange={inputEvents}
                value={clientInput} placeholder="Enter prompt or query request..."/>
                </>
                :
                <>
                    <input id='mechatron-input' style={{height: inputHeight}} type="text" className="form__input" onChange={inputEvents}
                     value={clientInput} placeholder="Enter prompt or query request..."/>
                </>
                }
                
            </Col>
             <Col size={2}>
                <div className="btn btn__secondary"><p>RAG <i className="fa-solid fa-microchip"></i></p></div>
            </Col>
            <Col size={4}>
                <p className="console-agent">Artificer</p>
                
                <Col style={{marginBottom: '6px'}} size={6}>
                    <Form.Select id="select-context-profile" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                        <option>Context Profile Select</option>
                        <option>Large select 1</option>
                        <option>Large select 2</option>
                    </Form.Select>
                     <FormLabel className="neo-toggle-title" htmlFor="select-context-profile">Context</FormLabel>
                </Col>
                <Col size={6}>
                    <Form.Select id="select-query-model" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                        <option>Query Model Select</option>
                        <option>Large select 1</option>
                        <option>Large select 2</option>
                    </Form.Select>
                    <FormLabel className="neo-toggle-title" htmlFor="select-query-model">Query Model</FormLabel>
                </Col>
            </Col>
        </Row>
        </>
    )

}

ChimeraConsole.propTypes = {
    multiline: PropTypes.bool.isRequired
}

export default ChimeraConsole;