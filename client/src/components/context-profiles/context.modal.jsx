import { useEffect } from "react";
import PropTypes from "prop-types";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBBtn } from 'mdb-react-ui-kit';
import NeoCard from "../artisan/neo.card";


const ContextModal = ({ toggleOpen, isOpen, setIsOpen, context, mode, contextBody, size = 'xl'}) => {

    useEffect(() => {

    }, [context, mode, size]);

    return(
        <>
        {mode == 1 ? 
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog  size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{context ?
                            <><i className="fa-solid fa-quote-left"></i> {context.name} <i className="fa-solid fa-quote-right"></i></>
                                :<><i className="fa-solid fa-quote-left"></i> View Context Profile <i className="fa-solid fa-quote-right"></i></>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{context ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={contextBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        : mode == 2 ?
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{context  ?
                            <><i className="fa-solid fa-pencil"></i> Edit <i className="fa-solid fa-quote-left"></i> {context.name} <i className="fa-solid fa-quote-right"></i></>
                                :<><i className="fa-solid fa-pencil"></i> New <i className="fa-solid fa-quote-left"></i> Context Profile <i className="fa-solid fa-quote-right"></i></>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{context ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={contextBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        : mode == 3 ?
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog className="modal-buffer" size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{context ?
                            <><i className="fa-solid fa-trash"></i> Delete <i className="fa-solid fa-quote-left"></i> {context.name} <i className="fa-solid fa-quote-right"></i></>
                                :<><i className="fa-solid fa-trash"></i> Delete Context Profile <i className="fa-solid fa-quote-right"></i></>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{context ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={contextBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        : 
        <>
         <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{context ?
                            <><i className="fa-solid fa-pencil"></i> New <i className="fa-solid fa-quote-left"></i> Context Profile <i className="fa-solid fa-quote-right"></i></>
                                :<><i className="fa-solid fa-pencil"></i> New <i className="fa-solid fa-quote-left"></i> Context Profile <i className="fa-solid fa-quote-right"></i></>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{context ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={contextBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
        </MDBModal>
        </>
    }  
        </>
    )
}

ContextModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    mode: PropTypes.number.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    contextBody: PropTypes.object.isRequired,
    size: PropTypes.string,
    isEdit: PropTypes.bool
}

export default ContextModal;