import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [showNav, setShowNav] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Check if user is logged in and get their role
        // This is a placeholder. You should implement proper auth state management
        const loggedInRole = localStorage.getItem('userRole');
        if (loggedInRole) {
            setIsLoggedIn(true);
            setUserRole(loggedInRole);
        }

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const threshold = 50;
            setIsScrolled(scrollTop > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setShowNav(false);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        // Implement logout logic here
        setIsLoggedIn(false);
        setUserRole('');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <div className={`saanjh ${isScrolled ? 'scrolled' : ''}`}>
            <div className='project'>
                <header>
                    <div className={`headerchange ${isScrolled ? 'scrolled' : ''}`}>
                        <div className='mainheader'>
                            <div className='newthing'>
                                <div className='projectname'>
                                    
                                    <h2>Saanjh Sahayak</h2>
                                </div>
                                <div className='symbol' onClick={toggleNav}>
                                    <span>&#9776;</span>
                                </div>
                            </div>
                            
                            <div className={`navigation ${showNav ? 'show' : ''}`}>
                                <nav className='navbar'>
                                    <div className='navbar-child'>
                                        <ul className='navbar-elements'>
                                            <li onClick={() => handleNavigation('/')}>
                                                <a>Home</a>
                                            </li>
                                            <li onClick={() => handleNavigation('/about')}>
                                                <a>About Us</a>
                                            </li>
                                            {isLoggedIn && (
                                                <>
                                                    {userRole === 'Doctor' && (
                                                        <li onClick={() => handleNavigation('/Doctors')}>
                                                            <a>Patients</a>
                                                        </li>
                                                    )}
                                                    {userRole === 'Caretaker' && (
                                                        <li onClick={() => handleNavigation('/Caretakers')}>
                                                            <a>Patients</a>
                                                        </li>
                                                    )}
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                    <div className='joinin'>
                                        {!isLoggedIn ? (
                                            <p onClick={handleLogin}>Login</p>
                                        ) : (
                                            <p onClick={handleLogout}>Logout</p>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;