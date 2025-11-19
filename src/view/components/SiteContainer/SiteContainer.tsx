import React, { ReactNode } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Footer from 'view/components/Footer/Footer'
import Navigation from 'view/components/Navigation/Navigation'

import './SiteContainer.css'

const SiteContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="site-container-wrapper">
      <Container fluid className="site-container">
        <Navigation />
        <main>
          <Row>{children}</Row>
        </main>
        <Footer />
      </Container>
    </div>
  )
}

export default SiteContainer
