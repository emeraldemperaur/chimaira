import '../artisan/artisan.css';
import PropTypes from 'prop-types';

const FloatingAction = ({icon , onClickFunction}) => {

    return(
        <>
        <div className='fab-btn' onClick={onClickFunction}>{icon}</div>   
        </>
    )
}

FloatingAction.propTypes = {
    icon: PropTypes.object.isRequired,
    onClickFunction: PropTypes.func.isRequired
}

export default FloatingAction;