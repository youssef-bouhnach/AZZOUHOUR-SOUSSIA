import axios from "axios"

function VerifyEmail() {
    const resendEmail = async () => {
        await axios.get('/email/resend');
        alert("Verification Email Sent!");
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#f9f9f9",
            fontFamily: "sans-serif",
            padding: "20px",
        }}>
            <div style={{
                maxWidth: "560px",
                width: "100%",
                textAlign: "center",
            }}>
                <h1 style={{ fontSize: "42px", fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                    Verify Your Email
                </h1>
                <p style={{ color: "#888", fontSize: "15px", marginBottom: "32px" }}>
                    Check your email &amp; click the link to activate your account.
                </p>

                {/* Envelope illustration */}
                <div style={{ marginBottom: "36px" }}>
                    <svg width="260" height="210" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Envelope body */}
                        <rect x="10" y="45" width="140" height="80" rx="6" fill="#90CAF9" />
                        {/* Envelope flap */}
                        <path d="M10 45 L80 90 L150 45" fill="#64B5F6" />
                        {/* Letter */}
                        <rect x="40" y="10" width="80" height="90" rx="4" fill="#E3F2FD" />
                        <rect x="52" y="28" width="40" height="6" rx="3" fill="#90CAF9" />
                        <rect x="52" y="42" width="56" height="6" rx="3" fill="#90CAF9" />
                        {/* Green checkmark circle */}
                        <circle cx="80" cy="72" r="18" fill="#4CAF50" />
                        <path d="M71 72 L77 78 L89 66" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Resend button + helper text */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                    <button
                        onClick={resendEmail}
                        style={{
                            backgroundColor: "#42A5F5",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "10px 24px",
                            fontSize: "15px",
                            cursor: "pointer",
                            fontWeight: "500",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Resend Email
                    </button>
                    <span style={{ color: "#aaa", fontSize: "14px" }}>
                        If you didn't receive the link
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;
