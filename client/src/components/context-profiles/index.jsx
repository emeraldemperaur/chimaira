/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch, useSelector } from "react-redux";
import { fetchContexts } from "../../store/actions/contextprofile.actions";
import ContextEditor from "./context.editor";
import { renderToastNotification } from "../artisan/vinci";

const ContextProfiles = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    const contextProfiles = useSelector((state) => state.contexts)
    const contextDispatch = useDispatch();
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
        contextDispatch(fetchContexts({order:'ASC', sortby:'id'}));
        console.log(JSON.stringify(contextProfiles));

    }, []);
    const toggleOpen = () => setIsOpen(!isOpen);

    const onContextCreate = async (context) => {
        console.log(`Created Context Profile Record: ${context.name}`);
        renderToastNotification("SUCCESS", `Created new Context profile record: '${context.name}'`, undefined, 3000);
        toggleOpen();
       }


    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Context Profiles')
    }
    return(
        <> 
        <TitleRibbon title='Context Profiles'  username={users.data.firstName}/>
        <RecordsCount recordsCount={contextProfiles.data.contexts.length}/>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
            <NeoCard component={<><ContextTable contextProfileList={contextProfiles.data.contexts}/></>}/>
            </Col>
        </Row>
        <ContextModal isEdit={false} size="fullscreen" mode={4} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} context={{}}
         contextBody={<ContextEditor handleSubmit={onContextCreate} toggleOpen={toggleOpen} context={{}}/>}/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}

ContextProfiles.propTypes = {
  users: PropTypes.object.isRequired
}

export default ContextProfiles;