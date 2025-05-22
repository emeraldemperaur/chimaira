import { useEffect, useState } from "react";
import FloatingAction from "../artisan/floatingaction.button";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from "prop-types";
import Footer from "../artisan/footer";
import NeoCard from "../artisan/neo.card";
import RecordsCount from "../artisan/records.count";
import QueryTable from "./query.table";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import QueryModal from "./query.modal";
import QueryViewer from "./query.viewer";


const QueryModels = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);
    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Query Models')
    }
    return(
        <>
        <TitleRibbon title='Query Models'  username={users.data.firstName}/>
        <RecordsCount recordsCount={69}/>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
                <NeoCard component={<><QueryTable queryModelList={[]}/></>}/>
             </Col>
        </Row>
        <QueryModal size="xl" mode={1} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} query={{name: 'Omega Query Model'}}
        queryBody={<QueryViewer query={
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
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}

QueryModels.propTypes = {
  users: PropTypes.object.isRequired
}

export default QueryModels;