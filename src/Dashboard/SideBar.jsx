
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards, HiOutlineCloudUpload } from 'react-icons/hi';
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import MobileDashboard from './MobileDashboard';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
const SideBar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className=''>
      <Sidebar aria-label="Sidebar with content separator example" className='hidden md:block '>
        <Sidebar.Logo
          className='w-10 h-10 rounded-full'
          imgAlt="Flowbite logo"
        ><Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt="User settings" img="" rounded/>}
      />
          <Link to ="/">
          <p>
            {user?.displayName}
          </p>
          </Link>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiShoppingBag}
            >
              <Link to="/admin/dashboard/favorite">
              <p>
                Favorite
              </p>
              </Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiArrowSmRight}
            >
              <Link to="/login">
              <p>
                Sign In
              </p>
              </Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiTable}
            >
              <Link to="/logout">
              <p>
                Log out
              </p>
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={RiArrowGoBackFill}
            >
              <Link to ="/">
              <p>
                Return to web
              </p>
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className='md:hidden'>
          <MobileDashboard/>
      </div>
    </div>
  )
}

export default SideBar