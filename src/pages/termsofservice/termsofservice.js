import React from "react";
import Navigation from "../../components/navigation";
import "./termsofservice.css";
import Footer from "../../components/footer";
import legalLogo from "../../assets/LegalBW.png";
import { Helmet } from "react-helmet";

const TermsOfUse = () => {
    return (
        <div id="legal">
            <Helmet>
                <title>Scout | Terms of Service</title>

            </Helmet>
            <Navigation></Navigation>

            <header id="legal">
                <h1>Terms of Service</h1>
                <h2>Last Updated: 6th March 2024 (v1.1)</h2>
                <p>Effective From: 11th March 2024</p>
            </header>
            <main>
                <img id="legal" src={legalLogo} alt="Scout Legal Logo" />
                <div className="content">
                    <p>These Terms of Service ("Terms") govern your use of Scout, a Discord bot, and its associated website ("Service") operated by Scout ("we", "us", or "our"). Please read these Terms carefully before using the Service.</p>
                    <section id="acceptance">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
                        </p>
                    </section>

                    <section id="use">
                        <h2>2. Use of Service</h2>
                        <ul>
                            <li>
                                <strong>Discord Bot: </strong> Scout is a Discord bot designed to provide moderation, utility, fun, and community features to Discord users. You may use the Scout bot in accordance with its intended purpose and functionality.
                            </li>
                            <li>
                                <strong>Website: </strong>Our website serves as a platform for accessing information about Scout, contacting support, and accessing related resources. You may use the website for informational purposes and to interact with our support team.
                            </li>
                            <li><strong>Age Requirement: </strong>By using the Service, you affirm that you are at least 13 years old. If you are under the age of 13, you may not use the Service. </li>
                            <li>
                                <strong>Service Blacklisting and Discord Server Ban: </strong>Users who are suspected to be under the age of 13 or who violate these Terms of Service may be blacklisted from using our services and banned from our Discord server. Additionally, we may report such users to Discord Trust and Safety for further action. See the Privacy Policy for more details.
                            </li>
                        </ul>
                    </section>

                    <section id="conduct">
                        <h2>3. User Conduct</h2>
                        <p>Users are expected to adhere to the following guidelines when using our Discord bot and website:</p>
                        <ul>
                            <li>
                                Respect the rights of others and refrain from engaging in any unlawful, harassing, abusive, or fraudulent activity.
                            </li>
                            <li>
                                Do not attempt to gain unauthorised access to the Service or its related systems or networks.
                            </li>
                            <li>
                                Avoid interfering with or disrupting the Service or servers or networks connected to the Service.
                            </li>
                        </ul>

                        <p><strong>Service Blacklist Policy: </strong>Misuse of the platform, including but not limited to violations of these Terms of Service or engaging in prohibited activities, may result in blacklisting from our services. Blacklisting may entail revoking access to certain features or services for users who have violated community guidelines or engaged in prohibited behaviour. Blacklists are issued at the discretion of Scout for any reason deemed valid by the company.

                        </p>
                    </section>

                    <section id="privacy">
                        <h2>4. Privacy Policy</h2>
                        <p>Your use of the Service is also subject to our Privacy Policy, which governs the collection, use, and disclosure of your personal information. By using the Service, you consent to the terms of the Privacy Policy.</p>
                    </section>

                    <section id="intellectual">
                        <h2>5. Intellectual Property</h2>
                        <p>
                            All content and materials available through the Service, including but not limited to text, graphics, logos, images, and software, are the property of Scout or its licensors and are protected by copyright and other intellectual property laws.
                        </p>
                    </section>

                    <section id="warranties">
                        <h2>6. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided on an "as is" and "as available" basis. We make no warranties or representations about the accuracy, reliability, or completeness of the Service or its content.
                        </p>
                    </section>

                    <section id="liability">
                        <h2>7. Limitation of Liability</h2>
                        <p>
                            In no event shall Scout be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with your use of the Service.
                        </p>
                    </section>

                    <section id="modifications">
                        <h2>8. Modifications to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 10 days' notice prior to any new terms taking effect. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes.
                        </p>
                    </section>

                    <section id="law">
                        <h2>9. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of New South Wales, Australia, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section id="contact">
                        <h2>10. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please get in touch with us at{" "}
                            <a href="mailto:support@scoutbot.xyz">support@scoutbot.xyz</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default TermsOfUse;
