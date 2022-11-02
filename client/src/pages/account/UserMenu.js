import icons from '../../assets/img/icons.svg'
import { useSelector } from 'react-redux';

const UserMenu = () => {
    const { role } = useSelector((store) => store.user);
    return (
            <nav className='user-view__menu'>
                <ul className="side-nav">
                    <NavItem link={'#'} text={'Settings'} icon={'settings'} active={true} />
                    <NavItem link={'/my-tours'} text={'My bookings'} icon={'briefcase'} />
                    <NavItem link={'#'} text={'My reviews'} icon={'star'} />
                    <NavItem link={'#'} text={'Billing'} icon={'credit-card'} />
                </ul>
                {role === 'admin' && <AdminNav />}
            </nav>
    )
};

const NavItem = ({link, text, icon, active}) => {
    return (
        <li className={`${active ? 'side-nav--active' :''}`}>
            <a href={`${link}`}>
                <svg     
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    {/* <use xlinkHref={require('../../assets/img/icons.svg#icon-map-pin')}></use> */}
                    <use xlinkHref={`${icons}#icon-${icon}`}></use>
                </svg>
                {text}
            </a>
        </li>
    )
};

const AdminNav = () => {
    return (
        <div className='admin-nav'>
            <h5 className="admin-nav__heading">Admin</h5>
                <ul className="side-nav">
                    <NavItem link={'#'} text={'Manage tours'} icon={'map'} />
                    <NavItem link={'#'} text={'Manage users'} icon={'users'} />
                    <NavItem link={'#'} text={'Manage reviews'} icon={'star'} />
                    <NavItem link={'#'} text={'Manage bookings'} icon={'briefcase'} />
                </ul>
        </div>
    )
}

export default UserMenu;