import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/user';
import { toast } from "react-toastify";

export default function Profile(props) {
    const { username } = props;
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username }
    });

    if(loading) return (<p>loading data...</p>);
    if(error && !data) return (<div>{ toast.error(error.message, { toastId: "error1"}) }</div>)
    const { getUser } = data;

    console.log(getUser);

    return (
        <div>
            <h1>username: {`${username}`}</h1>
            
        </div>
    )
}
