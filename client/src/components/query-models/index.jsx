/* eslint-disable react-hooks/exhaustive-deps */
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
import QueryEditor from "./query.editor";
import { renderToastNotification } from "../artisan/vinci";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueries } from "../../store/actions/querymodel.actions";


const QueryModels = ({users}) => {
    const [isOpen, setIsOpen] = useState(false);
    const queryModels = useSelector((state) => state.queries);
    const [searchValue, setSearchValue] = useState('');
    const queryDispatch = useDispatch();
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
        queryDispatch(fetchQueries({order:'ASC', sortby:'id'}));
        console.log(JSON.stringify(queryModels));

    }, [users]);
    const toggleOpen = () => setIsOpen(!isOpen);

    const onQueryCreate = async (query) => {
            console.log(`Created Context Profile Record: ${query.name}`);
            renderToastNotification("SUCCESS", `Created new Query Model: '${query.name}'`, undefined, 3000);
            toggleOpen();
           }
    
    const detectSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const onActionClick = () =>{
        setIsOpen(true);
        console.log('On Action clicked -- Query Models')
    }

    const filteredQueries = queryModels.data.queries.filter((query) => query.name.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase()))

    return(
        <>
        <TitleRibbon title='Query Models'  username={users.data.firstName}/>
        <Row>
            <Col size={6}>
                <RecordsCount recordsCount={filteredQueries.length}/>
            </Col>
            <Col style={{marginTop: '33px'}} size={6}>
                <input id='query-search' style={{width: '300px', height: '50px', float: 'right',  marginRight: '33px'}} name='query-search' type="text" className="form__input" onChange={detectSearchInput}
                        value={searchValue} placeholder='Search...' />
            </Col>
        </Row>
        
        <Row>
            <Col style={{paddingLeft: '33px', paddingRight: '33px'}} size={12}>
                <NeoCard component={<><QueryTable user={users.data} queryModelList={filteredQueries}/></>}/>
             </Col>
        </Row>
        <QueryModal isEdit={false} size="fullscreen" mode={4} toggleOpen={toggleOpen} isOpen={isOpen} setIsOpen={setIsOpen} query={{}}
        queryBody={<QueryEditor user={users.data} isEdit={false}  handleSubmit={onQueryCreate} toggleOpen={toggleOpen} 
        query={{tags:[false, false, false, false]}}/>}/>
        <FloatingAction icon={<i className="fa-solid fa-plus"></i>} onClickFunction={onActionClick}/>
        <Footer/>
        </>
    )
}

QueryModels.propTypes = {
  users: PropTypes.object.isRequired
}

export default QueryModels;