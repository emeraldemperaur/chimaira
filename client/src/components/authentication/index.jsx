import { useEffect, useState } from "react";
import developerLogo from '../../assets/me-dev-logo-white.png'
import '../../styles/main.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser, signInUser } from "../../store/actions/users";
import { ToastContainer } from "react-toastify";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Authentication = () => {
	const [signIn, setSignIn] = useState(true);
	const [userExists, setUserExists] = useState(false);
	const [validUser, setValidUser] = useState(false);
	const [signedUp, setSignedUp] = useState(false);
	let navigate = useNavigate();
	//Redux -- Notifications
	const notifications = useSelector( state => state.notifications )
	const dispatch = useDispatch();
	let confirmpassword;
	useEffect(()=> {
		confirmpassword = document.getElementById('confirmpassword');
	}, [signIn])

	const schemaDefinition = (isSignIn) => {
		let yupObject;
		if(isSignIn) yupObject = Yup.object({
			email: Yup.string().trim().required('Username required').email('Invalid email addres'),
			password: Yup.string().required('Password required')
		});
		else if (!isSignIn) yupObject = Yup.object({
			email: Yup.string().trim().required('Username required').email('Invalid email addres'),
			password: Yup.string().required('Password required').min(6, 'Password must be at least 6 characters'),
			confirmpassword: Yup.string().required('Password required').min(6, 'Password must be at least 6 characters')
		});
		return yupObject;
	}

	const initFormik = useFormik({
		initialValues: { email: 'egwim.emeka@gmail.com', password: '30@Enterprise', confirmpassword: '30@Enterprise' },
		validationSchema: schemaDefinition(signIn),
		onSubmit: (values) => {
			handleSubmit(values);
		}
	});

	const handleSubmit = (values) => {
		let result;
		if(!signIn){
			// dispatch sign up
			console.log(`Sign Up form submit`)
			result = dispatch(registerUser(values));
			console.log(`Result: ${JSON.stringify(result)}`);
		}else if(signIn){
			// dispatch sign in
			console.log(`Sign In form submit`)
			result = dispatch(signInUser(values))
			console.log(`Result: ${JSON.stringify(result)}`);

		}
	}


    useEffect(() => {
        //Runs only on the first render
      }, []);
	const toggleLogin = () => {
		setSignIn(!signIn);
	}  
    return(
        <>		
      
		<Row>
		<Col size={12}>
        <section className="login">
		<div className="login_box">
			<div className="left">
				<div className="contact">
					{signIn ? 
					<>
					<form onSubmit={initFormik.handleSubmit}>
						<h3 className="login-form-title">SIGN IN</h3>
						<input onChange={initFormik.handleChange} value={initFormik.values['email']} type="email" name="username" placeholder="Username" autoComplete="username"/>
						<input onChange={initFormik.handleChange} value={initFormik.values['password']} type="password" name="password" placeholder="Password" autoComplete="current-password"/>
						<button type="button" className="forgot-slogan">Forgot my password</button>
						<button type="submit" className="submit">&nbsp; Log In</button>
						<button type="button" className="sign-slogan" onClick={() => toggleLogin()}>Need an account?</button>
						<button type="button" className="signin-signup" onClick={() => toggleLogin()}>Sign Up</button>
					</form>
					</> 
					: 
					<>
					<form onSubmit={initFormik.handleSubmit}>
						<h3 className="login-form-title">SIGN UP</h3>
						<input onChange={initFormik.handleChange} value={initFormik.values['email']} type="email" name="username" placeholder="Username" autoComplete="username"/>
						<input onChange={initFormik.handleChange} value={initFormik.values['password']} type="password" name="password" placeholder="Password" autoComplete="new-password"/>
						<input onChange={initFormik.handleChange} value={initFormik.values['confirmpassword']} type="password" name="confirmpassword" placeholder="Password" autoComplete="new-password"/>
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
		</Col>
		</Row>
        </>
    )
}

export default Authentication;