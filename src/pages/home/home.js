import React, { useEffect } from 'react';
import './home.css';
import moderationIcon from '../../assets/ScoutModeration.png';
import funCommandsIcon from '../../assets/ScoutFun.png';
import giveawaysicon from '../../assets/ScoutGiveaway.png';
import moreIcon from '../../assets/ScoutMore.png';
import pollLogo from '../../assets/ScoutPolls.png';
import ScrollReveal from 'scrollreveal';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';



// Rest of your component

//SVG is 16:9 960x540

const Home = () => {

    useEffect(() => {
        ScrollReveal().reveal('.card', { delay: 200 });
    }, []);

    return (


        <div>
            <Navigation />
            <section>



                <div className="splashtext">

                    <h2 className='splashtexttop'>Introducing the next Discord Moderation and Utility Bot...</h2>
                    <h1>Scout</h1>
                    <h2 className='motto'>"The Next Step in the Evoltuion of Discord Bots"</h2>
                    <h3 className="comingsoon">Currently in Beta! Join our <a href="/support">Discord Server</a> to Enrol!</h3>


                </div>


            </section>


            


            <div class='contentcontainer'>

                <h3 class="learnmore">Scroll to learn more!</h3>



                <div class="arrow"></div>


                <div className="description">
                <h3>Elevate your Discord server experience with our all-in-one Discord bot,
                    designed to cater to all your server needs with precision and efficiency.
                    Our bot is a top contender in moderation, action logging, utility functions,
                    and engaging fun commands, ensuring a vibrant and well-managed community.
                    <br></br>
                    <br></br>
                    <strong>Moderation Made Easy</strong> - Say goodbye to the hassle of manual moderation.
                    Our bot simplifies the process, offering robust features that answer the
                    pressing question of how to moderate on Discord effectively. Advanced
                    auto-moderation capabilities ensure a safe and respectful environment for
                    all members, making it a prime choice for those seeking reliable moderation solutions.
                    <br></br>
                    <br></br>
                    <strong>Comprehensive Action Logging</strong> - Keep a meticulous record of server activity
                    with our state-of-the-art action logging feature. Whether you're looking
                    to track message edits, deletions, or user activities, our bot provides
                    an exhaustive audit log, positioning itself as the best logging bot in the
                    Discord community. This transparency aids in effective moderation and fosters
                    trust among your server members.
                    <br></br>
                    <br></br>
                    <strong>Versatile Utility Functions</strong> - Enhance your server's functionality with many
                    utility commands at your fingertips. From role management to server analytics,
                    our bot can handle various administrative tasks, streamlining operations and
                    improving user experience.
                    <br></br>
                    <br></br>
                    <strong>Engage with Fun Commands</strong> - Inject a dose of entertainment into your server
                    with our bot's fun commands. Whether through interactive games, trivia, or
                    custom responses, our bot adds a layer of engagement and camaraderie among
                    members, making it the best Discord bot for fun and social interaction.
                    <br></br>
                    <br></br>
                    Our commitment to excellence is echoed in the community's feedback, with many
                    considering our bot a top choice alongside renowned names like MEE6, Dyno and Carl-Bot. Trusted
                    by users worldwide, our bot is a testament to our dedication to providing a
                    seamless and enjoyable experience for all Discord users.
                    <br></br>
                    <br></br>
                    Upgrade your Discord server with our bot today and experience unparalleled
                    moderation, logging, utility, and fun - all in one package. Join the ranks
                    of satisfied server admins who have transformed their community management
                    and engagement with our top-rated Discord bot.
                </h3>
            </div>

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
                            <h1 className="card-title">More Features to Come!</h1>
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