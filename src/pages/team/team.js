import './team.css'
import React, { useEffect, useState } from 'react';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const Team = () => {

    function MemberCard({ name, role, userId }) {
        const [imageUrl, setImageUrl] = useState('');

        useEffect(() => {
            import(`../../assets/${userId}.png`)
                .then((image) => {
                    setImageUrl(image.default);
                })
                .catch((error) => {
                    console.error(`Error loading image: ${error}`);
                });
        }, [userId]);

        return (
            <div className="member-card">
                <img src={imageUrl} alt={name} />
                <p>{name}</p>
                <p>{role}</p>
            </div>
        );
    }

    return (
        <div id='team'>
            <Navigation></Navigation>
            <header id='team'>
                <h1>Meet the Team</h1>
                <p>Introducing the remarkable team powering Scout! There are all dedicated individuals who tirelessly strive to deliver the optimal experience across all our users.</p>
            </header>
            <main>
                <div className='content' id='team'>
                    <section>
                        <h2>Leadership</h2>
                        <div className="cardContainer">
                            <MemberCard name="YourDailyMoose" role="Chief Executive Officer" userId="574783977223749632" />
                        </div>
                    </section>
                    <section>
                        <h2>Staff</h2>
                        <div className='cardContainer'>
                            <MemberCard name="Albx1n" role="Head of Public Relations" userId="568737154025652224" />
                        </div>

                    </section>
                    <section>
                        <h2>Contributors</h2>
                        <div className='cardContainer'>
                            <MemberCard name="Limitless4315" role="Contributor" userId="691560662425403432" />
                            <MemberCard name="1spinnewiel" role="Contributor" userId="639043904607485974" />
                            <MemberCard name="Albx1n" role="Contributor" userId="568737154025652224" />
                        </div>
                    </section>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Team;