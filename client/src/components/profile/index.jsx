import { useEffect } from "react";
import TitleRibbon from "../artisan/pagetitle.ribbon";
import PropTypes from "prop-types";
import Footer from "../artisan/footer";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Profile = ({users}) => {
    document.body.style.background = `radial-gradient(#ffffff, #dadada)`;
    let superUsers = ['root', 'admin', 'mecha']
    useEffect(()=> {
        document.body.style.background = `radial-gradient(#ffffff, #dadada)`;

    }, [])
    return(
        <>
        <TitleRibbon title='Account Profile' username={users.data.firstName}/>
        <Row style={{marginTop: '33px'}}>
            <Col size={12}>
                    <div style={{height: '15em', paddingLeft: 'unset !important'}} className="form__output">
                        <div style={{ marginLeft: 'unset !important', marginRight: 'unset !important', height: '14em' }} className="form__output">
                            <Row>
                            <Col style={{paddingTop: '0px', marginTop: '0px'}} size={5}>
                                <p className="profile-info-name">{`${users.data.firstName} ${users.data.lastName}`}</p>
                                <p className="profile-info-email">{users.data.email}</p>
                                <p className="profile-info-uuid">{users.data.uuid}</p>
                            </Col>
                            <Col size={7}>
                            <p className="profile-info-permissions">PERMISSIONS</p>
                            <p className="profile-info-role"><i className="fa-solid fa-key"></i> {users.data.role}</p>
                            <ul className="permissions-list">
                                <li>Context Profiles&nbsp; {superUsers.includes(users.data.role) ? <><i className="fa-solid fa-unlock-keyhole"></i></> : <><i className="fa-solid fa-lock"></i></>}</li>
                                <li>Query Models&nbsp; {superUsers.includes(users.data.role) ? <><i className="fa-solid fa-unlock-keyhole"></i></> : <><i className="fa-solid fa-lock"></i></>}</li>
                                <li>RAG Artifacts&nbsp; {superUsers.includes(users.data.role) ? <><i className="fa-solid fa-unlock-keyhole"></i></> : <><i className="fa-solid fa-lock"></i></>} </li>
                                <li>Settings&nbsp; <i className="fa-solid fa-unlock-keyhole"></i></li>
                            </ul>
                            </Col>
                            </Row>
                        </div>
                    </div>
            </Col>
        </Row>
        <Footer/>
        </>
    )
}

Profile.propTypes = {
  users: PropTypes.object.isRequired
}

export default Profile;