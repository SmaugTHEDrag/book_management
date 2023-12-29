
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards, HiOutlineCloudUpload } from 'react-icons/hi';
import img from '../../src/assets/profile.jpg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import MobileDashboard from './MobileDashboard';

const SideBar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className=''>
      <Sidebar aria-label="Sidebar with content separator example" className='hidden md:block'>
        <Sidebar.Logo
          href="/"
          img={ img}
          className='w-10 h-10 rounded-full'
          imgAlt="Flowbite logo"
        >
          <p>
            {user?.displayName || "Demo User" }
          </p>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiChartPie}>
              <Link to="/admin/dashboard">
              <p>
                Dashboard
              </p>
              </Link>
            </Sidebar.Item>
            <Sidebar.Item
              icon={HiOutlineCloudUpload}>
              <Link to="/admin/dashboard/upload">
              <p>
                Upload Book
              </p>
              </Link>
            </Sidebar.Item>

            <Sidebar.Item
              icon={HiInbox}
            >
              <Link to="/admin/dashboard/manage">
              <p>
                ManageBooks
              </p>
              </Link>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiUser}
            >
              <p>
                Users
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
            >
              <p>
                Products
              </p>
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
              href="#"
              icon={HiChartPie}
            >
              <p>
                Upgrade to Pro
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
            >
              <p>
                Documentation
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiSupport}
            >
              <p>
                Help
              </p>
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