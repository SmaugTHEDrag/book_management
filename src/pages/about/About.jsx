import React from 'react';
import './About.css'
import Chatbot from '../shared/ChatBot';
const TeamMember = ({ name, imageSrc, job, job2 }) => (
  <li className="team-member-listing-item text-center">
    <div className="team-member-img-wrap">
      <img src={imageSrc} alt="/" className="img-fluid" />
    </div>
    <div className="team-member-info-wrap">
      <p className='font-bold text-black'>{name}</p>
      <p className="job">{job}</p>
      <p className="job2">{job2}</p>
    </div>
  </li>
);

const About = () => (
  <section className="team-wrapper bg-green section-padding">
    <div className="team-wrap">
      <div className="team-title-wrap text-center d-block w-100">
        <h3 className="team-title dash-line">MEET OUR TEAM MEMBER</h3>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="team-member-listing">
              {/* Repeat the following TeamMember component for each team member */}
              <TeamMember
                name="Phạm Thái Nguyên"
                job="Front-end, Back-end and Database"
                imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg"
              />
              {/* Repeat the TeamMember component for other team members */}
              <TeamMember
                name="Lê Thành Trung"
                job="Front-end, UI and Tester"
                imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1400602609i/28187.jpg"
              />
              <TeamMember
                name="Văn Tân Phú"
                job="Front-end, UI and Tester"
                imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661032875i/11127.jpg"
              />
              <TeamMember
                name="Sử Tiến Long"
                job="Figma and Tester"
                imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1534298934i/862041.jpg"
              />
              <TeamMember
                name="Lê Văn Hùng"
                job="Figma and Tester"
                imageSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1567840212i/10572.jpg"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="fixed bottom-6 right-6 z-50">
      <Chatbot />
    </div>
  </section>
);


export default About;
