import React, { useEffect } from 'react';
import './home.css';
import ScrollReveal from 'scrollreveal';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import splashSGV from '../../assets/headerSVG.svg'; // Import your SVG file
import moderation from '../../assets/moderation.svg';
import logging from '../../assets/logging.svg';
import utility from '../../assets/utility.svg';
import fun from '../../assets/fun.svg';
import { Helmet } from 'react-helmet';

//import startFeatures from '../../assets/startFeatures.svg';


const Home = () => {

    useEffect(() => {
        ScrollReveal().reveal('.description', { delay: 200 });
        ScrollReveal().reveal('.features', { delay: 200 });
    }, []);

    return (


        <div>
            <Helmet>
                <title>Scout | Discord Bot</title>
                <meta name="description" content="Scout is the next step in the evolution of Discord bots. With powerful moderation, logging, utility, and fun commands, Scout is the ultimate solution for server management." />
            </Helmet>
            <Navigation />
            <section>



                <div className="splashtext">

                    <h2 className='splashtexttop'>Introducing the next Discord Moderation and Utility Bot...</h2>
                    <h1>Scout</h1>
                    <h2 className='motto'>"The Next Step in the Evolution of Discord Bots"</h2>
                    <h3 className="comingsoon">Currently in Beta! Join our <a href="/support">Discord Server</a> to Enrol!</h3>

                    <div className="arrowWhite"></div>



                </div>

                <img src={splashSGV} style={{ width: "100%" }} alt="SplashTextTransitionSVG" />
            </section>





            <div className='contentcontainer'>


                <section className='featureSection'>


                    <div className="features">
                        <h1 className='title'>Features</h1>


                        <div className='featureDiv'>
                            <img className="featureImage" src={moderation} alt="Bot Moderation Demo" />
                            <div className="text-content">
                                <h2>Moderation on Another Level</h2>
                                <p>
                                    Wave goodbye to the cumbersome tasks of manual moderation. Introducing Scout – your ultimate solution to streamline the moderation process on Discord. Designed with precision and user-friendliness in mind, Scout empowers you to effortlessly oversee user activity, enforce server rules, and foster a secure, inviting atmosphere for every member.

                                    Scout stands out for our moderation, delivering an unparalleled blend of efficiency and effectiveness in server management. Embrace the future of moderation with Scout, where simplicity meets sophistication.
                                </p>
                            </div>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='featureDiv'>
                            <img className="featureImage" src={logging} alt="Bot Logging Demo" />
                            <div className="text-content">
                                <h2>Comprehensive Action Logging</h2>
                                <p>
                                    Elevate your server management to new heights with our amazing action logging features. Designed to capture <strong>every</strong> detail, from message edits and deletions to server changes, our bot ensures nothing slips through the cracks. Stand out in the Discord community with the most comprehensive audit log available, making our bot the top choice for logging excellence.

                                    This level of transparency not only streamlines moderation tasks but also builds a foundation of trust within your server community. Experience the ultimate in oversight and peace of mind with our unparalleled logging capabilities.
                                </p>
                            </div>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='featureDiv'>
                            <img className="featureImage" src={utility} alt="Bot Utility Demo" />
                            <div className="text-content">
                                <h2>Helpful Utility Commands</h2>
                                <p>
                                    Transform your server with an extensive suite of utility commands, designed to bring efficiency and innovation to your fingertips. Our bot is your one-stop solution for a wide array of administrative tasks, from nuanced role management to insightful server analytics. Simplify your operations, enrich user experiences, and elevate your server's capabilities with our powerful, user-friendly tools.
                                </p>
                            </div>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='featureDiv'>
                            <img className="featureImage" src={fun} alt="Bot Fun Commands Demo" />
                            <div className="text-content">
                                <h2>Engage with Fun Commands</h2>
                                <p>
                                    Inject a dose of entertainment into your server
                                    with our bot's fun commands. Whether through interactive games, trivia, or
                                    custom responses, our bot adds a layer of engagement and camaraderie among
                                    members, making it the best Discord bot for fun and social interaction.
                                </p>
                            </div>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className="featureDiv">
                            <div className="text-content">
                                <h2>More Features Coming Soon!</h2>
                                <p>
                                    We are constantly working on new features and improvements to make Scout the best bot it can be. Check back soon for more exciting features!
                                </p>
                            </div>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='commitment'>
                            <h2>Our Commitment</h2>
                            <p>
                                Our dedication to delivering outstanding quality is reflected in the glowing endorsements we've received from our vibrant community. Many users rank our bot among the elite, placing it shoulder to shoulder with esteemed names like MEE6, Dyno, and Carl-Bot. This widespread trust and acclaim are a testament to our unwavering commitment to enhancing the Discord experience for users across the globe. Join the ranks of satisfied users and discover why our bot is heralded as a pinnacle of reliability and user satisfaction.
                            </p>
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='inviteus'>
                            <h2>Join Us Today!</h2>
                            <p>
                                Transform your server today with our bot and unlock a new realm of moderation, logging, utility, and entertainment. Become part of an elite group of satisfied server admins who have revolutionized their community management and engagement strategies with our top-tier Discord bot. Don't miss out on the opportunity to bring efficiency, order, and fun to your server with a single, powerful tool. Upgrade now and witness the remarkable difference it makes!
                            </p>
                        </div>

                    </div>
                </section>

            </div>

            <Footer></Footer>
        </div >
    )
};

export default Home;