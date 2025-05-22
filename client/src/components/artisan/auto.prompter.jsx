/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AutoPrompter = ({profileIndex, responsesDictionary}) => {
    const [agentId] = useState(profileIndex);
    let [response, setResponse] = useState('');

    const responses = {
        explorer: ["Explorer Test", "Explorer Test 2", "Explorer Test 3"],
        translator: ["Translator Test", "Translator Test 2", "Translator Test 3"],
        historian: ["Historian Test", "Historian Test 2", "Historian Test 3"],
        engineer: ["Engineer Test", "Engineer Test 2", "Engineer Test 3"],
        artificer: ["How can I help you, Artificer Test?", "Artificer Test 2", "Artificer Test 3"],
        treasurer: ["Treasurer Test", "Treasurer Test 2", "Treasurer Test 3"]
    }
    responsesDictionary = responses;

    useEffect(() => {
        generateResponse();
    }, [agentId])
    
    const generateResponse = () => {
        switch (agentId) {
            case 0:
                response = responsesDictionary.explorer[0]
                setResponse(response);
                console.log(response)
            break;
            case 1:
                response = responsesDictionary.translator[0]
                setResponse(response);
                console.log(response)
            break;
            case 2:
                response = responsesDictionary.historian[0]
                setResponse(response);
                console.log(response)
            break;
            case 3:
                response = responsesDictionary.engineer[0]
                setResponse(response);
                console.log(response)
            break;
            case 4:
                response = responsesDictionary.artificer[0]
                setResponse(response);
                console.log(response)
            break;
            case 5:
                response = responsesDictionary.treasurer[0]
                setResponse(response);
                console.log(response)
            break;
            default:
                response = responsesDictionary.artificer[0]
                setResponse(response);
                console.log(response)
            }
    }


    return(
        <>
        <p id='mechatron' className="prompter-response">{response}</p>
       
        </>
    )
}

AutoPrompter.propTypes = {
  profileIndex: PropTypes.number.isRequired,
  responsesDictionary: PropTypes.object.isRequired
}

export default AutoPrompter;