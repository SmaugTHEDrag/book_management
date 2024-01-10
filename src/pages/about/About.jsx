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
                imageSrc="https://cdn.discordapp.com/attachments/1051127040834805864/1194644770237206639/280661399_684201749476230_7457983245617736127_n.png?ex=65b11aa4&is=659ea5a4&hm=40fefb1e04c501b350b325f29db4ec36642190825c11351351c12a9a65840fd2&"
              />
              {/* Repeat the TeamMember component for other team members */}
              <TeamMember
                name="Lê Thành Trung"
                imageSrc="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/415486407_3185860665053635_6729970578739613754_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG3j6U2WNsRWHKWVWqTrsySyjcc6LSb5JXKNxzotJvklX-1UXCHpUyzcWlwCYRxb7QzAt1Xe4WCWIqs9aqr_IGO&_nc_ohc=jbWuSjw1CiMAX-Oit2_&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfA4Dyf0Sr6yyo948QeTkGi9dBU8zeni4virb5whEJh13A&oe=65A3EA8D"
              />
              <TeamMember
                name="Văn Tân Phú"
                imageSrc="https://cdn.discordapp.com/attachments/1175297910066393090/1194645011892031488/274633992_1298808633921546_3459297813985372380_n.png?ex=65b11ade&is=659ea5de&hm=c3f77113507b01dbce9ec5108854f691cc3253f7e17c525f0fd4a5dcc840bf35&"
              />
              <TeamMember
                name="Sử Tiến Long"
                imageSrc="https://cdn.discordapp.com/attachments/1051127040834805864/1194105457585958932/367993760_176917412075744_7693660866132411014_n.jpg?ex=65af245e&is=659caf5e&hm=99c8a86cc862b8001c12d271f8f84e9b6626ca760c75ec37b826481e6c2c9681&"
              />
              <TeamMember
                name="Lê Văn Hùng"
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
