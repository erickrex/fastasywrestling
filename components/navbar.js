import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => {
    return(
        <nav className="App-header">
            <div>
                <h1>Make your predictions for the Royal Rumble</h1>
            </div>
            <div className={styles.navBarMain}>
                <Link href='/'><a>Current Events</a></Link>
                <Link href='/'><a>Previous Events</a></Link>
                <Link href='/'><a>Leaderboard</a></Link>
            </div>
        </nav>

    )
}

export default Navbar;