import React from 'react';
import './App.css';
import './About.css';
import BannerImage from './images/speakeasyPhoto.jpg';

const About = (props) => {
    //set up such that team member profiles are modular
    //so that you can add extra team members and they
    //will automatically look the same, using this array
    //of objects:
    let profileArray = [
      {
        "name": "Daniel Tomkovicz",
        "bio": "Daniel Tomkovicz is a Computer Science/Tisch Film major at NYU.",
        "github": "https:/github.com/dtomkovicz",
        "email": "mailto:dht253@nyu.edu"
      },
      {
        "name": "Oil Chen",
        "bio": "Oli is a student at nyu and the man behind the idea for Speakeasy.",
        "github": "https:/github.com/solidstatechen",
        "email": "mailto:oac240@nyu.edu"
      },
      {
        "name": "Sharri Glloxhani",
        "bio": "Sharri is a student at New York University. Former application developer at Cambrian Analytics.",
        "github": "https:/github.com/solidstatechen",
        "email": "mailto:sg4335@nyu.edu"
      },
      {
        "name": "Ziyan Lin",
        "bio": "Ziyan is a student at NYU.",
        "github": "https:/github.com/CH33ZED",
        "email": "mailto:bzl207@nyu.edu"
      },
      {
        "name": "Kirill Dolgin",
        "bio": "Kirill is a student at Stern NYU.",
        "github": "https:/github.com/KirDolgin",
        "email": "mailto:kd1881@stern.nyu.edu"
      },
    ]
    return (
      <div>
        <h1 align="center" id="about-title"> About Us!</h1>
        <img className="about-image" alt="" src={BannerImage} />
        <div className="about-page">
          <div className="mission-statement">
            <h2> Mission Statement:</h2>
            <section>
              <p>
                Here at Speakeasy.com we strive to provide a safe space for people all
                over the world to come together and chat anonymously. No usernames,
                no passwords, no call history! We strive to keep absolutely ZERO data
                about our users to ensure complete anominity. Even nicknames are simply
                non-unique per-session identifiers that are deleted right when you close
                the website! Grab a seat at the bar and enjoy your time here at Speakeasy.
              </p>
            </section>
          </div>
          <div className="team-profiles">
            <h2> Team Members:</h2>
            <ProfileList profiles={profileArray} />
           </div>
          </div>
          <div id = "bottom">
            <h2> All right reserved 2021 </h2>
          </div>
      </div>
    )
}

const ProfileList = (props) => {
  const profiles = props.profiles
  const profileList = profiles.map((profile) =>
    <li key={profile.name}>
      <div className="profile-details">
        <h4 className="profile-entry">
          {profile.name}
        </h4>
        <p className="profile-entry">
          {profile.bio}
        </p>
        <ul>
          <li>
            <a href={profile.github}>{profile.name}'s github account.</a>
          </li>
          <li>
            <a href={profile.email}>{profile.name}'s email link.</a>
          </li>
        </ul>
      </div>
    </li>
  )
  return (
    <ul className="profile-list">
      {profileList}
    </ul>
  )
}

export default About
