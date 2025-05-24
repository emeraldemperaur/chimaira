import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/esm/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getDateTime } from "../../utils/chronometer";

const QueryEditor = ({ query, toggleOpen, handleSubmit, isEdit=false, user={} }) => {
    const [ type, setType ] = useState(query.type);

    useEffect(() => {

    }, [query, type, isEdit]);

    const onSubmitAction = (query) => {
        setType(query.type);
        handleSubmit(query);
    }

    const validationSchema = Yup.object().shape({
            modelname: Yup.string()
                .max(50, 'Model name provided is too long')
                .required('Required'),
            modeltype: Yup.string()
                .required('Required'),
            queryjsondefinition: Yup.string()
                .required('Required')
            })

    return(
        <>
         <Formik 
                initialValues={{ modelname: query.name, modeltype: query.type, heuristictag: query.tags[0],
                mediatag: query.tags[1], codetag: query.tags[2], mechatag: query.tags[3], queryjsondefinition: query.queryjsondefinition }}
        
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                    query = { 
                        id: query.id || undefined,
                        name: values.modelname,
                        type: values.modeltype,
                        tags: [values.heuristictag, values.mediatag, values.codetag, values.mechatag],
                        jsonQueryDefinition: values.queryjsondefinition,
                        createdOn: query.createdOn || getDateTime(),
                        isEdited: isEdit ? true : false,
                        editedBy: isEdit ? user.uuid : null,
                        editedOn: isEdit ? getDateTime() : null
                    }
                    onSubmitAction(query)
                    console.log(`Submitted Query Model Form: ${JSON.stringify(query)}`);
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
                 <Container >
                    <Row>
                        <Col size={6}>
                            <p className="modal-neo-title modal-viewer-title">MODEL NAME</p>
                            <input id='modelname' style={{height: '50px'}} name='modelname' type="text" className="form__input" 
                            onChange={handleChange} onBlur={handleBlur} value={values.modelname} placeholder="Enter a context profile name"/>
                            <a style={{color: '#8B0000'}} className="neo-form-error">{errors.modelname && touched.modelname && errors.modelname}</a>
                        </Col>
                        <Col size={3}>
                            <p className="modal-neo-title modal-viewer-title">TYPE</p>
                            <Form.Select id="modeltype" name="modeltype" style={{marginLeft: '0px', width: '250px'}}
                            onChange={handleChange} onBlur={handleBlur} value={values.modeltype} className="form__input" size="lg">
                                                                    <option>Select Type</option>
                                                                    <option>Context Query</option>
                                                                    <option>Query CMD</option>
                            </Form.Select>
                            <a style={{color: '#8B0000'}} className="neo-form-error">{errors.modeltype && touched.modeltype && errors.modeltype}</a>
                        </Col>
                    </Row> 
                    <Row>
                        <Col size={12}>
                            <p className="modal-neo-title modal-viewer-title">TAGS</p>
                            <div style={{float: 'left'}} className="neo-checkbox">
                                <div className="neo-checkbox__1">
                                    <input id="heuristictag" name="heuristictag" type="checkbox" 
                                    checked={values.heuristictag} onChange={handleChange} onBlur={handleBlur} value={values.heuristictag}/>
                                    <label htmlFor="heuristictag">
                                    <i className="fa-brands fa-mandalorian"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="mediatag" name="mediatag" type="checkbox"
                                    checked={values.mediatag} onChange={handleChange} onBlur={handleBlur} value={values.mediatag}/>
                                    <label htmlFor="mediatag">
                                    <i className="fa-solid fa-icons"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="codetag" name="codetag"  type="checkbox"
                                    checked={values.codetag} onChange={handleChange} onBlur={handleBlur} value={values.codetag}/>
                                    <label htmlFor="codetag">
                                    <i className="fa-solid fa-code"></i></label>
                                </div>
                                <div className="neo-checkbox__2">
                                    <input id="mechatag" name="mechatag" type="checkbox"
                                    checked={values.mechatag} onChange={handleChange} onBlur={handleBlur} value={values.mechatag}/>
                                    <label htmlFor="mechatag">
                                    <i className="fa-solid fa-robot"></i></label>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '3px', marginBottom: '3px'}}>
                        <Col size={12}>
                            <p className="modal-neo-title modal-viewer-title">QUERY DEFINITION</p>
                            <textarea id="queryjsondefinition" name="queryjsondefinition" className="form__input neo-card-fill" style={{height: 'fit-content !important', marginRight: '13px !important'}} 
                            onChange={handleChange} onBlur={handleBlur} value={values.queryjsondefinition}/>
                            <a className="neo-form-error">{errors.queryjsondefinition && touched.queryjsondefinition && errors.queryjsondefinition}</a>
                        </Col>
                    </Row>
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

QueryEditor.propTypes = {
    query: PropTypes.object.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool,
    user: PropTypes.object
}

export default QueryEditor;