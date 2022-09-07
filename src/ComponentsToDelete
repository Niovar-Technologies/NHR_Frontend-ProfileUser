import LoginLayout from "../Containers/LoginLayout";
import logo from '../static/img/logobig.jpeg'
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    return (
        <LoginLayout>
            <img onClick={() => {navigate('/')}} className="img-fluid logo-dark mb-2" src={logo} alt="Logo"/>
            <div className="loginbox">
                <div className="login-right">
                    <div className="login-right-wrap">
                        <h1>Login</h1>
                        <p className="account-subtitle">Access to our dashboard</p>
                        <form action="">
                            <div className="form-group">
                                <label className="form-control-label">Email Address</label>
                                <input type="email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Password</label>
                                <div className="pass-group">
                                    <input type="password" className="form-control pass-input"/>
                                    <span className="fas fa-eye toggle-password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb1"/>
                                            <label className="custom-control-label" htmlFor="cb1">Remember
                                                me</label>
                                        </div>
                                    </div>
                                    <div className="col-6 text-right">
                                        <a className="forgot-link" onClick={() => {navigate('/forgot-password/')}}>Forgot Password ?</a>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-lg btn-block" style={{backgroundColor: "#000032", color: "white"}} type="submit">Login</button>
                            <div className="login-or">
                                <span className="or-line" />
                                <span className="span-or">or</span>
                            </div>

                            <div className="social-login mb-3">
                                <span>Login with</span>
                                <a href="#" className="facebook"><i className="fab fa-facebook-f" /></a><a
                                href="#"
                                className="google"><i
                                className="fab fa-google" /></a>
                            </div>

                            <div className="text-center dont-have">Don't have an account yet? <a
                                onClick={() => {navigate('/register/')}}>Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LoginLayout>
    );
}

export default Login;