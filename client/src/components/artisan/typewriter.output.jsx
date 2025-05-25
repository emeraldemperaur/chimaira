import { useEffect } from "react";
import './typewriter.output.css';
import PropTypes from "prop-types";

const TypeWriterText = ({ autoPromptResponses, fontSize, fontFamily, letterSpacing, marginTop }) => {
    
    useEffect(() => {
       
    }, [autoPromptResponses]);

    return(
        <>
            <div id="mechatron" className="typing-prompter">
                <p style={{fontSize: fontSize, fontFamily: fontFamily, letterSpacing: letterSpacing, marginTop: marginTop}}>{autoPromptResponses}</p>
            </div>
        </>
    )
}

TypeWriterText.propTypes = {
    autoPromptResponses: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    fontFamily: PropTypes.string,
    letterSpacing: PropTypes.string,
    marginTop: PropTypes.string
}

export default TypeWriterText;