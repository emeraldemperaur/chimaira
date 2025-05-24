import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import developerLogo from '../../assets/me-dev-logo-black.png';
import PropTypes from "prop-types";
import './query.style.css'
import QueryModal from './query.modal';
import QueryDelete from './query.delete';
import { useState } from 'react';
import QueryEditor from './query.editor';
import { renderToastNotification } from '../artisan/vinci';
import QueryViewer from './query.viewer';



const QueryTable = ({ queryModelList, user }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [query, setQuery] = useState(null);
    const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);
    const toggleEditOpen = () => setIsEditOpen(!isEditOpen);
    const toggleViewOpen = () => setIsViewOpen(!isViewOpen);

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
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{queryModel.name}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{queryModel.type}</p>
                                            </td>
                                            <td>
                                            {queryModel.tags[0]  ?
                                            <><MDBBadge className='query-table-badge' color='info' pill><i className="fa-brands fa-mandalorian"></i> Heuristic</MDBBadge><br/></>
                                            :null}
                                            {queryModel.tags[1]  ?
                                            <><MDBBadge className='query-table-badge' color='info' pill><i className="fa-solid fa-icons"></i> Multimedia</MDBBadge><br/></>
                                            :null}
                                            {queryModel.tags[2] ?
                                            <><MDBBadge className='query-table-badge' color='info' pill><i className="fa-solid fa-code"></i> Code</MDBBadge><br/></>
                                            :null} 
                                            {queryModel.tags[3] ?
                                            <><MDBBadge className='query-table-badge' color='info' pill><i className="fa-solid fa-robot"></i> Automation</MDBBadge><br/></>
                                            :null}   
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`VIEW clicked`);
                                                    setQuery(queryModel);
                                                    toggleViewOpen();
                                                }}><p className="neo-action-button neo-modal-button">VIEW <i className="fa-solid fa-eye"></i></p></div>
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`EDIT clicked`);
                                                    setQuery(queryModel);
                                                    toggleEditOpen();
                                                }}><p className="neo-action-button neo-modal-button">EDIT <i className="fa-solid fa-pencil"></i></p></div>
                                            </td>
                                            <td>
                                                <div className="btn btn__modal" onClick={() => {
                                                    console.log(`DELETE clicked`);
                                                    setQuery(queryModel);
                                                    toggleDeleteOpen();
                                                }}><p className="neo-action-button neo-modal-button">DELETE <i className="fa-solid fa-trash"></i></p></div>
                                            </td>        

                                            </tr>
                                            )):<> 
                                            <tr>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                            </tr>
                                            </>
                                        }
            </MDBTableBody>
        </MDBTable>
        <QueryModal marginTop='96px' size="xl" mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} query={query}
                queryBody={<QueryDelete onDeleteFunc={onQueryDelete} toggleOpen={toggleDeleteOpen} query={query}/>}/>
        <QueryModal isEdit={true} marginTop='0px' size="fullscreen" mode={2} toggleOpen={toggleEditOpen} isOpen={isEditOpen} setIsOpen={setIsEditOpen} query={query}
                queryBody={<QueryEditor user={user} isEdit={true} handleSubmit={onQueryUpdate} toggleOpen={toggleEditOpen} query={query}/>}/>
        <QueryModal  mode={1} toggleOpen={toggleViewOpen} isOpen={isViewOpen} setIsOpen={setIsViewOpen} query={query}
                queryBody={<QueryViewer query={query}/>}/>
        </>
    )
}

QueryTable.propTypes = {
    queryModelList: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}

export default QueryTable;