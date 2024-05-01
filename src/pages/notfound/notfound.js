import './notfound.css';
import Footer from '../../components/footer';
import React from 'react';
import Navigation from '../../components/navigation';
import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (
        <div id='notfound'>
            <Helmet>
                <title>Scout | 404 Not Found</title>
            </Helmet>
            <Navigation></Navigation>
            <header id='notfound'>
                <h1>404 | Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
            </header>
            <main>
               <p><br></br><br></br><br></br><br></br><br></br>It seems that the page you are looking for does not exist. Please check the URL and try again!<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></p>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default NotFound;