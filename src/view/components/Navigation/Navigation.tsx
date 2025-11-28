import React, { ReactNode, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLinkProps } from 'react-bootstrap/NavLink'
import Row from 'react-bootstrap/Row'
import { Link, useLocation } from 'react-router-dom'

import L10N from 'constants/display'
import regexps from 'constants/regexps'
import { USE_NEW_STYLE_DISPLAY_STORAGE_KEY } from 'constants/storage'
import useSettings from 'hooks/useSettings/useSettings'

import './Navigation.css'

const NavLinkWithActive = ({
  children,
  to,
  ...props
}: {
  children: ReactNode
  to: string
} & NavLinkProps) => {
  const location = useLocation()

  const pathname = location.pathname
  const searchParams = location.search

  const isPathActive =
    pathname === to ||
    (regexps.lookups.uniqueIdentifier.test(pathname) &&
      to === L10N.pages.search.pathname)

  return (
    <Nav.Link
      active={isPathActive}
      className={isPathActive ? 'fw-bold' : ''}
      to={`${to}${searchParams}`}
      {...props}
    >
      {children}
    </Nav.Link>
  )
}

const Navigation = () => {
  const { getSetting } = useSettings()
  const useNewStyleDisplay =
    getSetting(USE_NEW_STYLE_DISPLAY_STORAGE_KEY) === true

  const newStyleDisplayClassName = useNewStyleDisplay ? 'new-style' : ''

  const [navBarIsOpen, setNavBarIsOpen] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)
  const ignoreBlurRef = useRef(false)
  const blurHappenedRef = useRef(false)

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    blurHappenedRef.current = false

    const target = e.target as HTMLElement
    const isNavBarToggle = target.closest('.navbar-toggler')
    const isNavLink = target.closest('.nav-link')

    if (isNavLink) {
      // nav link → ignore blur
      ignoreBlurRef.current = true
      return
    }

    if (isNavBarToggle) {
      // toggle: let click logic decide, but:
      // blur should run normally so toggle-click won't reopen after closing
      ignoreBlurRef.current = false
      return
    }

    // inside nav but not link → collapse
    ignoreBlurRef.current = false
  }

  const handleBlur = () => {
    if (!ignoreBlurRef.current) {
      blurHappenedRef.current = true
      setNavBarIsOpen(false)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const isNavBarToggle = target.closest('.navbar-toggler')
    const isNavLink = target.closest('.nav-link')

    // Always clear ignoreBlur after click
    ignoreBlurRef.current = false

    // Nav link → do nothing
    if (isNavLink) {
      return
    }

    // Toggle button → toggle open/close, unless blur just ran
    if (isNavBarToggle) {
      if (!blurHappenedRef.current) {
        setNavBarIsOpen((prev) => !prev)
      }
      return
    }

    // Any other div inside nav → toggle
    setNavBarIsOpen(false)
  }

  return (
    <Container
      className={`nav-bar-container ${newStyleDisplayClassName}`}
      fluid
    >
      <Row>
        <Navbar
          expand="lg"
          expanded={navBarIsOpen}
          ref={navRef}
          onPointerDown={handlePointerDown}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" data-testid="navbar-collapse">
            <Nav className="me-auto">
              <NavLinkWithActive as={Link} to="/">
                Search
              </NavLinkWithActive>
              <NavLinkWithActive as={Link} to="/updates">
                Updates
              </NavLinkWithActive>
              <NavLinkWithActive as={Link} to="/faqs">
                FAQs
              </NavLinkWithActive>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  )
}

export default Navigation
