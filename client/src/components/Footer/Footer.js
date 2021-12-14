import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return <FooterContainer >
        <div >
        <span style={{  }} >
        All Rights reserved by us.  BlockBlog <b>&copy;{new Date().getFullYear()}  </b> 
        </span>
        </div>
    </FooterContainer>;
};

export default Footer

const FooterContainer = styled.footer`
    height: 2rem ;  
    position: fixed;
    left: 0;
    background: #000000;
    bottom: 0 ;
    color: #ffff;
    width: 106%;    
`;