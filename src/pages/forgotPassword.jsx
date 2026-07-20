import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style/auth.css'

function EmailCode({onSubmit}) {
    return (
        <div className="auth">
            <div className="auth__card">
                <Link to="/" className="brand auth__brand">
                <span className="brand__mark"><span className="brand__dot" /></span>
                <span className="brand__name">pili<span>Pilinas</span></span>
                </Link>
                <div className="auth__tag">Admin Console</div>
                <h1 className="auth__title">Forgot Password?</h1>
                <p className="auth__subtitle">Enter the code we sent to your email.</p>

                <form className="auth__form" onSubmit={(e) => {e.preventDefault(); onSubmit()}}>
                    <label className="auth__field">
                        <span>Security Code</span>
                        <input placeholder="e.g. A1B2C3" />
                    </label>

                    <button type="submit" className="btn btn--primary auth__submit">
                        Reset password
                    </button>
                </form>
            </div>
        </div>
    )
}

function PasswordReset() {
    const navigate = useNavigate()
    
    return (
        <div className="auth">
            <div className="auth__card">
                <Link to="/" className="brand auth__brand">
                <span className="brand__mark"><span className="brand__dot" /></span>
                <span className="brand__name">pili<span>Pilinas</span></span>
                </Link>
                <div className="auth__tag">Admin Console</div>
                <h1 className="auth__title">Create a new password</h1>
                <p className="auth__subtitle">Your password must be at least 8 characters.</p>

                <form className="auth__form" onSubmit={(e) => {e.preventDefault(); navigate('/admin/login')}}>
                    <label className="auth__field">
                        <span>Password</span>
                        <input type="password" placeholder="New password" />
                    </label>
                    <label className="auth__field">
                        <span>Confirm password</span>
                        <input type="password" placeholder="Re-enter password" />
                    </label>

                    <button type="submit" className="btn btn--primary auth__submit">
                        Change password
                    </button>
                </form>
            </div>
        </div>
    )
}

function ForgotPassword() {
    const [stage, setStage] = useState('verification')

    return (
        <div className='auth'>
            {stage === 'verification' ? <EmailCode onSubmit={() => setStage('success')} /> : <PasswordReset />}
        </div>
    )
}

export default ForgotPassword