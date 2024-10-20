import {React, useState} from 'react'
import searchIcon from '../assets/icons/search-normal.svg'
import calenderIcon from '../assets/icons/calendar-2.svg'
import messageIcon from '../assets/icons/message-question.svg'
import bellIcon from '../assets/icons/notification.svg'
import profileImage from '../assets/icons/profileImage.png'
import dropdown from '../assets/icons/dropdown.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NotificationPopup from './notiPopup'

const Navbar = ({loginStatus, setLoginStatus}) => {
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    const toggleNotificationPopup = () => {
        setShowNotificationPopup(!showNotificationPopup);
    };
    const navigate = useNavigate()
    const onLogout = ()=>{
        toast("Logout successful")
        setTimeout(()=>{
            localStorage.clear();
            setLoginStatus(false)
            navigate('/signup')
        },2000)
    }
  return (
    <nav className='flex justify-between items-center py-4 px-6 absolute w-4/5 '>
        <div className="left flex gap-3 items-center bg-[#F5F5F5] w-1/3 h-11 rounded-md px-2">
            <img className='bg-[#F5F5F5] w-6 h-6' src={searchIcon} alt="" />
            <input className=' outline-none border-none focus:outline-none focus:border-none bg-[#F5F5F5] w-full' type="search" name="searchProject" id="searchProject" placeholder='Search for anything...'/>
        </div>

        <div className="right flex gap-6">
            <div className="icons flex gap-6 items-center">
                <img src={calenderIcon} alt="icon1" className='w-6 cursor-pointer h-6'/>
                <img src={messageIcon} alt="icon2" className='w-6 cursor-pointer h-6'/>
                <img src={bellIcon} alt="icon3" className='w-6 h-6 cursor-pointer' onClick={toggleNotificationPopup}/>
                <NotificationPopup isVisible={showNotificationPopup} />
            </div>
            {loginStatus ? (
            // <div className="profile flex gap-6 text-right">
            //     <div className="decription">
            //         <p className='m-0 p-0 text-[#0D062D] text-base not-italic font-normal '>Aryan yadav</p>
            //         <p className='m-0 p-0 text-[#787486]'>UP, India</p>
            //     </div>
            //     <div className="images flex items-center gap-2">
            //         <img className='rounded-full w-12 h-12' src={profileImage} alt="" />
            //         <img className='h-5 w-5 cursor-pointer' src={dropdown} alt="" />
            //     </div>
            // </div>

            <p onClick={onLogout} className='px-5 py-3 text-white bg-[#5030E5] rounded-md cursor-pointer'>Logout</p>
           
            ) : (
                <Link to="/signup">
            <p className='px-5 py-3 text-white bg-[#5030E5] rounded-md cursor-pointer'>Sign up</p>
            </Link>
            )}
        </div>
    </nav>
  )
}

export default Navbar
