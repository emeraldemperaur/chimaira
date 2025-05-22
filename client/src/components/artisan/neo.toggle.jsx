import { useState } from "react"
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import '../artisan/neo.toggle.css'
import PropTypes from 'prop-types'



const NeoToggle = ({ setIsMultiline }) => {
    const [stackedMode, setStackedMode] = useState(false);

    const toggleStackView = () => {
        if(document.getElementById("stackedMode").checked){
            setStackedMode(true);
            setIsMultiline(true);
            console.log("Stacked Mode - ON");
        }
        if(!document.getElementById("stackedMode").checked){
            setStackedMode(false);
            setIsMultiline(false);
            console.log("Stacked Mode - OFF");
        }  
    }

    return(
        <>
        <Row className="toggle-box">
            <Col className="" style={{display: 'flex', justifyContent: 'center', marginBottom: '13px'}}>
                <label className="label">
                    <div className="toggle">
                    <input id="stackedMode" className="toggle-state" type="checkbox" name="check" value={stackedMode} onClick={()=> toggleStackView()} />
                    <div className="indicator"></div>
                    </div>
                    <div className="label-text"><i className="fa-solid fa-layer-group"></i></div>
                </label>
            </Col>
        </Row>
        </>
    )

}

NeoToggle.propTypes = {
    setIsMultiline: PropTypes.func.isRequired
}



export default NeoToggle