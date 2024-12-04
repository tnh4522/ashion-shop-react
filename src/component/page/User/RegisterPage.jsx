import {Image} from "cloudinary-react";
import API from "../../service/service.jsx";
import React, {useState} from "react";
import {CONFIG_HEADER} from "../../service/config.jsx";
import {useNavigate, Link} from "react-router-dom";

function RegisterPage() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '' || confirmPassword === '') {
            setError('All fields are required')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match')
            return
        }
        const data = {
            username: userName,
            email: email,
            password: password,
            password2: confirmPassword,
            role:null // 5
        }
        try {
            const response = await API.post('/register', data, CONFIG_HEADER)
            if (response.status === 201) {
                navigate('/login')
                localStorage.setItem('data', JSON.stringify(response.data))
            }
        } catch (error) {
            console.log(data)
            console.log(error)
            setError('Email or Username already exists')
        }
    }
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <a href="/" className="login100-form-title p-b-48">
                            <Image
                                cloudName="dhuckb4qt"
                                publicId="My Brand/logo_as6ugx"
                                crop="scale"/>
                        </a>
                        <p style={{color: 'red'}}>{error}</p>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input className="input100" type="text" name="email" placeholder={"Email"}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input className="input100" type="text" name="username" placeholder={"Username"}
                                   onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass"><i className="zmdi zmdi-eye"></i></span>
                            <input className="input100" type="password" name="password" placeholder={"Password"}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass"><i className="zmdi zmdi-eye"></i></span>
                            <input className="input100" type="password" name="confirmPassword"
                                   placeholder={"Confirm Password"}
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn">Register</button>
                            </div>
                        </div>
                        <div className="text-center p-t-15">
                            <span className="txt1">Or login with</span>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login-with-social">
                                    <div className="module">
                                        <div className="btn-login-with-google sub-module">
                                            <img
                                                src="/login-form-v2/images/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-removebg-preview.png"
                                                alt="google" width="25" height="25"/>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="btn-login-with-facebook sub-module">
                                            <img src="/login-form-v2/images/facebook.1024x1024.png" alt="facebook"
                                                 width="25" height="25"/>
                                                 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center p-t-25">
                            <span className="txt1">Already have an account?</span>
                            <Link to="/login"> Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage