import {Image} from "cloudinary-react";

function LoginPage() {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-48"><Image cloudName="dhuckb4qt"
                                                                            publicId="My Brand/logo_as6ugx"
                                                                            crop="scale"/></span>
                        <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                            <input className="input100" type="text" name="email"/>
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <span className="btn-show-pass"><i className="zmdi zmdi-eye"></i></span>
                            <input className="input100" type="password" name="pass"/>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn">Login</button>
                            </div>
                        </div>
                        <div className="text-center p-t-15">
                            <span className="txt1">Forgot</span>
                            <a className="txt2" href="#"> Username / Password?</a>
                        </div>
                        <div className="text-center p-t-15">
                            <span className="txt1">Or login with</span>
                        </div>
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login-with-social">
                                    <div className="module">
                                        <div className="btn-login-with-google sub-module">
                                            <img src="/login-form-v2/images/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-removebg-preview.png" alt="google" width="25" height="25"/>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="btn-login-with-facebook sub-module">
                                            <img src="/login-form-v2/images/facebook.1024x1024.png" alt="facebook" width="25" height="25"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center p-t-25">
                            <span className="txt1">Don’t have an account? </span>
                            <a className="txt2" href="#"> Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage