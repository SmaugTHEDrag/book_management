import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag,
  HiSupport, HiTable, HiUser, HiViewBoards, HiOutlineCloudUpload,
  HiArrowSmLeft, HiHeart
} from 'react-icons/hi';

import img from '../../src/assets/profile.jpg';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import MobileDashboard from './MobileDashboard';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Desktop Sidebar */}
      <Sidebar aria-label="Sidebar with content separator example" className='hidden md:block'>
        <Sidebar.Logo
          href="/"
          img={img}
          className='w-10 h-10 rounded-full'
          imgAlt="Flowbite logo"
        >
          <p>{user?.login || "Demo User"}</p>
        </Sidebar.Logo>

        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
              Upload Book
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
              Manage Books
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/manage-users" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/favorite" icon={HiHeart}>
              Favorite
            </Sidebar.Item>
            <Sidebar.Item href="/" icon={HiArrowSmLeft}>
              Back to Home
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={HiTable}>
              Log out
            </Sidebar.Item>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Upgrade to Pro
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              Documentation
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiSupport}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Mobile Sidebar */}
      <div className='md:hidden'>
        <MobileDashboard />
      </div>
    </div>
  );
};

export default SideBar;
