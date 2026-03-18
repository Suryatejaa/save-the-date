export default function DesktopBarrier() {
  return (
    <div className="desktop-barrier" role="dialog" aria-label="Mobile only content">
      <div className="barrier-phone-icon" />
      <h1 className="barrier-title">Open on<br />your phone 📱</h1>
      <p className="barrier-subtitle">
        This wedding invitation was crafted for a mobile experience. 
        For the best view, open this link on your phone.
      </p>
      <div className="barrier-tip">
        <strong>Using a PC?</strong> Press <strong>F12</strong> → Toggle Device Toolbar → Choose a phone preset
      </div>
    </div>
  );
}
