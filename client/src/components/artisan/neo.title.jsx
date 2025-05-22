import PropTypes from 'prop-types';
import '../artisan/neo.toggle.css'

const NeoTitle = ({ title, fontSize='33px', fontColor='#999 !important', 
    width='fit-content', height='fit-content', letterSpacing='0.50em', 
    fontFamily='Montserrat' }) => {
    return(
        <>
        <div style={{width: width, height: height}} className="chip">
            <p style={{fontColor: fontColor, fontSize: fontSize, 
                letterSpacing: letterSpacing, fontFamily: fontFamily}} className="agentics-heading" >
                    {title}
            </p>   
        </div>
        </>
    )
}
NeoTitle.propTypes = {
    title: PropTypes.object.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    fontSize: PropTypes.string,
    fontColor: PropTypes.string,
    letterSpacing: PropTypes.string,
    fontFamily: PropTypes.string
}
export default NeoTitle;