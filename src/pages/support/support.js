import React from 'react';
import './support.css';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const Support = () => {
    return (
        <div id='support'>
            <Navigation></Navigation>


            <header className="support">
                <h1 className='title'>Support</h1>
                <p>Please feel free to contact us whenever you require assistance!</p>
            </header>
            <main>
                <div className='content'>
                    <section>
                        <h2>Support Channels</h2>
                        <p>Support is available through the following channels:</p>
                        <p className='prefcontact'>(Discord is the preferred contact method)</p>
                        <ul>
                            <li>Discord: <a href="https://discord.gg/BwD7MgVMuq">https://discord.gg/BwD7MgVMuq</a></li>
                            <li>Email: <a href="mailto:support@scoutbot.xyz">support@scoutbot.xyz
                            </a></li>
                        </ul>
                    </section>
                    <section>
                        <h2>Support Availability</h2>
                        <p>Support is available at most times of the day. Please note that response times may vary depending on the volume of requests and the availability of support staff.</p>
                    </section>
                </div>

            </main>


            <Footer></Footer>
        </div>
    )
};

export default Support;