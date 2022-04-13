import React from 'react';
import { useParams } from "react-router-dom";

export default function User() {
    const { username } = useParams();
    console.log(username);

    return (
      <div>
        <h2>User...</h2>
      </div>
    )
}
