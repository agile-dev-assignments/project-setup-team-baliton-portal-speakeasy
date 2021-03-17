import React from 'react'
import './App.css';
import './About.css'

const About = (props) => {
    let profileArray = [
      {
          "name": "Daniel Tomkovicz",
          "bio": "Daniel Tomkovicz is a Computer Science/Tisch Film major at NYU.",
          "github": "github.com/dtomkovicz",
          "email": "mailto:dht253@nyu.edu"
      },
      {
          "name": "Oil(temp)",
          "bio": "Oli is a studnet at nyu(temp).",
          "github": "github.com/dtomkovicz",
          "email": "mailto:dht253@nyu.edu"
      }
    ]
    return (
        <div>
            <div className="about-page">
            <h1> About Us!</h1>
            <div className="mission-statement">
              <img alt="about us" src="https://3.bp.blogspot.com/-rb22vMxHb3g/UaYr1iAdrKI/AAAAAAAAAFY/zvGCTnAnZPY/s1600/The-Speakeasy-Revisited.jpg" />
              <h2> Mission Statement:</h2>
              <p>
                Here at Speakeasy.com we strive to provide a safe space for people all 
                over the world to come together and chat anonymously. No usernames, 
                no passwords, no call history! We strive to keep absolutely ZERO data 
                about our users to ensure complete anominity. Even nicknames are simply 
                non-unique per-session identifiers that are deleted right when you close 
                the website! Grab a seat at the bar and enjoy your time here at Speakeasy.
              </p>
            </div>
            <div className="team-profiles">
              <h2> Meet the Team:</h2>
              <h4> Daniel Tomkovicz</h4>
              <p>
                Daniel Tomkovicz is a Computer Science/Tisch Film major at NYU.
                (maybe add: email links, github account links)
              </p>
              <h4> team member 2</h4>
              <p>
                Place holder team member 2
                (maybe add: email links, github account links)
              </p>
              <h4> team member 3</h4>
              <p>
                Place holder team member 3
                (maybe add: email links, github account links)
              </p>
              <h4> team member 4</h4>
              <p>
                Place holder team member 4
                (maybe add: email links, github account links)
              </p>
              <h4> team member 5</h4>
              <p>
                Place holder team member 5
                (maybe add: email links, github account links)
              </p>
            </div>
            <ProfileList profiles={profileArray} />
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
      <div className="ProfileEntry">
        <h4>
          {profile.name}
      </h4>
        <p>
          {profile.bio}
        </p>
        <a href={profile.github}>{profile.name}'s github account.</a>
        <a href={profile.email}>{profile.name}'s email link.</a>
      </div>
    </li>
  )
  return (
    <ul>{profileList}</ul>
  )
}

export default About
