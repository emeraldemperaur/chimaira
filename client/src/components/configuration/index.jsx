/* eslint-disable react-hooks/exhaustive-deps */
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
import { useDispatch, useSelector } from "react-redux";
import { fetchConfigurations } from "../../store/actions/settings.actions";
import { renderToastNotification } from "../artisan/vinci";
import ConfigurationEditor from "./configuration.editor";

const Configuration = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const configurationProfiles = useSelector((state) => state.configurations)
    const configurationDispatch = useDispatch();
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
        configurationDispatch(fetchConfigurations({order:'ASC', sortby:'id'}));

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);
    
    const onConfigurationCreate = async (configuration) => {
            console.log(`Created Configuration Profile Record: ${configuration.name}`);
            renderToastNotification("SUCCESS", `Created new Configuration profile: '${configuration.name}'`, undefined, 3000);
            toggleOpen();
           }
    
    const detectSearchInput = (event) => {
        setSearchValue(event.target.value);
    }
    
    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Settings')
    }

    const filteredConfigurations = configurationProfiles.data.configurations.filter((configuration) => configuration.name.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase()));

    return(
        <>
        <TitleRibbon title='Settings' username={users.data.firstName}/>
        <Row>
            <Col size={6}>
                 <RecordsCount recordTitle="Records" recordsCount={filteredConfigurations.length}/>
            </Col>
            <Col style={{marginTop: '33px'}}  size={6}>
                    <input id='configuration-search' style={{width: '300px', height: '50px', float: 'right',  marginRight: '33px'}} name='configuration-search' type="text" className="form__input" onChange={detectSearchInput}
                    value={searchValue} placeholder='Search...' />
            </Col>
        </Row>
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
                <NeoCard component={<><ConfigurationTable configurationList={filteredConfigurations}/></>}/>
            </Col>
        </Row>
        <ConfigurationModal mode={4} size="fullscreen" toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} configuration={{}}
                 configurationBody={<ConfigurationEditor  handleSubmit={onConfigurationCreate} toggleOpen={toggleOpen} configuration={{name: ''}}/>}/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}


Configuration.propTypes = {
  users: PropTypes.object.isRequired
}

export default Configuration;