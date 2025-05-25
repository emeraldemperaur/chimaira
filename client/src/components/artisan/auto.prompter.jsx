/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import TypeWriterText from "./typewriter.output";

const AutoPrompter = ({profileIndex, responsesDictionary}) => {
    const [agentId] = useState(profileIndex);
    let [response, setResponse] = useState('');

    const responses = {
        explorer: ["What can I help you with today?", "What would you like to know?", "How can I be of assistance?", "What's our next focus or interest?"],
        translator: ["What can I help you better understand?", "What would you like me to do for you?", "How may I be of assistance?", "Let me know what you want to know?"],
        historian: ["Anything of interest you might need help with?", "What would you like me to contextualize for you?", "How may I be of assistance?", "Ask me for help with anything?"],
        engineer: ["What would you like me to assist with?", "What would you like me to help with?", "What would you like me to assist with?", "How can I help with your project?"],
        artificer: ["How can I help you today?" , "How may I be of assistance?", "What would you like me to help with?", "Need help with anything?"],
        treasurer: ["What task would you like my help with?", "How can I help with your budget?", "What would you like me to do for you?"]
    }
    responsesDictionary = responses;

    useEffect(() => {
        generateResponse();
    }, [agentId])
    
    const generateResponse = () => {
        switch (agentId) {
            case 0:
                response = responsesDictionary.explorer[2]
                setResponse(response);
                console.log(response)
            break;
            case 1:
                response = responsesDictionary.translator[2]
                setResponse(response);
                console.log(response)
            break;
            case 2:
                response = responsesDictionary.historian[2]
                setResponse(response);
                console.log(response)
            break;
            case 3:
                response = responsesDictionary.engineer[2]
                setResponse(response);
                console.log(response)
            break;
            case 4:
                response = responsesDictionary.artificer[3]
                setResponse(response);
                console.log(response)
            break;
            case 5:
                response = responsesDictionary.treasurer[2]
                setResponse(response);
                console.log(response)
            break;
            default:
                response = responsesDictionary.artificer[3]
                setResponse(response);
                console.log(response)
            }
    }


    return(
        <>
        <div style={{ marginTop: '33px'}}>
        <TypeWriterText autoPromptResponses={response}/>
        </div>
        </>
    )
}

AutoPrompter.propTypes = {
  profileIndex: PropTypes.number.isRequired,
  responsesDictionary: PropTypes.object.isRequired
}

export default AutoPrompter;