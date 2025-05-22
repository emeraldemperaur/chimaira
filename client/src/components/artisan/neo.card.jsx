import PropTypes from 'prop-types';
import '../artisan/neo.toggle.css'

const NeoCard = ({ width='100%', height='fit-content', marginLeft='33px !important', marginRight='33px !important', component, fillClass }) => {
    return(
        <>
        <div style={{width: width, height: height, marginLeft: marginLeft, marginRight, padding: '13px'}} className={`${`${fillClass} `}chip`}>
             {component}
        </div>
        </>
    )
}
NeoCard.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
    fillClass: PropTypes.string,
    component: PropTypes.object.isRequired
}
export default NeoCard;