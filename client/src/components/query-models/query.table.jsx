import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './query.style.css'
import QueryModal from './query.modal';
import QueryDelete from './query.delete';
import { useState } from 'react';
import QueryEditor from './query.editor';
import { renderToastNotification } from '../artisan/vinci';



const QueryTable = ({ queryModelList }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
    const toggleEditOpen = () => setIsEditOpen(!isEditOpen);

     const onQueryDelete = async (query) => {
     console.log(`Deleted Query Model Record: ${query.name}`);
     renderToastNotification("SUCCESS", `Deleted '${query.name}' model from the database`, undefined, 3000);
     toggleDeleteOpen();
    }

    const onQueryUpdate = async (query) => {
    console.log(`Updated Query Model Record: ${query.name}`);
    renderToastNotification("SUCCESS", `Updated Model: '${query.name}'`, undefined, 3000);
    toggleEditOpen();
   }

   
    return(
        <>
        
         <MDBTable striped hover align='middle'>
            <MDBTableHead className="query-table-head">
            <tr>
                <th className='query-table-head rolodex-heading' scope='col'>Name</th>
                <th className='query-table-head rolodex-heading' scope='col'>Model Type</th>
                <th className='query-table-head rolodex-heading' scope='col'>Tags</th>
                <th className='query-table-head rolodex-heading' scope='col'>&nbsp;</th>
                <th className='query-table-head rolodex-heading' scope='col'>Actions</th>
                <th className='query-table-head rolodex-heading' scope='col'>&nbsp;</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody style={{ fontFamily:'Montserrat' }}>
                { queryModelList.length > 0 ?
                queryModelList.map( queryModel => (
                                            <tr key={queryModel.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                <img
                                                    src={developerLogo}
                                                    alt=''
                                                    style={{ width: '69px', height: '69px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{queryModel.companyName}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{queryModel.incorporationCountry}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{queryModel.incorporationCategory}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{queryModel.name}</p>
                                                <p className='rolodex-form-market-text text-muted mb-0'>{queryModel.primeStockExchange}</p>
                                                <p className='rolodex-form-symbol-text text-muted mb-0'>{queryModel.primeTickerSymbol}</p>
                                            </td>
                                            <td>
                                            {queryModel.dualListed ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dual Listed</MDBBadge><br/></>
                                            :null}
                                            {queryModel.distributesDividends ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dividends</MDBBadge><br/></>
                                            :null}
                                            {queryModel.legendConditions ?
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
                                             <th scope='col'><a className='no-records-found' onClick={() => toggleDeleteOpen()}>No Records Found</a></th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                            </tr>
                                            </>
                                        }
            </MDBTableBody>
        </MDBTable>
        <QueryModal marginTop='96px' size="xl" mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} query={{name: 'Omega Query Model'}}
                queryBody={<QueryDelete onDeleteFunc={onQueryDelete} toggleOpen={toggleDeleteOpen} query={
                            {
                                name: 'Omega Query Model',
                                type: 'Query Model',
                                tags: ['one', 'two', 'three'],
                                jsonQueryDefinition: {},
                                isEdited: true,
                                editedBy: 'System',
                                editedOn: '04 July 2025',
                                createdOn: '03 July 2025'
                            }
                         }/>}/>
        <QueryModal marginTop='0px' size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} query={{name: 'Omega Query Model'}}
                queryBody={<QueryEditor handleSubmit={onQueryUpdate} toggleOpen={toggleEditOpen} query={
                            {
                                name: 'Omega Query Model',
                                type: 'Query Model',
                                tags: ['one', 'two', 'three'],
                                jsonQueryDefinition: {},
                                isEdited: true,
                                editedBy: 'System',
                                editedOn: '04 July 2025',
                                createdOn: '03 July 2025'
                            }
                         }/>}/>
        </>
    )
}

QueryTable.propTypes = {
    queryModelList: PropTypes.array.isRequired
}

export default QueryTable;