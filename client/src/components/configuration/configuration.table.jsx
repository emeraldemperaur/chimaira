import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './configuration.style.css';
import ConfigurationDelete from './configuration.delete';
import ConfigurationModal from './configuration.modal';
import { useState } from 'react';
import ConfigurationEditor from './configuration.editor';
import { renderToastNotification } from '../artisan/vinci';
import ConfigurationViewer from './configuration.viewer';

const ConfigurationTable = ({ configurationList }) => {
     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
     const [isEditOpen, setIsEditOpen] = useState(false);
     const [isViewOpen, setIsViewOpen] = useState(false);
     const [configuration, setConfiguration] = useState(null);
     const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
     const toggleEditOpen = () => setIsEditOpen(!isEditOpen);
     const toggleViewOpen = () => setIsViewOpen(!isViewOpen);


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
                <th className='configuration-table-head rolodex-heading' scope='col'>URL</th>
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
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{configuration.name}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{configuration.provider}</p>
                                            </td>
                                            <td>
                                            {configuration.sourceUrl ?
                                            <><p>{configuration.sourceUrl}</p><br/></>
                                            :null}  
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`VIEW clicked`);
                                                    setConfiguration(configuration);
                                                    toggleViewOpen();
                                                }}><p className="neo-action-button neo-modal-button">VIEW <i className="fa-solid fa-eye"></i></p></div>
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`EDIT clicked`);
                                                    setConfiguration(configuration);
                                                    toggleEditOpen();
                                                }}><p className="neo-action-button neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`DELETE clicked`);
                                                    setConfiguration(configuration);
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
         <ConfigurationModal mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} configuration={configuration}
                         configurationBody={<ConfigurationDelete onDeleteFunc={onConfigurationDelete} toggleOpen={toggleDeleteOpen} configuration={configuration}/>}/>
        <ConfigurationModal size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} configuration={configuration}
                         configurationBody={<ConfigurationEditor handleSubmit={onConfigurationUpdate} toggleOpen={toggleEditOpen} configuration={configuration}/>}/>
        <ConfigurationModal mode={1} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} configuration={configuration}
                         configurationBody={<ConfigurationViewer configuration={configuration}/>}/>
        </>
    )
}

ConfigurationTable.propTypes = {
    configurationList: PropTypes.array.isRequired
}

export default ConfigurationTable;