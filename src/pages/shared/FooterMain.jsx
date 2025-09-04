import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsLink, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { Link } from "react-router-dom";
const FooterMain = () => {
  return (
    <Footer bgDark>
      <div className="w-full px-4 lg:px-24">
        <div className="grid w-full grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white">Online Books</h3>
              <p className="text-gray-400 mt-2">
                Discover your next favorite read with our curated collection of digital books.
              </p>
            </div>
          </div>
          
          <div>
            <Footer.Title title="Quick Links" />
            <Footer.LinkGroup col>
              <Footer.Link className="hover:text-blue-400 transition-colors"><Link to = "/about">
                About Us</Link>
              </Footer.Link>
              <Footer.Link className="hover:text-blue-400 transition-colors"><Link to = "/library">
                Browse Books</Link>
              </Footer.Link>
              <Footer.Link className="hover:text-blue-400 transition-colors"><Link to = "/blog">
                Blogs</Link>
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          
          <div>
            <Footer.Title title="Support" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" className="hover:text-blue-400 transition-colors">
                Help Center
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-blue-400 transition-colors">
                FAQ
              </Footer.Link>
              <Footer.Link href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        
        <div className="w-full border-t border-gray-600 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Online Books"
            href="#"
            year={2025}
            className="text-gray-400"
          />
          <div className="mt-6 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.linkedin.com/in/nguyen-pham-1592212a0"
              target='_blank'
              icon={BsLinkedin}
              className="hover:text-blue-500 transition-colors duration-200"
            />
            <Footer.Icon
              href="https://github.com/SmaugTHEDrag"
              target='_blank'
              icon={BsGithub}
              className="hover:text-gray-300 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterMain;