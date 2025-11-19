import React from 'react'

import Row from 'react-bootstrap/Row'

import './Footer.css'

const Footer = () => (
  <footer>
    <div className="col-md-12">
      <Row>
        <div className="footer-content">
          <p>
            made by&nbsp;
            <a
              href="https://github.com/bdhowald"
              target="_blank"
              rel="noopener noreferrer"
              className="self-link"
            >
              @bdhowald
            </a>
          </p>
        </div>
      </Row>
    </div>
  </footer>
)

export default Footer
