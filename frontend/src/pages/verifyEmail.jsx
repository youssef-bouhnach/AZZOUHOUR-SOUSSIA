import axios from "axios"

function VerifyEmail() {
    const resendEmail = async () => {
        await axios.get('/email/resend');
        alert("Verification Email Sent!");
    }
    return (
        <>
            <h1>Check your Email</h1>
            <p>We sent a verefication link to your email address.</p>
            <button onClick={resendEmail}>Resend Email</button>
        </>
    )
}

export default VerifyEmail;