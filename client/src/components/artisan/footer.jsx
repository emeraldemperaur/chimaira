import developerLogo from '../../assets/me-dev-logo-black.png'


const Footer = () => {

    return(
    <>
    <div id='footer'>
        <p className="footer">BUILD BY</p>
        <a href='https://www.mekaegwim.ca/' target='_blank'>
        <img className="footer-img" src={developerLogo}/>
        </a>
    </div>
    </>
    );

}

export default Footer;