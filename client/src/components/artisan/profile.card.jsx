import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const AIProfileCard = ({agentIndex, name, icon, description, imgSrc }) => {
    // see if selected from local storage
    const [index] = useState(agentIndex);
    const [isSelected, setIsSelected] = useState(false);
    const [agenticName] = useState(name);
    const [agenticIcon] = useState(icon);
    const [agenticDescription] = useState(description);
    

    useEffect(() => {
         if(index == localStorage.getItem("active-agent")){ setIsSelected(true); }
         document.getElementById("console-agent").textContent = fetchActiveAgent();
    }, [index, isSelected, agenticName, agenticIcon, agenticDescription]);

    const onSelectHandler = () => {
        localStorage.setItem("active-agent", String(index));
        if(index == localStorage.getItem("active-agent")){ setIsSelected(true); }
        //!isSelected ? setIsSelected(isSelected) : isSelected ? setIsSelected(!isSelected) : setIsSelected(isSelected);
        document.getElementById("console-agent").textContent = fetchActiveAgent();
        console.log(`Profile Card '${agenticName}'@Index${index} Selected`)
    }

     const fetchActiveAgent = () => {
            let agenticId = localStorage.getItem("active-agent");
            if (agenticId == null || undefined) localStorage.setItem("active-agent", String(4));
            let profile;
            switch (parseInt(agenticId)) {
                case 0:
                    profile = 'Explorer'
                    break; 
                case 1:
                    profile = 'Translator'
                    break;
                case 2:
                    profile = 'Historian'
                    
                    break;
                case 3:
                    profile = 'Engineer'
                    break;
                case 4:
                    profile = 'Artificer'
                    break;
                case 5:
                    profile = 'Treasurer'
                    break;
                default:
                    profile = 'Artificer'
            }
            return profile;  
        }

    return(
    <>
        <div style={{display: 'flex', margin: 'auto'}}  onClick={() => onSelectHandler()}>
		<div className={isSelected ? "ticket-container-active main-container" : "main-container"}>
            
			<div className="poster-container">
				<div style={{position: 'relative', textAlign: 'center', color: 'white'}} onClick={() => {window.scrollTo(0, document.getElementById('mechatron').offsetTop-96)}}>
                    <img src={imgSrc} className="poster"/>
                    <div style={{position: 'absolute', top: '40%', left: '40%', bottom: '40%', right: '40%', marginLeft: '69px'}}>
                        <i style={{fontSize: '44px'}} className={icon}></i>
                        </div>
                    </div>
			</div>
			<div className={isSelected ? "ticket-container-active ticket-container" : "ticket-container"} >
				<div className="ticket__content">
					<h4 className="ticket__movie-title">&nbsp;</h4>
					<p className="ticket__movie-slogan">
						&nbsp;
					</p>
					<p className="ticket__current-price">&nbsp;</p>
					<p className="ticket__old-price">{description}</p>
					<button className="ticket__buy-btn">{name}&nbsp;<i className={icon}></i>&nbsp;</button>
				</div>
			</div>
		</div>
        </div>
    </>
    )
}

AIProfileCard.propTypes = {
    agentIndex: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.any.isRequired
}

export default AIProfileCard;