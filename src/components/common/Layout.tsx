import Header from "./Header"
import Container from "./Container"
import Footer from "./Footer"

const Layout = () => {
  return (
    <>
        <p id="accessibility"><a href="#container">본문바로가기</a></p>
        <Header />
        <Container />
        <Footer />
    </>
  )
}

export default Layout