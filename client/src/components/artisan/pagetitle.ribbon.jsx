import { useLocation } from 'react-router-dom';
import '../artisan/artisan.css'
import { useEffect, useState } from 'react';
import { userGreeting } from '../../utils/chronometer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const TitleRibbon = ({title, username}) => {
    const currentPage = useLocation();
    const [dashboadGreeting, setDashboardGreeting] = useState(() => userGreeting(username))
    const isDashboard = ['/dashboard'].includes(currentPage.pathname)
    useEffect(()=> {
        setDashboardGreeting(userGreeting(username))
    }, [isDashboard, username])

    return(
        <>
        <Row style={{marginTop: '23px', paddingBottom: '13px'}} className='title-ribbon'>
            <Col><p className='page-title'>{title}</p></Col>
            <Col>
                {isDashboard ? <> <div className='title-greeting'> {dashboadGreeting} </div> </> : <></>}
            </Col>
            <hr className='solid'></hr>
        </Row>
        </>
    )
}

TitleRibbon.propTypes = {
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default TitleRibbon;