import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    //console.log('in async vrifyToken')
    //console.log(token)
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        //console.log(ticket);
        //console.log('ticket payload: ',ticket.getPayload());
        return {payload: ticket.getPayload() };
    } catch (error) {
        //console.log('error in catch: ', error)
        return {error: 'invalid user detected, please try again'}
    }
}

export default verifyGoogleToken