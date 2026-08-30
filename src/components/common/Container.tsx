import { Outlet } from "react-router"


const Container = () => {
  return (
    <div id="container">
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Container