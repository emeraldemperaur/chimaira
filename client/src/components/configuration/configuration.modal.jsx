import { useEffect } from "react";
import PropTypes from "prop-types";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBBtn } from 'mdb-react-ui-kit';
import NeoCard from "../artisan/neo.card";


const ConfigurationModal = ({ toggleOpen, isOpen, setIsOpen, configuration, mode, configurationBody, size = 'xl'}) => {

    useEffect(() => {

    }, [configuration, mode, size]);

    return(
        <>
        {mode == 1 ? 
        <>
            <MDBModal open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog style={{marginTop: '96px'}}  size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{configuration ?
                            <><i className="fa-solid fa-screwdriver-wrench"></i> {configuration.name}</>
                                :<><i className="fa-solid fa-screwdriver-wrench"></i> View Configuration Profile</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{configuration ?
                            <>
                             <NeoCard fillClass='neo-card-fill' component={configurationBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        : mode == 2 ?
        <>
            <MDBModal className="modal-z-index"  open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{configuration ?
                            <><i className="fa-solid fa-screwdriver-wrench"></i> Edit Configuration Profile</>
                                :<><i className="fa-solid fa-screwdriver-wrench"></i> Edit Configuration Profile</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{configuration ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={configurationBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        : mode == 3 ?
        <>
            <MDBModal open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog style={{marginTop: '96px'}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{configuration ?
                            <><i className="fa-solid fa-trash"></i> Delete Configuration Profile</>
                                :<><i className="fa-solid fa-trash"></i> Delete Configuration Profile</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{configuration ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={configurationBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        :
        <>
        <MDBModal className="modal-z-index"  open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{configuration ?
                            <><i className="fa-solid fa-screwdriver-wrench"></i> New Configuration Profile</>
                                :<><i className="fa-solid fa-screwdriver-wrench"></i> New Configuration Profile</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{configuration ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={configurationBody}/>
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

ConfigurationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    configuration: PropTypes.object.isRequired,
    mode: PropTypes.number.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    configurationBody: PropTypes.object.isRequired,
    size: PropTypes.string
}

export default ConfigurationModal;