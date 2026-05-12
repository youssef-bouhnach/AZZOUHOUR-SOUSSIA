import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios, { getImageUrl } from "../config/api";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/GreenFooter.jsx";
import "../styles/profile.css";

function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing]     = useState(false);
  const [name, setName]           = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview]     = useState(null);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const fileInputRef              = useRef(null);

  if (!user) {
    navigate("/login?redirect=/profile");
    return null;
  }

  const avatarSrc = preview
    || (user.avatar ? getImageUrl(user.avatar) : null);

  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const initials = user.name
    .split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await axios.post("/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data);
      setEditing(false);
      setAvatarFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setName(user.name);
    setAvatarFile(null);
    setPreview(null);
    setError("");
  };

  return (
    <>
      <Navbar />
      <main className="page_content">
        <div className="profile_page">
        {/* ── Header banner ── */}
        <div className="profile_banner">
          {/* Avatar */}
          <div
            className="profile_avatar_wrapper"
            onClick={() => editing && fileInputRef.current.click()}
            title={editing ? "Click to change photo" : ""}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt={user.name} className="profile_avatar_img" />
            ) : (
              <div className="profile_avatar_initials">{initials}</div>
            )}
            {editing && (
              <div className="profile_avatar_overlay">📷</div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />

          {/* Name */}
          <div className="profile_banner_info">
            {editing ? (
              <input
                className="profile_name_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            ) : (
              <h1 className="profile_name">{user.name}</h1>
            )}
          </div>

          {/* Edit / Save buttons */}
          <div className="profile_banner_actions">
            {editing ? (
              <>
                <button className="profile_save_btn" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "✓ Save"}
                </button>
                <button className="profile_cancel_btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="profile_edit_btn" onClick={() => setEditing(true)}>
                ✏️ Edit profile
              </button>
            )}
          </div>
        </div>

        {error && <p className="profile_error">{error}</p>}

        {/* ── Tabs ── */}
        <div className="profile_tabs">
          <span className="profile_tab active">About</span>
          <span className="profile_tab" onClick={() => navigate("/orders")}>My Orders</span>
        </div>

        {/* ── About section ── */}
        <div className="profile_about">
          <h2>About</h2>
          <p><span>Email: </span><strong>{user.email}</strong></p>
          <p><span>Member since: </span><strong>{memberSince}</strong></p>
          {user.role === "admin" && (
            <p><span>Role: </span><strong style={{ color: "#1f4f46" }}>Administrator</strong></p>
          )}
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
