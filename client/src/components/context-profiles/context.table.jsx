import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './context.style.css'
import ContextModal from './context.modal';
import ContextDelete from './context.delete';
import { useEffect, useState } from 'react';
import ContextEditor from './context.editor';
import { renderToastNotification } from '../artisan/vinci';


const ContextTable = ({ contextProfileList }) => {
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [isEditOpen, setIsEditOpen] = useState(false);
   const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
   const toggleEditOpen = () => setIsEditOpen(!isEditOpen);

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

   useEffect(() => {

   }, [contextProfileList])
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
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{contextProfile.companyName}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{contextProfile.incorporationCountry}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{contextProfile.incorporationCategory}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{contextProfile.name}</p>
                                                <p className='rolodex-form-market-text text-muted mb-0'>{contextProfile.primeStockExchange}</p>
                                                <p className='rolodex-form-symbol-text text-muted mb-0'>{contextProfile.primeTickerSymbol}</p>
                                            </td>
                                            <td>
                                            {contextProfile.dualListed ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dual Listed</MDBBadge><br/></>
                                            :null}
                                            {contextProfile.distributesDividends ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dividends</MDBBadge><br/></>
                                            :null}
                                            {contextProfile.legendConditions ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Legend Conditions</MDBBadge><br/></>
                                            :null}   
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                <MDBBtn onClick={() => {console.log(`VIEW clicked`)}} className="rolodex-form-button" rounded size='sm'>
                                                <i className="fa-regular fa-eye"></i> View</MDBBtn>&nbsp;
                                                <MDBBtn onClick={() => {console.log(`EDIT clicked`)}} className="rolodex-form-button" rounded size='sm'>
                                                <i className="fa-regular fa-pen-to-square"></i> Edit</MDBBtn>&nbsp;
                                                <MDBBtn onClick={() => {console.log(`DELETE clicked`)}} className="rolodex-form-button" rounded size='sm'>
                                                <i className="fa-solid fa-trash"></i> Delete</MDBBtn>
                                            </td>
                                            <td>
                                            
                                            </td>        

                                            </tr>
                                            )):<> 
                                            <tr>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'><a onClick={() => toggleEditOpen()} className='no-records-found'>Edit Test</a></th>
                                             <th scope='col'><a onClick={() => toggleDeleteOpen()} className='no-records-found'>No Records Found</a></th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                            </tr>
                                            </>
                                        }
            </MDBTableBody>
        </MDBTable>
        <ContextModal mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} context={{name: 'Alpha Context Profile'}}
                 contextBody={<ContextDelete onDeleteFunc={onContextDelete} toggleOpen={toggleDeleteOpen} context={
                    {
                        name: 'Alpha Context Profile',
                        category: 'Person',
                        isQueryCommand: true,
                        prologue: "This is the test prologue for UI test",
                        createdOn: '03 July 2025'
                    }
                 }/>}/>
         <ContextModal size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} context={{name: 'Alpha Context Profile'}}
                 contextBody={<ContextEditor handleSubmit={onContextUpdate} toggleOpen={toggleEditOpen} context={
                    {
                        name: 'Alpha Context Profile',
                        category: 'Person',
                        isQueryCommand: true,
                        prologue: "This is the test prologue for UI test",
                        createdOn: '03 July 2025'
                    }
                 }/>}/>
        </>
    )
}

ContextTable.propTypes = {
    contextProfileList: PropTypes.array.isRequired
}

export default ContextTable;