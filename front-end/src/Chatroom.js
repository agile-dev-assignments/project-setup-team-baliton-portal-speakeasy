import React from 'react'

const Chatroom = () => {

    let userArray = [
        {
          "name": "Daniel",
        },
        {
          "name": "Oli Chen",
        },
        {
          "name": "Sharri Glloxhani",
        },
        {
          "name": "Ziyan Lin",
        },
        {
          "name": "Kirill Dolgin",
        },
      ]

    return (
        <div>
            <h1>Welcome to *insertChatroomName</h1>
            
            <div class="speakersPool">
                <UserList profiles={userArray} />
            </div>

            <button>Join Speakers</button>

            <div class="listenersPool">
                <UserList profiles={userArray} />
            </div>

        </div>
    )
}


const UserList = (props) => {
    const profiles = props.profiles
    const userList = profiles.map((profile) => 
      <li key={profile.name}>
        <div className="profile-details">
          <h4 className="profile-entry">
            {profile.name}
          </h4>
          <p className="profile-entry">
            {profile.bio}
          </p>
          {/*}
          <ul>
            <li>
              <a href={profile.github}>{profile.name}'s github account.</a>
            </li>
            <li>
              <a href={profile.email}>{profile.name}'s email link.</a>
            </li>
          </ul>
*/}
        </div>
      </li>
    )
    return (
      <ul className="user-list">
        {userList}
      </ul>
    )
  }

  export default Chatroom