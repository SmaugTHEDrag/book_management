import React from 'react';
import './About.css'
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
                imageSrc="https://cdn.discordapp.com/attachments/1051127040834805864/1194644770237206639/280661399_684201749476230_7457983245617736127_n.png?ex=65b11aa4&is=659ea5a4&hm=40fefb1e04c501b350b325f29db4ec36642190825c11351351c12a9a65840fd2&"
              />
              {/* Repeat the TeamMember component for other team members */}
              <TeamMember
                name="Lê Thành Trung"
                job="Front-end, UI and Tester"
                imageSrc="https://cdn.discordapp.com/attachments/1175297910066393090/1194692533742211182/IMG_5182.jpg?ex=65ba81a0&is=65a80ca0&hm=554545e28b65faecc2d56a6aa66d1c644d2e19f1750a29ec6a7226de43cd6e68&"
              />
              <TeamMember
                name="Văn Tân Phú"
                job="Front-end, UI and Tester"
                imageSrc="https://cdn.discordapp.com/attachments/1175297910066393090/1194645011892031488/274633992_1298808633921546_3459297813985372380_n.png?ex=65b11ade&is=659ea5de&hm=c3f77113507b01dbce9ec5108854f691cc3253f7e17c525f0fd4a5dcc840bf35&"
              />
              <TeamMember
                name="Sử Tiến Long"
                job="Figma and Tester"
                imageSrc="https://cdn.discordapp.com/attachments/1051127040834805864/1194105457585958932/367993760_176917412075744_7693660866132411014_n.jpg?ex=65af245e&is=659caf5e&hm=99c8a86cc862b8001c12d271f8f84e9b6626ca760c75ec37b826481e6c2c9681&"
              />
              <TeamMember
                name="Lê Văn Hùng"
                job="Figma and Tester"
                imageSrc="https://cdn.discordapp.com/attachments/1081069042212798545/1194627484092747776/IMG_9623.png?ex=65b10a8b&is=659e958b&hm=d1e056bc7489a3496eb335fcc04b79b43d2ba7cb2550089bdd8cb8c568723a65&"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
