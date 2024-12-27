import { useLocation } from 'react-router-dom';
import '../artisan/artisan.css'
import { useEffect, useState } from 'react';
import { userGreeting } from '../../utils/chronometer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TitleRibbon = (props) => {
    const currentPage = useLocation();
    const [dashboadGreeting, setDashboardGreeting] = useState(() => userGreeting(props.username))
    const isDashboard = ['/dashboard'].includes(currentPage.pathname)
    useEffect(()=> {
        setDashboardGreeting(userGreeting(props.username))
    }, [isDashboard])

    return(
        <>
        <Row style={{marginTop: '23px', paddingBottom: '13px'}} className='title-ribbon'>
            <Col><p className='page-title'>{props.title}</p></Col>
            <Col>
                {isDashboard ? <> <div className='title-greeting'> {dashboadGreeting} </div> </> : <></>}
            </Col>
            <hr className='solid'></hr>
        </Row>
        
        </>
    )
}

export default TitleRibbon;