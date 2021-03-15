import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Image from 'next/image'
const Layout = ({children}) => {
    return (
        <div className="content">
            <Navbar/>
            {children}
            <Footer/>
            
                    
        </div>
    )
}

export default Layout;