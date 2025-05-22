import { useEffect } from "react";
import PropTypes from "prop-types";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBBtn } from 'mdb-react-ui-kit';
import './artifact.style.css'
import NeoCard from "../artisan/neo.card";


const ArtifactModal = ({ toggleOpen, isOpen, setIsOpen, artifact, mode, artifactBody, size = 'fullscreen', marginTop}) => {

    useEffect(() => {

    }, [artifact, mode, size]);

    return(
        <>
        {mode == 1 ? 
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog style={{marginTop: marginTop}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{artifact ?
                            <><i className="fa-solid fa-microchip"></i> {artifact.name}</>
                                :<><i className="fa-solid fa-microchip"></i> View RAG Artifact</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{artifact ?
                            <>
                            <NeoCard fillClass='neo-card-fill' width="fit-content !important" component={artifactBody}/>
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
                <MDBModalDialog style={{marginTop: '96px'}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{artifact ?
                            <><i className="fa-solid fa-microchip"></i> Edit RAG Artifact</>
                                :<><i className="fa-solid fa-microchip"></i> Edit RAG Artifact</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{artifact ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={artifactBody}/>
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
                <MDBModalDialog style={{marginTop: '96px'}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{artifact ?
                            <><i className="fa-solid fa-trash"></i> Delete RAG Artifact</>
                                :<><i className="fa-solid fa-solid fa-trash"></i> Delete RAG Artifact</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{artifact ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={artifactBody}/>
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
                <MDBModalDialog style={{marginTop: '96px'}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{artifact ?
                            <><i className="fa-solid fa-microchip"></i> New RAG Artifact</>
                                :<><i className="fa-solid fa-microchip"></i> New RAG Artifact</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{artifact ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={artifactBody}/>
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

ArtifactModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    artifact: PropTypes.object.isRequired,
    mode: PropTypes.number.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    artifactBody: PropTypes.object.isRequired,
    size: PropTypes.string,
    marginTop: PropTypes.string
}

export default ArtifactModal;