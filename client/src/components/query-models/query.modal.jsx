import { useEffect } from "react";
import PropTypes from "prop-types";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBBtn } from 'mdb-react-ui-kit';
import NeoCard from "../artisan/neo.card";


const QueryModal = ({ toggleOpen, isOpen, setIsOpen, query, mode, queryBody, size = 'xl', marginTop='96px'}) => {

    useEffect(() => {

    }, [query, mode, size]);

    return(
        <>
        {mode == 1 ? 
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog className="modal-buffer"  size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{query ?
                            <><i className="fa-solid fa-hexagon-nodes"></i> {query.name}</>
                                :<><i className="fa-solid fa-hexagon-nodes"></i> View Query Model</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{query ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={queryBody}/>
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
                <MDBModalDialog style={{marginTop:  `${marginTop} !important`}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{query ?
                            <><i className="fa-solid fa-hexagon-nodes"></i> Edit Query Model</>
                                :<><i className="fa-solid fa-hexagon-nodes"></i> Edit Query Model</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{query ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={queryBody}/>
                            </>
                                :null}
                        </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
        :  mode == 3 ?
        <>
            <MDBModal className="modal-z-index" open={isOpen} tabIndex='-1' setOpen={setIsOpen}>
                <MDBModalDialog className="modal-buffer" size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{query ?
                            <><i className="fa-solid fa-trash"></i> Delete Query Model</>
                                :<><i className="fa-solid fa-trash"></i> Delete Query Model</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{query ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={queryBody}/>
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
                <MDBModalDialog style={{marginTop:  `${marginTop} !important`}} size={size}>
                    <MDBModalContent>
                        <MDBModalHeader className="neo-modal-body">
                            <MDBModalTitle className='neo-modal-title'>{query ?
                            <><i className="fa-solid fa-hexagon-nodes"></i> New Query Model</>
                                :<><i className="fa-solid fa-hexagon-nodes"></i> New Query Model</>}
                            </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className="neo-modal-body">{query ?
                            <>
                            <NeoCard fillClass='neo-card-fill' component={queryBody}/>
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

QueryModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    mode: PropTypes.number.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    queryBody: PropTypes.object.isRequired,
    size: PropTypes.string,
    marginTop: PropTypes.string
}

export default QueryModal;