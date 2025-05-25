import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import '../artisan/neo.toggle.css'
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import FormLabel from "react-bootstrap/esm/FormLabel";


const ChimeraConsole = ({ multiline, contextProfiles, queryModels }) => {
    const [inputHeight, setInputHeight] = useState('4rem');
    const [clientInput, setClientInput] = useState('');
    const [agentName] = useState('');
    const [agentId] = useState(parseInt(localStorage.getItem("active-agent")));

    useEffect(() => {
        if(multiline) setInputHeight('4rem');
        if(!multiline) setInputHeight('4rem');
    }, [multiline, agentName]);

    const inputEvents = (event) => { setClientInput(event.target.value); }

    return(
        <>
        <Row id='mecha'>
            <Col size={5}>
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
            <Col size={5}>
                <p className="console-agent" id="console-agent" key={agentId}></p>
                
                <Col style={{marginBottom: '6px'}} size={6}>
                    <Form.Select id="select-context-profile" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                        <option key={0} value={''}>Select Context Profile</option>
                        { contextProfiles.map( context => (
                                                <option  key={context.id} value={context.id}>{context.name}</option>
                                                ) )}
                    </Form.Select>
                     <FormLabel className="neo-toggle-title" htmlFor="select-context-profile">Context</FormLabel>
                </Col>
                <Col size={6}>
                    <Form.Select id="select-query-model" style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                        <option key={0} value={''}>Select Query Model</option>
                        { queryModels.map( query => (
                                                <option  key={query.id} value={query.id}>{query.name}</option>
                                                ) )}
                        
                    </Form.Select>
                    <FormLabel className="neo-toggle-title" htmlFor="select-query-model">Query Model</FormLabel>
                </Col>
            </Col>
        </Row>
        </>
    )

}

ChimeraConsole.propTypes = {
    multiline: PropTypes.bool.isRequired,
    contextProfiles: PropTypes.array.isRequired,
    queryModels: PropTypes.array.isRequired
}

export default ChimeraConsole;