import { useEffect, useState } from "react";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from "prop-types";
import Footer from "../artisan/footer";
import NeoCard from "../artisan/neo.card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import RecordsCount from "../artisan/records.count";
import ArtifactTable from "./artifact.table";
import ArtifactModal from "./artifact.modal";
import ArtifactViewer from "./artifact.viewer";


const RAGArtifacts = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);

    const detectSearchInput = (event) => {
        setSearchValue(event.target.value);
    }
   

    return(
        <>
        <TitleRibbon title='RAG Artifacts' username={users.data.firstName}/>
        <Row>
            <Col size={6}>
                <RecordsCount recordsCount={0}/>
            </Col>
            <Col style={{marginTop: '33px'}}  size={6}>
                <input id='rag-search' style={{width: '300px', height: '50px', float: 'right',  marginRight: '33px'}} name='rag-search' type="text" className="form__input" onChange={detectSearchInput}
                        value={searchValue} placeholder='Search...' />
            </Col>
        </Row>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
                <NeoCard component={<><ArtifactTable ragArtifactList={[]}/></>}/>
            </Col>
        </Row>
        <ArtifactModal mode={1} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} artifact={{name: 'Ethereal RAG Artifact'}}
                artifactBody={<ArtifactViewer artifact={
                                    {
                                        name: 'Omega Query Model',
                                        context: 'Voltron',
                                        query: 'Quintessence',
                                        synopsis: 'This is the test synopsis',
                                        response: 'This is the test Agentic response ',
                                        mementos: [],
                                        createdOn: '03 July 2025'
                                    }
                                 }/>}/>
        <Footer/>
        </>
    )
}

RAGArtifacts.propTypes = {
  users: PropTypes.object.isRequired
}

export default RAGArtifacts;