import React from 'react';
import Header from '../components/Header/Header';
 
export default function BasicLayout(props) {
    const { children } = props;
 
    return (
      <>
        <Header />
        <div className="container">
          { children }
        </div>
      </>
    )
}