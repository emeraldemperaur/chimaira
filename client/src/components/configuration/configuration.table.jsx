import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './configuration.style.css';
import ConfigurationDelete from './configuration.delete';
import ConfigurationModal from './configuration.modal';
import { useState } from 'react';
import ConfigurationEditor from './configuration.editor';
import { renderToastNotification } from '../artisan/vinci';

const ConfigurationTable = ({ configurationList }) => {
     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
     const [isEditOpen, setIsEditOpen] = useState(false);
     const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
     const toggleEditOpen = () => setIsEditOpen(!isEditOpen);

     const onConfigurationDelete = async (configuration) => {
     console.log(`Deleted Configuration Profile Record: ${configuration.name}`);
     renderToastNotification("SUCCESS", `Deleted '${configuration.name}' configuration preset from the database`, undefined, 3000);
     toggleDeleteOpen();
       }

    const onConfigurationUpdate = async (configuration) => {
    console.log(`Updated Configuration Profile Record: ${configuration.name}`);
    renderToastNotification("SUCCESS", `Updated '${configuration.name}' configuration preset`, undefined, 3000);
    toggleEditOpen();
   }
   
    return(
        <>
         <MDBTable striped hover align='middle'>
            <MDBTableHead className="configuration-table-head">
            <tr>
                <th className='configuration-table-head rolodex-heading' scope='col'>Alias</th>
                <th className='configuration-table-head rolodex-heading' scope='col'>RAG Source</th>
                <th className='configuration-table-head rolodex-heading' scope='col'>Key</th>
                <th className='configuration-table-head rolodex-heading' scope='col'>&nbsp;</th>
                <th className='configuration-table-head rolodex-heading' scope='col'>Actions</th>
                <th className='configuration-table-head rolodex-heading' scope='col'>&nbsp;</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody style={{ fontFamily:'Montserrat' }}>
                { configurationList.length > 0 ?
                configurationList.map( configuration => (
                                            <tr key={configuration.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                <img
                                                    src={developerLogo}
                                                    alt=''
                                                    style={{ width: '69px', height: '69px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{configuration.companyName}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{configuration.incorporationCountry}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{configuration.incorporationCategory}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{configuration.name}</p>
                                                <p className='rolodex-form-market-text text-muted mb-0'>{configuration.primeStockExchange}</p>
                                                <p className='rolodex-form-symbol-text text-muted mb-0'>{configuration.primeTickerSymbol}</p>
                                            </td>
                                            <td>
                                            {configuration.dualListed ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dual Listed</MDBBadge><br/></>
                                            :null}
                                            {configuration.distributesDividends ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dividends</MDBBadge><br/></>
                                            :null}
                                            {configuration.legendConditions ?
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
         <ConfigurationModal mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} configuration={{name: 'Delta Configuration Profile'}}
                         configurationBody={<ConfigurationDelete onDeleteFunc={onConfigurationDelete} toggleOpen={toggleDeleteOpen} configuration={
                                     {
                                         name: 'Delta Configuration Profile',
                                         provider: 'Open AI',
                                         key: '@#$%(*&%$##%&Y@&#&#$!*&^)(12345-90)',
                                         sourceUrl: "https://chat-gpt.openai.ai",
                                         createdOn: '13 July 2025',
                                         createdBy: 'System'
                                     }
                                  }/>}/>
        <ConfigurationModal size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} configuration={{name: 'Delta Configuration Profile'}}
                         configurationBody={<ConfigurationEditor handleSubmit={onConfigurationUpdate} toggleOpen={toggleEditOpen} configuration={
                                     {
                                         name: 'Delta Configuration Profile',
                                         provider: 'Open AI',
                                         key: '@#$%(*&%$##%&Y@&#&#$!*&^)(12345-90)',
                                         sourceUrl: "https://chat-gpt.openai.ai",
                                         createdOn: '13 July 2025',
                                         createdBy: 'System'
                                     }
                                  }/>}/>
        </>
    )
}

ConfigurationTable.propTypes = {
    configurationList: PropTypes.array.isRequired
}

export default ConfigurationTable;