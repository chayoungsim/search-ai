import { useState } from "react"
import { Link, NavLink } from "react-router"
import { Menu, Sparkles, X } from "lucide-react"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            <header id="header">
                <div className="container header-inner">
                    <Link to="/" className="logo" onClick={closeMenu}>SEARCH<span>+</span>AI</Link>

                    <button
                        type="button"
                        className="header-toggle"
                        aria-expanded={isMenuOpen}
                        aria-controls="header-menu"
                        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <div id="header-menu" className={`header-menu${isMenuOpen ? " is-open" : ""}`}>
                        <nav className="nav" aria-label="페이지 메뉴">
                            <NavLink to="/" onClick={closeMenu}>Overview</NavLink>
                            <NavLink to="/seo" onClick={closeMenu}>SEO</NavLink>
                            <NavLink to="/aeo" onClick={closeMenu}>AEO</NavLink>
                            <NavLink to="/geo" onClick={closeMenu}>GEO</NavLink>
                            <NavLink to="/strategy" onClick={closeMenu}>Strategy</NavLink>
                        </nav>

                        <div className="header-actions">
                            <Link
                                to="/audit"
                                className="cta-button cta-button-secondary header-cta"
                                onClick={closeMenu}
                            >
                                무료 진단
                                <Sparkles size={14} aria-hidden="true" />
                            </Link>
                            <Link
                                to="/contact"
                                className="cta-button header-cta"
                                onClick={closeMenu}
                            >
                                상담 신청
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`header-backdrop${isMenuOpen ? " is-open" : ""}`}
                aria-hidden="true"
                onClick={closeMenu}
            />
        </>
    )
}

export default Header
