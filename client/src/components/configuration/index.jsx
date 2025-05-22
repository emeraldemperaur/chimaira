import { useEffect, useState } from "react";
import FloatingAction from "../artisan/floatingaction.button";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from "prop-types";
import Footer from "../artisan/footer";
import NeoCard from "../artisan/neo.card";
import RecordsCount from "../artisan/records.count";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ConfigurationTable from "./configuration.table";
import ConfigurationModal from "./configuration.modal";
import ConfigurationViewer from "./configuration.viewer";

const Configuration = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);
    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Settings')
    }
    return(
        <>
        <TitleRibbon title='Settings' username={users.data.firstName}/>
        <RecordsCount recordTitle="Records" recordsCount={13}/>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
                <NeoCard component={<><ConfigurationTable configurationList={[]}/></>}/>
            </Col>
        </Row>
        <ConfigurationModal mode={1} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} configuration={{name: 'Delta Configuration Profile'}}
                 configurationBody={<ConfigurationViewer configuration={
                             {
                                 name: 'Delta Configuration Profile',
                                 provider: 'Open AI',
                                 key: '@#$%(*&%$##%&Y@&#&#$!*&^)(12345-90)',
                                 sourceUrl: "https://chat-gpt.openai.ai",
                                 createdOn: '13 July 2025',
                                 createdBy: 'System'
                             }
                          }/>}/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}


Configuration.propTypes = {
  users: PropTypes.object.isRequired
}

export default Configuration;