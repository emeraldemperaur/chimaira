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
    const [isOpen, setIsOpen] = useState(true);
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);
    /*const onActionClick = () =>{
        console.log('On Action clicked -- Locker Group')
    }*/

    return(
        <>
        <TitleRibbon title='RAG Artifacts' username={users.data.firstName}/>
        <RecordsCount recordsCount={6}/>
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