import { Routes, Route } from "react-router"
import Layout from "@/components/common/Layout"
import Overview from "@/pages/Overview"
import SEO from "@/pages/SEO"
import AEO from "@/pages/AEO"
import GEO from "@/pages/GEO"
import Strategy from "@/pages/Strategy"
import Audit from "@/pages/Audit"
import Contact from "@/pages/Contact"

function App() {
  return (
    <Routes>
        <Route  element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/seo" element={<SEO />} />
            <Route path="/aeo" element={<AEO />} />
            <Route path="/geo" element={<GEO />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/contact" element={<Contact />} />
        </Route>      
    </Routes>
  )
}

export default App
