import fetch from 'node-fetch';

export const fetchProfile = async (accessToken, done) => {
    try {
        const profileResponse = await fetch(
            `${process.env.WHOOP_API_HOSTNAME}/developer/v1/user/profile/basic`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        const profile = await profileResponse.json();
        done(null, profile);
    } catch (error) {
        done(error);
    }
};
