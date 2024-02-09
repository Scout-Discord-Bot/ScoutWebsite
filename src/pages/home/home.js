import React, { useEffect } from 'react';
import './home.css';
import moderationIcon from '../../assets/ScoutBot-Moderation.png';
import funCommandsIcon from '../../assets/ScoutBot-Fun.png';
import giveawaysicon from '../../assets/ScoutBot-Giveaways.png';
import moreIcon from '../../assets/ScoutBot-More.png';
import pollLogo from '../../assets/ScoutBot-Polls.png';
import ScrollReveal from 'scrollreveal';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';
import MailchimpForm from '../../components/mailchimpform';

// Rest of your component

const Home = () => {

    useEffect(() => {
        ScrollReveal().reveal('.card', { delay: 200 });
    }, []);

    return (


        <div>
            <Navigation></Navigation>

            <div className="splashtext">
                <h2 className='splashtexttop'>Introducing the next Discord Moderation and Utility Bot...</h2>
                <h1>Scout</h1>
                <h2 className='motto'>"The Next Step in the Evoltuion of Discord Bots"</h2>
                <h3 className="comingsoon">Currently in Development! Join our <a href="/support">Discord Server</a> for updates!</h3>
            </div>
            <MailchimpForm></MailchimpForm>
            <div class='contentcontainer'>

                <h3 class="learnmore">Scroll to learn more!</h3>
                <div class="arrow"></div>

                <h1 class="featurestitle">Planned Features</h1>
                <div className="card-container">
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={moderationIcon} alt="Card icon" style={{ marginLeft: '10px', marginRight: '10px', width: '50px', height: '50px' }} />
                            <h1 className="card-title">Moderation</h1>
                        </div>
                        <p>Scout will strive to be a powerful tool that will greatly assist with moderation in your Discord server. With its advanced features and user-friendly interface, Scout allows you to easily track and manage user activity, identify and remove inappropriate content, and enforce server rules effectively.</p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={funCommandsIcon} alt="Fun Commands icon" style={{ marginLeft: '10px', marginRight: '10px', width: '50px', height: '50px' }} />
                            <h1 className="card-title">Fun Commands</h1>
                        </div>
                        <p>Scout is going to have fun commands! With an exciting range of features, Scout can entertain you with various commands that will keep you entertained for hours. From games to trivia, Scout has an extensive collection of commands that are designed to bring joy and fun to your day. So get ready to explore a world of entertainment and have a great time with Scout!</p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={giveawaysicon} alt="Giveaways icon" style={{ marginLeft: '10px', marginRight: '10px', width: '50px', height: '50px' }} />
                            <h1 className="card-title">Giveaways</h1>
                        </div>
                        <p>Scout will have a Giveaway system that will allow people to have the opportunity to win exciting prizes and rewards.</p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={pollLogo} alt="Polls icon" style={{ marginLeft: '10px', marginRight: '10px', width: '50px', height: '50px' }} />
                            <h1 className="card-title">Polls</h1>
                        </div>
                        <p>Scout will have a Poll system that will allow users to create and vote on various topics.</p>
                    </div>
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'cente   r', justifyContent: 'start' }}>
                            <img src={moreIcon} alt="More icon" style={{ marginLeft: '10px', marginRight: '10px', marginTop: '5px', width: '50px', height: '50px' }} />
                            <h1 className="card-title">...and More!</h1>
                        </div>
                        <p>Scout will have many more features that will be revealed soon! Join our <a href="/support">Support Server</a> to stay updated!</p>
                    </div>

                </div>

            </div>

            <Footer></Footer>
        </div>
    )
};

export default Home;