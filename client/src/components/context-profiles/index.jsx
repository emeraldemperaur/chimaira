import { useEffect, useState } from "react";
import FloatingAction from "../artisan/floatingaction.button";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from "prop-types";
import Footer from "../artisan/footer";
import NeoCard from "../artisan/neo.card";
import ContextTable from "./context.table";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import RecordsCount from "../artisan/records.count";
import ContextModal from "./context.modal";
import ContextViewer from "./context.viewer";

const ContextProfiles = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [])
    const toggleOpen = () => setIsOpen(!isOpen);
    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Context Profiles')
    }
    return(
        <> 
        <TitleRibbon title='Context Profiles'  username={users.data.firstName}/>
        <RecordsCount recordsCount={100}/>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
            <NeoCard component={<><ContextTable contextProfileList={[]}/></>}/>
            </Col>
        </Row>
        <ContextModal mode={1} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} context={{name: 'Alpha Context Profile'}}
         contextBody={<ContextViewer context={
            {
                name: 'Alpha Context Profile',
                category: 'Person',
                isQueryCommand: true,
                prologue: "This is the test prologue for UI test",
                createdOn: '03 July 2025'
            }
         }/>}/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}

ContextProfiles.propTypes = {
  users: PropTypes.object.isRequired
}

export default ContextProfiles;