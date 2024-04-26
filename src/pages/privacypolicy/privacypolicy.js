import React from 'react';
import Navigation from '../../components/navigation';
import './privacypolicy.css';
import Footer from '../../components/footer';
import legalLogo from '../../assets/LegalBW.png';

const PrivacyPolicy = () => {
    return (
        <div id='legal'>
            <Navigation></Navigation>

            <header id='legal'>
                <h1>Privacy Policy</h1>
                <h2>Last Updated: 16th April 2024 (v1.3)</h2>
                <p>Thank you for using Scout. We are committed to protecting your privacy and ensuring the security of your data.</p>
            </header>
            
            
            <main>
                <img id='legal' src={legalLogo} alt="Scout Legal Logo" />
                <div className='content'>

                    <section>
                        <h2>Data Collection</h2>
                        <p>Scout collects the following user data through OAuth authentication:</p>
                        <ul>
                            <li>User ID</li>
                            <li>Username</li>
                            <li>Profile Banner</li>
                            <li>Avatar</li>
                            <li>Email Address</li>
                            <li>Discord guilds/servers the user is in</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Data Usage</h2>
                        <p>The collected data is used solely for providing and enhancing the functionality of Scout, including:</p>
                        <ul>
                            <li>Delivering requested services and features</li>
                            <li>Customizing user experiences</li>
                            <li>Improving the performance of the bot</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Analytics</h2>
                        <p>We use third-party service providers, such as Google Analytics 4, to monitor and analyze the use of our Service. This helps us measure website traffic and understand user interactions, which enhances and optimizes our service delivery.</p>
                    </section>

                    <section>
                        <h2>Data Storage</h2>
                        <p>All collected data is securely stored on MongoDB servers which comply with industry data security and privacy standards.</p>
                    </section>

                    <section>
                        <h2>Data Deletion</h2>
                        <p>Users have the right to request the deletion of their data under certain circumstances as outlined in this privacy policy’s “User Rights” section. However, it's important to note that users cannot request the deletion of their data from service blacklists maintained by Scout. Service blacklists typically consist of user IDs, the reason for the blacklist, and a timestamp of when it was issued. This data is used for moderation purposes, such as preventing access to certain features or services for users who have violated community guidelines or engaged in prohibited behaviour. As such, user IDs included in service blacklists are retained to enforce these guidelines and ensure the safety and integrity of our community.</p>
                    </section>

                    <section>
                        <h2>External APIs</h2>
                        <p>Scout may utilize external APIs for additional functionalities such as retrieving information or providing enhanced services. However, user data is not sent to these external APIs without explicit user consent.</p>
                    </section>

                    <section>
                        <h2>Data Sharing</h2>
                        <p>Scout does not share collected data with any third parties, except as necessary to provide the functionality of the Service or to comply with the law.</p>
                    </section>

                    <section>
                        <h2>User Rights</h2>
                        <p>Users have the following rights regarding their data:</p>
                        <ul>
                            <li>Right of Access: Users can obtain confirmation of whether their data is being processed and access to that data.</li>
                            <li>Right to Rectification: Users can request corrections to inaccurate or incomplete data.</li>
                            <li>Right to Erasure: Users can request the deletion of their data under certain circumstances.</li>
                            <li>Right to Data Portability: Users can receive their data in a structured, commonly used, and machine-readable format.</li>
                            <li>Right to Object: Users can object to the processing of their data under certain circumstances.</li>
                            <li>Right to Withdraw Consent: If data processing is based on consent, users can withdraw their consent at any time.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Legal Compliance</h2>
                        <p>Scout complies with relevant privacy laws and regulations, including those of the Australian jurisdiction.</p>
                    </section>

                    <section>
                        <h2>Contact Information</h2>
                        <p>If you have any questions or concerns about your privacy or wish to exercise your rights regarding your data, please email us at <a href="mailto:support@scoutbot.xyz">support@scoutbot.xyz</a> with your Discord User ID.</p>
                    </section>

                    <section>
                        <h2>Updates to Privacy Policy</h2>
                        <p>The privacy policy may be occasionally updated. Any significant changes will be communicated to users via the Discord server and website.</p>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
};

export default PrivacyPolicy;
