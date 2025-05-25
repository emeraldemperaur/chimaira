import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import artifactIcon from './icons/persona-icon.png';
import PropTypes from "prop-types";
import './artifact.style.css'
import ArtifactModal from './artifact.modal';
import ArtifactDelete from './artifact.delete';
import { useState } from 'react';
import { renderToastNotification } from '../artisan/vinci';



const ArtifactTable = ({ ragArtifactList }) => {
      const [isDeleteOpen, setIsDeleteOpen] = useState(false);
         const toggleDeleteOpen = () => setIsDeleteOpen(!isDeleteOpen);

         const onRAGArtifactDelete = async (artifact) => {
         console.log(`Deleted RAG Artifact Record: ${artifact.name}`);
         renderToastNotification("SUCCESS", `Deleted '${artifact.name}' artifact from the database`, undefined, 3000);
         toggleDeleteOpen();
        }
   
    return(
        <>
        
         <MDBTable striped hover align='middle'>
            <MDBTableHead className="artifact-table-head">
            <tr>
                <th className='artifact-table-head rolodex-heading' scope='col'>AI Agent</th>
                <th className='artifact-table-head rolodex-heading' scope='col'>RAG Source</th>
                <th className='artifact-table-head rolodex-heading' scope='col'>Epoch</th>
                <th className='artifact-table-head rolodex-heading' scope='col'>&nbsp;</th>
                <th className='artifact-table-head rolodex-heading' scope='col'>Actions</th>
                <th className='artifact-table-head rolodex-heading' scope='col'>&nbsp;</th>
            </tr>
            </MDBTableHead>
            <MDBTableBody style={{ fontFamily:'Montserrat' }}>
                { ragArtifactList.length > 0 ?
                ragArtifactList.map( ragArtifact => (
                                            <tr key={ragArtifact.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                <img
                                                    src={artifactIcon}
                                                    alt='RAG Artifact Icon'
                                                    style={{ width: '60px', height: '60px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p style={{textAlign:'left'}} className='fw-bold mb-1 rolodex-name-title rolodex-table-txt'>{ragArtifact.companyName}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{ragArtifact.incorporationCountry}</p>
                                                    <p style={{textAlign:'left'}} className='text-muted mb-0 rolodex-table-txt'>{ragArtifact.incorporationCategory}</p>
                                                </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='rolodex-form-region-text fw-normal mb-1'>{ragArtifact.name}</p>
                                                <p className='rolodex-form-market-text text-muted mb-0'>{ragArtifact.primeStockExchange}</p>
                                                <p className='rolodex-form-symbol-text text-muted mb-0'>{ragArtifact.primeTickerSymbol}</p>
                                            </td>
                                            <td>
                                            {ragArtifact.dualListed ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dual Listed</MDBBadge><br/></>
                                            :null}
                                            {ragArtifact.distributesDividends ?
                                            <><MDBBadge className='rolodex-badge' color='info' pill>Dividends</MDBBadge><br/></>
                                            :null}
                                            {ragArtifact.legendConditions ?
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
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'><a className='no-records-found' onClick={() => toggleDeleteOpen()}>No Records Found</a></th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                             <th scope='col'>&nbsp;</th>
                                            </tr>
                                            </>
                                        }
            </MDBTableBody>
        </MDBTable>
         <ArtifactModal size='xl' mode={3} toggleOpen={toggleDeleteOpen} isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} artifact={{name: 'Ethereal RAG Artifact'}}
                        artifactBody={<ArtifactDelete toggleOpen={toggleDeleteOpen} onDeleteFunc={onRAGArtifactDelete} artifact={
                                            {
                                                name: 'Ethereal RAG Artifact',
                                                context: 'Voltron',
                                                query: 'Quintessence',
                                                synopsis: 'This is the test synopsis',
                                                response: 'This is the test Agentic response ',
                                                mementos: [],
                                                createdOn: '03 July 2025'
                                            }
                                         }/>}/>
        </>
    )
}

ArtifactTable.propTypes = {
    ragArtifactList: PropTypes.array.isRequired
}

export default ArtifactTable;