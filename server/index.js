require('dotenv').config();
const express = require('express');
const axios = require('axios');
const url = require('url');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 443;
const app = express();

const client = new MongoClient(process.env.DATABASE_URL);

async function main() {
    try {
        await client.connect();
        console.log("Connected to the database");

        app.get('/api/auth/discord/redirect', async (req, res) => {
            try {
                console.log(req.query); // Log the entire query to see what's received
                const { code } = req.query; // Extract the code from the query parameters
                console.log('Code Received:', code); // Log received code

                if (code) {
                    const formData = new url.URLSearchParams({
                        client_id: process.env.CLIENTID,
                        client_secret: process.env.CLIENTSECRET,
                        grant_type: 'authorization_code',
                        code: code.toString(),
                        redirect_uri: 'https://api.scoutbot.me/api/auth/discord/redirect',
                    });

                    const output = await axios.post('https://discord.com/api/oauth2/token', formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    console.log('Token Response:', output.data);

                    if (output.data) {
                        const access = output.data.access_token;

                        const userinfo = await axios.get('https://discord.com/api/users/@me', {
                            headers: {
                                'Authorization': `Bearer ${access}`,
                            }
                        });
                        console.log('User Info:', userinfo.data);

                        const guilds = await axios.get('https://discord.com/api/users/@me/guilds', {
                            headers: {
                                'Authorization': `Bearer ${access}`,
                            }
                        });
                        console.log('Guilds Data:', guilds.data);

                        const timestamp = new Date();
                        timestamp.setHours(timestamp.getHours() + 10);

                        const userData = {
                            ...userinfo.data,
                            guilds: guilds.data,
                            timestamp: timestamp
                        };

                        const collection = client.db("websiteData").collection("oauthData");
                        const filter = { id: userinfo.data.id };
                        const update = {
                            $set: userData,
                            $currentDate: { lastModified: true }
                        };

                        const result = await collection.updateOne(filter, update, { upsert: true });
                        console.log('Database Operation Result:', result);

                        res.redirect('https://scoutbot.me/dashboard');
                    }
                }
            } catch (error) {
                console.error('Error during the authentication process:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        app.listen(port, () => { console.log(`Running on port ${port}`) });
    } catch (error) {
        console.error("Could not connect to the database", error);
    }
}

main();
