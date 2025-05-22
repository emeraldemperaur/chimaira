import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const AIProfileCard = ({agentIndex, name, icon, description }) => {
    const [index] = useState(agentIndex);
    const [isSelected, setIsSelected] = useState(false);
    const [agenticName] = useState(name);
    const [agenticIcon] = useState(icon);
    const [agenticDescription] = useState(description);

    useEffect(() => {

    }, [index, isSelected, agenticName, agenticIcon, agenticDescription]);

    const onSelectHandler = () => {
        !isSelected ? setIsSelected(true) : isSelected ? setIsSelected(false) : setIsSelected(isSelected);
        console.log(`Profile Card '${agenticName}'@Index${index} Selected`)
    }

    return(
    <>
        <div style={{display: 'flex', margin: 'auto'}}>
		<div className="main-container" onClick={() => onSelectHandler()}>
			<div className="poster-container">
				<a onClick={() => {window.scrollTo(0, document.getElementById('mechatron').offsetTop-96)}}><img src="https://i.ibb.co/ThPNnzM/blade-runner.jpg" className="poster" /></a>
			</div>
			<div className="ticket-container">
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
    description: PropTypes.string.isRequired
}

export default AIProfileCard;