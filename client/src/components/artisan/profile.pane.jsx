import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import AIProfileCard from "./profile.card"
import explorerProfile from './images/traveller.png';
import artificerProfile from './images/artificer.png';
import engineerProfile from './images/engineer.png';
import historianProfile from './images/historian.png';
import translatorProfile from './images/translator-ai.png';
import treasurerProfile from './images/treasurer.png';


const AIProfilePane = () => {

    return(
        <>
        <Row>
        <Row>
            <Col size={3}>
                <AIProfileCard agentIndex={0} imgSrc={explorerProfile} name="Explorer" icon="fa-solid fa-earth-africa" description="Travel AI Agent"/>
            </Col>
             <Col size={3}>
                <AIProfileCard agentIndex={1} imgSrc={translatorProfile} name="Translator" icon="fa-solid fa-language" description="Text/Speech to Text AI Agent"/>
            </Col>
             <Col size={3}>
                <AIProfileCard agentIndex={2} imgSrc={historianProfile} name="Historian" icon="fa-solid fa-timeline" description="Historical Context AI Agent"/>
            </Col>
        </Row>
        <Row style={{marginTop: '23px'}}>
            <Col size={3}>
                <AIProfileCard agentIndex={3} imgSrc={engineerProfile} name="Engineer" icon="fa-solid fa-atom" description="Natural Sciences AI Agent"/>
            </Col>
            <Col size={3}>
                <AIProfileCard agentIndex={4} imgSrc={artificerProfile} name="Artificer" icon="fa-solid fa-terminal" description="Artisan::Artificer AI Agent"/>
            </Col>
            <Col size={3}>
                <AIProfileCard agentIndex={5} imgSrc={treasurerProfile} name="Treasurer" icon="fa-solid fa-money-check-dollar" description="Wealth Management AI Agent"/>
            </Col>
        </Row>
        </Row>
        </>
    )

}

export default AIProfilePane