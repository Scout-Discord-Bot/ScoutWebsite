import React, { useEffect } from 'react';
import './home.css';
import moderationIcon from '../assets/ScoutBot-Moderation.png';
import funCommandsIcon from '../assets/ScoutBot-Fun.png';
import giveawaysicon from '../assets/ScoutBot-Giveaways.png';
import moreIcon from '../assets/ScoutBot-More.png';
import pollLogo from '../assets/ScoutBot-Polls.png';
import ScrollReveal from 'scrollreveal';

// Rest of your component

const Home = () => {

    useEffect(() => {
        ScrollReveal().reveal('.card', { delay: 200 });
    }, []);

    return (



        <div>
            <nav className="navbar">
                <div className="navbar-brand">Scout</div>
                <ul className="navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/invite">Invite</a></li>
                    <li><a href="/support">Support Server</a></li>
                </ul>
                <a href="https://discord.com/api/oauth2/authorize?client_id=1157304018939424970&redirect_uri=https%3A%2F%2Fapi.scoutbot.me%2Fapi%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify%20guilds%20email" class="loginbutton" role="button">Log In</a>
            </nav>

            <div className="splashtext">
                <h2 className='splashtexttop'>Introducing the next Discord Moderation and Utility Bot...</h2>
                <h1>Scout</h1>
                <h2 className='motto'>"Guiding Your Server's Journey with Precision and Care"</h2>
                <h3 className="comingsoon">Currently in Development! Join our <a href="https://discord.gg/BwD7MgVMuq">Support Server</a> for updates!</h3>
            </div>
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
                        <p>Scout will have many more features that will be revealed soon! Join our <a href="https://discord.gg/BwD7MgVMuq">Support Server</a> to stay updated!</p>
                    </div>

                </div>

            </div>

            <div class="footer">
                <p>© ScoutBot 2023 | Created by YourDailyMoose</p>
            </div>
        </div>
    )
};

export default Home;