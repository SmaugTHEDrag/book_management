import React from 'react';
import './About.css'
const TeamMember = ({ name, imageSrc, socialMediaLinks }) => (
  <li className="team-member-listing-item text-center">
    <div className="team-member-img-wrap">
      <img src={imageSrc} alt="/" className="img-fluid" />
    </div>
    <div className="team-member-info-wrap">
      <p className='font-bold text-black'>{name}</p>
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
                imageSrc="https://cdn.discordapp.com/attachments/984481824065617952/1100315739916873768/338940319_244271794681709_3908198250391232581_n.jpg"
              />
              {/* Repeat the TeamMember component for other team members */}
              <TeamMember
                name="Lê Thành Trung"
                imageSrc="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/369209682_143725865400335_1970477301954967517_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGoq0aFGdXLz6_YjlUwCYAVrmeoU3Eb1UauZ6hTcRvVRqSfaHXdilBWP0IUGfPRUpPcU_QwZkTRIx1vnhOpAcUq&_nc_ohc=CZ97a7S17csAX_QNzJD&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTyfVGfMDA_G4wqiYtwOxQbnOPhXtAYbhaFFUOW_oHljg&oe=65BE33BD"
              />
              <TeamMember
                name="Văn Tân Phú"
                imageSrc="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/342546150_168355536177282_6679907850113261837_n.png?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFigWckWkeXj0yj4rkGz3xRBXaafEAmqbsFdpp8QCapu_-EYA_g4YuDDFbEgUsZ2ckQDhYr55ZbL-7Sp2FgNQMd&_nc_ohc=PlPZzeDE-EUAX-xanRe&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQJJh2JJ_NUYntTPoYw3Nx-06BFngPZJI1vCEmDhQjF2A&oe=65C424ED"
              />
              <TeamMember
                name="Sử Tiến Long"
                imageSrc="https://cdn.discordapp.com/attachments/1051127040834805864/1194105457585958932/367993760_176917412075744_7693660866132411014_n.jpg?ex=65af245e&is=659caf5e&hm=99c8a86cc862b8001c12d271f8f84e9b6626ca760c75ec37b826481e6c2c9681&"
              />
              <TeamMember
                name="Lê Văn Hùng"
                imageSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
