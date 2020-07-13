import React from 'react';

const UserCard: any = (props) => {
  return(
    <div>
      <h2>{props.user.name}</h2>
      <img src={props.user.profileImage} alt={props.user.name} />
    </div>
  )
};

export default UserCard;
