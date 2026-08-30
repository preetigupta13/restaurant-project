import "../styles/global.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div>
          <h2>Food<span>ie</span></h2>
          <p>
            Delicious food made with love and delivered
            straight to your doorstep.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Menu</p>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📍 New Delhi, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ hello@foodie.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Foodie. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;