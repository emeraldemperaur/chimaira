import Row from 'react-bootstrap/esm/Row';
import '../artisan/neo.toggle.css'
import Col from 'react-bootstrap/esm/Col';
import { useEffect } from 'react';

const ChimeraOutput = () => {  
    useEffect(() => {
       
      
    }, []);

    const outputToggle = () => {
        const play = document.getElementById('play');
        const pause = document.getElementById('pause');
        const playBtn = document.getElementById('circle__btn');
        //const wave1 = document.getElementById('circle__back-1');
        //const wave2 = document.getElementById('circle__back-2');
        pause.classList.toggle('visibility');
        play.classList.toggle('visibility');
        playBtn.classList.toggle('shadow');
        //wave1.classList.toggle('paused');
        //wave2.classList.toggle('paused');
    }
    
    return(
        <>
        <Row style={{display:'flex', justifyContent: 'center', marginTop: '69px'}}>
            <Col>
                <div className="circle" onClick={() => outputToggle()}>
                    <span id="circle__btn" className="circle__btn">
                        <i style={{fontSize: '33px'}} className="pause fa-solid fa-brain" name="pause" id="pause"></i>
                        <i style={{fontSize: '33px'}} className="play fa-regular fa-comment" name="play" id="play"></i>
                    </span>
                    <span id='circle__back-1' className="circle__back-1"></span>
                    <span id='circle__back-2' className="circle__back-2"></span>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '63px'}}>
            <Col size={12}>
                <div className='form__output' style={{paddingTop: '9px', width: '100vw', height: '55px'}}>
                    <p className='mechatron-output-head'><i className="fa-solid fa-microchip"></i> RAG OUTPUT</p>
                </div>
                <textarea disabled id='mechatron-output' style={{ minHeight: '8rem'}} type="text" className="form__output"
                value={'>_ This is the test output console'} placeholder=">_"/>
            </Col>
        </Row>
        </>
    )

}

export default ChimeraOutput;