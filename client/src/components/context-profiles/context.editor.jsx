/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { fetchQueries } from "../../store/actions/querymodel.actions";

const ContextEditor = ({ context, toggleOpen, handleSubmit, isEdit=false }) => {
    const [ isQCMD, setIsQCMD ] = useState(false);
    const queryModels = useSelector((state) => state.queries)
    const queryDispatch = useDispatch();
    let validationSchemaObject;

   
    useEffect(() => {
         queryDispatch(fetchQueries({order:'ASC', sortby:'id'}));
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
            setTimeout(() => {
            context = { 
                name: values.contextname,
                category: values.contextcategory,
                prologue: values.contextname,
                isQueryCommand: values.isquerycmd ? values.isquerycmd : false,
                queryCommand: values.contextquerymodel || 1 ,
                documentUrl: values.contextdocumenturl,
                targetUrl: values.contexttargeturl,
                codeSnippet: values.contextcategory == 'Code' ? values.contextcodesnippet : '' ,
            }
            onSubmitAction(context)
            console.log(`Submitted Context Form: ${JSON.stringify(context)}`);
            }, 1111); 
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
                                                <option key={0} value={''}>Select Category</option>
                                                <option key={1} value={'Ethereal'} >Ethereal</option>
                                                <option key={2} value={'Document'}>Document</option>
                                                <option key={3} value={'RAW Image'}>RAW Image</option>
                                                <option key={4} value={'Video'}>Video</option>
                                                <option key={5} value={'URL'}>URL</option>
                                                <option key={6} value={'Code'}>Code</option>
                                                <option key={7} value={'Person'}>Person</option>
                                                <option key={8} value={'Persona'}>Persona</option>
                                                <option key={9} value={'Object'}>Object</option>
                                                <option key={10} value={'Query CMD'}>Query CMD</option>
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
                                                        <option key={0} value={''}>Select Query Command</option>
                                                         { queryModels.data.queries.map( query => {
                                                               if (query.type == "CQMD") return <option  key={query.id} value={query.id}>{query.name}</option>
                                                            })
                                                         }
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
                {values.contextcategory === "Code" ? 
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
                               <button style={{backgroundColor: 'transparent', border: 'unset'}} width="max-content" type="submit"><div className="btn btn__modal">
                                {isEdit == true ? 
                                <><p className="neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></>
                                : 
                                <><p className="neo-modal-button">CREATE <i className="fa-solid fa-plus"></i></p></>}</div></button>
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
    context: PropTypes.object,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool
}

export default ContextEditor;