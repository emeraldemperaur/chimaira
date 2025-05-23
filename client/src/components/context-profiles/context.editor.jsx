import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getDateTime } from "../../utils/chronometer";

const ContextEditor = ({ context, toggleOpen, handleSubmit }) => {
    const [ isQCMD, setIsQCMD ] = useState(false);
    let validationSchemaObject;
   
    useEffect(() => {

    }, [context, context.id, isQCMD]);

    const contextSchema = (isQCMD) => {
        if (!isQCMD){
            validationSchemaObject = Yup.object().shape({
        contextname: Yup.string()
            .max(50, 'Context name provided is too long')
            .required('Required'),
        contextcategory: Yup.string()
            .required('Required'),
        contextprologue: Yup.string()
            .min(2, 'Context prologue provided is too brief')
            .max(1000, 'Context prologue provided is too broad')
            .required('Required')
        })
        }
        else {
            validationSchemaObject = Yup.object().shape({
        contextname: Yup.string()
            .max(50, 'Context name provided is too long')
            .required('Required'),
        contextcategory: Yup.string()
            .required('Required'),
        contextquerymodel: Yup.string()
            .required('Required'),
        contextprologue: Yup.string()
            .min(2, 'Context prologue provided is too brief')
            .max(1000, 'Context prologue provided is too broad')
            .required('Required')
        })
        }
        return validationSchemaObject;
    }
 
   
    const onSubmitAction = (context) => {
        handleSubmit(context);
    }
   
    return(
        <>
        <Formik 
        initialValues={{ contextname: context.name, contextcategory: context.category, 
        isquerycmd: context.isQueryCommand, contextprologue: context.prologue, contextquerymodel: context.queryCommand,
        contextdocumenturl: context.documentUrl, contexttargeturl: context.targetUrl, contextcodesnippet: context.codeSnippet }}

        validationSchema={contextSchema(isQCMD)}
        onSubmit={ (values) => {
            context = { 
                id: context.id || undefined,
                name: values.contextname,
                category: values.category,
                prologue: values.contextprologue,
                isQueryCommand: values.isquerycmd,
                queryCommand: values.contextquerymodel,
                documentUrl: values.contextdocumenturl,
                targetUrl: values.contexttargeturl,
                codeSnippet: values.contextcodesnippet,
                createdOn: context.createdOn || getDateTime(),
            }
            onSubmitAction(context)
            console.log(`Submitted Context Form: ${JSON.stringify(context)}`);
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
                    <Col size={5}>
                        <p className="modal-neo-title modal-viewer-title">CONTEXT NAME</p>
                        <input id='contextname' style={{height: '50px'}} name='contextname' type="text" className="form__input" onChange={handleChange}
                        onBlur={handleBlur} value={values.contextname} placeholder="Enter a context profile name"/>
                        <a className="neo-form-error">{errors.contextname && touched.contextname && errors.contextname}</a>
                    </Col>
                    <Col size={4}>
                        <p className="modal-neo-title modal-viewer-title">CATEGORY</p>
                        <Form.Select id="contextcategory" name="contextcategory" onChange={handleChange}
                        onBlur={handleBlur} value={values.contextcategory} style={{marginLeft: '0px', width: '250px'}} className="form__input" size="lg">
                                                <option>Select Category</option>
                                                <option>Large select 1</option>
                                                <option>Large select 2</option>
                        </Form.Select>
                        <a className="neo-form-error">{errors.contextcategory && touched.contextcategory && errors.contextcategory}</a>
                    </Col>
                    <Col size={3}>
                        <p className="modal-neo-title modal-viewer-title">QUERY CMD</p>
                        <label className="label">
                            <div className="toggle">
                            <input id="isquerycmd" className="toggle-state" type="checkbox" name="isquerycmd"
                            onBlur={handleBlur} value={values.isquerycmd} onChange={handleChange} onClick={()=> setIsQCMD(!isQCMD)} />
                            <div className="indicator"></div>
                            </div>
                            <div className="label-text"><i style={{color: '#999'}}  className="fa-solid fa-terminal"></i></div>
                        </label>
                    </Col>
                </Row> 
                <Row style={{marginTop: '13px', marginBottom: '13px'}}>
                    <Col size={6}>
                        <p className="modal-neo-title modal-viewer-title">PROLOGUE</p>
                        <textarea id='contextprologue' name='contextprologue' style={{paddingTop: '9px', width: '666px', marginRight: '13px'}} rows="2" className="form__input" onChange={handleChange}
                        value={values.contextprologue} onBlur={handleBlur}  placeholder="Enter a prologue or context summary..."/>
                        <a className="neo-form-error">{errors.contextcategory && touched.contextcategory && errors.contextcategory}</a>
                    </Col>
                    <Col size={6}>
                        {isQCMD ? 
                        <>
                        <Row>
                            <Col size={12}>
                            <p className="modal-neo-title modal-viewer-title">{`QUERY COMMAND`}</p>
                            <Form.Select id="contextquerymodel" name="contextquerymodel" 
                            onChange={handleChange} value={values.contextquerymodel} onBlur={handleBlur} style={{marginLeft: '0px', width: '400px'}} className="form__input" size="lg">
                                                        <option>Select Query Command</option>
                                                        <option>Large select 1</option>
                                                        <option>Large select 2</option>
                            </Form.Select>
                            <a className="neo-form-error">{errors.contextquerymodel && touched.contextquerymodel && errors.contextquerymodel}</a>
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
                        <input id='contextdocumenturl' style={{height: '50px', width: '500px'}} name='contextdocumenturl' type="text" className="form__input" onChange={handleChange}
                          onBlur={handleBlur}  value={values.contextdocumenturl} placeholder="Enter a document source url"/>
                        <a className="neo-form-error">{errors.contextdocumenturl && touched.contextdocumenturl && errors.contextdocumenturl}</a>
                    </Col>
                    <Col size={6}>
                        <p className="modal-neo-title modal-viewer-title">TARGET URL</p>
                        <input id='contexttargeturl' style={{height: '50px', width: '500px'}} name='contexttargeturl' type="text" className="form__input" onChange={handleChange}
                          onBlur={handleBlur}  value={values.contexttargeturl} placeholder="Enter a target source url"/>
                        <a className="neo-form-error">{errors.contexttargeturl && touched.contexttargeturl && errors.contexttargeturl}</a>
                    </Col>
                    
                </Row> 
                {context.category === "CODE" ? 
                <>
                <Row>
                    <Col size={12}>
                        <p className="modal-neo-title modal-viewer-title">CODE SNIPPET</p>
                        <textarea id='contextcodesnippet' name="contextcodesnippet" width={'100%'} onBlur={handleBlur}
                        onChange={handleChange} value={values.contextcodesnippet}/>
                        <a className="neo-form-error">{errors.contextcodesnippet && touched.contextcodesnippet && errors.contextcodesnippet}</a>
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
                               <button style={{backgroundColor: 'transparent', border: 'unset'}} width="max-content" type="submit"><div className="btn btn__modal"><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div></button>
                            </Col>
                </Row>
                </Container>
        </form>
                 
                
                
            )}
        </Formik>
        </>
    )

}

ContextEditor.propTypes = {
    context: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default ContextEditor;