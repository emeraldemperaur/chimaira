import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './context.style.css'
import ContextModal from './context.modal';
import ContextDelete from './context.delete';
import { useEffect, useState } from 'react';
import ContextEditor from './context.editor';
import { renderToastNotification } from '../artisan/vinci';
import ContextViewer from './context.viewer';

const ContextTable = ({ contextProfileList }) => {
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [isViewOpen, setIsViewOpen] = useState(false);
   const [context, setContext] = useState(null);
   const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
   const toggleEditOpen = () => setIsEditOpen(!isEditOpen);
   const toggleViewOpen = () => setIsViewOpen(!isViewOpen);

   useEffect(()=> {
           console.log(`DATA TABLE CHECK: ${JSON.stringify(contextProfileList)}`)
   
       }, [contextProfileList]);

   const onContextDelete = async (context) => {
    console.log(`Deleted Context Profile Record: ${context.name}`);
    renderToastNotification("SUCCESS", `Deleted '${context.name}' context from the database`, undefined, 3000);
    toggleDeleteOpen();
   }

   const onContextUpdate = async (context) => {
    console.log(`Updated Context Profile Record: ${context.name}`);
    renderToastNotification("SUCCESS", `Updated Context: '${context.name}'`, undefined, 3000);
    toggleEditOpen();
   }

   
    return(
        <>
        
         <MDBTable striped hover align='middle'>
            <MDBTableHead className="context-table-head">
            <tr>
                <th className='context-table-head rolodex-heading' scope='col'>Name</th>
                <th className='context-table-head rolodex-heading' scope='col'>Category</th>
                <th className='context-table-head rolodex-heading' scope='col'>{`CMD >_`}</th>
                <th className='context-table-head rolodex-heading' scope='col'>&nbsp;</th>
                <th className='context-table-head rolodex-heading' scope='col'>Actions</th>
                <th className='context-table-head rolodex-heading' scope='col'>&nbsp;</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody style={{ fontFamily:'Montserrat' }}>
                { contextProfileList.length > 0 ?
                contextProfileList.map( contextProfile => (
                                            <tr key={contextProfile.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                <img
                                                    src={developerLogo}
                                                    alt=''
                                                    style={{ width: '69px', height: '69px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{contextProfile.name}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{contextProfile.category}</p>
                                            </td>
                                            <td>
                                            {contextProfile.isQueryCommand ?
                                            <><MDBBadge className='context-table-badge' color='info' pill>&nbsp;&nbsp;Yes&nbsp;&nbsp;</MDBBadge><br/></>
                                            :<><MDBBadge className='context-table-badge' color='info' pill>&nbsp;&nbsp;No&nbsp;&nbsp;</MDBBadge><br/></>}  
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`VIEW clicked`);
                                                    setContext(contextProfile);
                                                    toggleViewOpen();
                                                }}><p className="neo-action-button neo-modal-button">VIEW <i className="fa-solid fa-eye"></i></p></div>
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`EDIT clicked`);
                                                    setContext(contextProfile);
                                                    toggleEditOpen();
                                                }}><p className="neo-action-button neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                                            </td>
                                            <td>
                                            <div className="btn btn__modal" onClick={() => {
                                                    console.log(`DELETE clicked`);
                                                    setContext(contextProfile);
                                                    toggleDeleteOpen();
                                                }}><p className="neo-action-button neo-modal-button">DELETE <i className="fa-solid fa-trash"></i></p></div>
                                
                                            </td>        

                                            </tr>
                                            )):<> 
                                            <tr>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'><a className='no-records-found'>No Records Found</a></th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                            </tr>
                                            </>
                                        }
            </MDBTableBody>
        </MDBTable>
        <ContextModal mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} context={context}
                 contextBody={<ContextDelete onDeleteFunc={onContextDelete} toggleOpen={toggleDeleteOpen} context={context}/>}/>
         <ContextModal isEdit={true} size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} context={context}
                 contextBody={<ContextEditor handleSubmit={onContextUpdate} toggleOpen={toggleEditOpen} context={context}/>}/>
        <ContextModal mode={1} toggleOpen={toggleViewOpen} isOpen={isViewOpen} setIsOpen={setIsViewOpen} context={context}
                 contextBody={<ContextViewer context={context}/>}/>
        </>
    )
}

ContextTable.propTypes = {
    contextProfileList: PropTypes.array.isRequired
}

export default ContextTable;