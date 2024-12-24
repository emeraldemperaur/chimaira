import { useEffect, useState } from "react";
import developerLogo from '../../assets/me-dev-logo-white.png'
import '../../styles/main.css'

const Authentication = () => {
	const [signIn, setSignIn] = useState(true);

    useEffect(() => {
        //Runs only on the first render
      }, []);
	const toggleLogin = () => {
		setSignIn(!signIn);
	}  
    return(
        <>
        <div></div>
        <section className="login">
		<div className="login_box">
			<div className="left">
				<div className="contact">
					{signIn ? 
					<>
					<form>
						<h3 className="login-form-title">SIGN IN</h3>
						<input type="email" name="username" placeholder="Username" autoComplete="username"/>
						<input type="password" name="password" placeholder="Password" autoComplete="current-password"/>
						<button type="button" className="forgot-slogan">Forgot my password</button>
						<button type="submit" className="submit">&nbsp; Log In</button>
						<button type="button" className="sign-slogan" onClick={() => toggleLogin()}>Need an account?</button>
						<button type="button" className="signin-signup" onClick={() => toggleLogin()}>Sign Up</button>
					</form>
					</> 
					: 
					<>
					<form>
						<h3 className="login-form-title">SIGN UP</h3>
						<input type="email" name="username" placeholder="Username" autoComplete="username"/>
						<input type="password" name="password" placeholder="Password" autoComplete="new-password"/>
						<input type="password" name="confirmpassword" placeholder="Confirm Password" autoComplete="new-password"/>
						<button type="submit" className="submit">Sign Up</button>
						<button type="button" className="sign-slogan" onClick={() => toggleLogin()}>Got an account?</button>
						<button type="button" className="signin-signup" onClick={() => toggleLogin()}>Sign In</button>
					</form>
					</>}
					
				</div>
			</div>
			<div className="right" style={{background: `background: linear-gradient(212.38deg, rgba(0, 0, 0, 0.7) 0%, rgba(32, 32, 32, 0.71) 100%),url('../assets/louvre.jpg') !important`}}>
				<div className="right-text">
					<h2 className="logo">Chímaira</h2>
                    <h6 className="build-text">BUILD BY</h6>
					<img src={developerLogo} className="developer-logo"/>
				</div>
			</div>
		</div>
	    </section>
        </>
    )
}

export default Authentication;