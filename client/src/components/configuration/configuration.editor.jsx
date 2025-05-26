import PropTypes from "prop-types";
import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ConfigurationEditor = ({ configuration, toggleOpen, handleSubmit, isEdit=false }) => {
    
    useEffect(() => {

    }, [configuration]);

    const validationSchema = Yup.object().shape({
                configurationname: Yup.string()
                    .max(50, 'Configuration name provided is too long')
                    .required('Required'),
                configurationprovider: Yup.string()
                    .required('Required'),
                configurationkey: Yup.string()
                    .required('Required'),
                configurationsourceurl: Yup.string()
                    .required('Required')
                })

    const onSubmitAction = (configuration) => {
        handleSubmit(configuration);
    }

    return(
        <>
         <Formik 
                initialValues={{ 
                configurationname: configuration.name, 
                configurationprovider: configuration.provider, 
                configurationkey: configuration.key,
                configurationsourceurl: configuration.sourceUrl }}
                
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                            configuration = { 
                                name: values.configurationname ? values.configurationname : document.getElementById("configurationname"),
                                provider: values.configurationprovider ? values.configurationprovider : document.getElementById("configurationprovider"),
                                key: values.configurationkey ? values.configurationkey : document.getElementById("configurationkey"),
                                sourceUrl: values.configurationsourceurl ? values.configurationsourceurl : document.getElementById("configurationsourceurl")
                            }
                            onSubmitAction(configuration)
                            console.log(`Submitted Configuration Profile Form: ${JSON.stringify(configuration)}`);
                       }}
                 >
                    {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                
            }) => (
                 <form onSubmit={handleSubmit}>
                <Container fluid>
                <Row>
                    <Col size={6}>
                        <p className="modal-neo-title modal-viewer-title">CONFIG ALIAS</p>
                        <input id='configurationname' style={{height: '50px'}} name='configurationname' type="text" className="form__input" 
                        onChange={handleChange} onBlur={handleBlur} value={values.configurationname} placeholder="Enter a configuration preset alias"/>
                        <a style={{color: '#8B0000'}} className="neo-form-error">{errors.configurationname && touched.configurationname && errors.configurationname}</a>
                    </Col>
                    <Col size={6}>
                        <p className="modal-neo-title modal-viewer-title">PROVIDER</p>
                        <Form.Select id="configurationprovider" name="configurationprovider" style={{marginLeft: '0px', width: '250px'}}
                        onChange={handleChange} onBlur={handleBlur} value={values.configurationprovider} className="form__input" size="lg">
                                                                <option key={0} value={''}>Select RAG source</option>
                                                                <option key={1} value={'Open AI'}>Open AI</option>
                                                                <option key={2} value={'Anthropic'}>Anthropic</option>
                                                                <option key={3} value={'xAI'}>xAI</option>
                                                                <option key={4} value={'IBM watsonx™'}>IBM watsonx™</option>
                                                                <option key={5} value={'Deep Seek'}>Deep Seek</option>
                                                                <option key={6} value={'N8N'}>N8N</option>
                                                                <option key={7} value={'Github Models'}>Github Models</option>
                                                                <option key={8} value={'Edge RAG Source'}>Edge Server</option>
                        </Form.Select>
                        <a style={{color: '#8B0000'}} className="neo-form-error">{errors.configurationprovider && touched.configurationprovider && errors.configurationprovider}</a>
                    </Col>
                </Row> 
                <Row>
                    <Col size={12}>
                        <p className="modal-neo-title modal-viewer-title">API KEY</p>
                        <input id='configurationkey' style={{height: '50px'}} name='configurationkey' type="text" className="form__input" 
                        onChange={handleChange} onBlur={handleBlur} value={values.configurationkey} placeholder="Enter a RAG source api key"/>
                        <a style={{color: '#8B0000'}} className="neo-form-error">{errors.configurationkey && touched.configurationkey && errors.configurationkey}</a>
                    </Col>
                </Row>
                <Row>
                    <Col size={6}>
                        <p className="modal-neo-title modal-viewer-title">RAG SOURCE URL</p>
                        <input id='configurationsourceurl' style={{height: '50px'}} name='configurationsourceurl' type="text" className="form__input" 
                        onChange={handleChange} onBlur={handleBlur} value={values.configurationsourceurl} placeholder="Enter a RAG source url"/>
                        <a style={{color: '#8B0000'}} className="neo-form-error">{errors.configurationsourceurl && touched.configurationsourceurl && errors.configurationsourceurl}</a>
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
                                        <button style={{backgroundColor: 'transparent', border: 'unset'}} width="max-content" type="submit"><div className="btn btn__modal">
                                             {isEdit == true ? 
                                                <><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></>
                                                : 
                                                <><p className="neo-modal-button">CREATE <i className="fa-solid fa-plus"></i></p></>}
                                            </div></button>
                                    </Col>
                </Row>
            </Container>

            </form>
            )}
        </Formik>
        </>
    )

}

ConfigurationEditor.propTypes = {
    configuration: PropTypes.object,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool
}

export default ConfigurationEditor;