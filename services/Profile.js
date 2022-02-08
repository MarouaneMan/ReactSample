import {doRequest, StatusCodes} from 'helpers';
import {Endpoints, PrivateClient as client} from 'api';

class Profile {

    async Preload(preloadCallback)
    {
        return doRequest({
            request         : client.get(Endpoints.PROFILES),
            [StatusCodes.OK]: response => {
                // Format initial profiles
                preloadCallback(response.data.map(profile => ({
                    profileName  : profile['nickname'],
                    uid          : profile['uid'],
                    locked       : profile['has_pin_code'],
                    avatar       : {
                        alias: profile['avatar_alias'],
                        file : profile['avatar_filename']
                    },
                    contentRating: {
                        alias: profile['content_rating'],
                    },
                })));
            }
        });
    }

    async CheckPinCode({profileUID, pinCode})
    {
        return doRequest({
            request                : client.post(Endpoints.CHECK_PIN_CODE, {
                'profileUid': profileUID,
                'pinCode'   : pinCode,
            }),
            [StatusCodes.OK]       : true,
            [StatusCodes.FORBIDDEN]: false
        });
    }

    async CreateProfile({password, profileName, avatar, contentRating, locked, pinCode})
    {
        let data = {
            playerPassword  : password,
            nickname        : profileName,
            avatar          : avatar.alias,
            maxContentRating: contentRating.alias,
        };
        if (locked)
            data.pinCode = pinCode;
        return doRequest({
            request                     : client.post(Endpoints.PROFILES, data),
            [StatusCodes.OK]            : ({data}) => {
                return {
                    hasError: false,
                    realName: data.nickname, // Backend may change the profile name
                    uid     : data.uid,
                };
            },
            [StatusCodes.UNAUTHORIZED]  : {hasError: true, error: 'profile.bad_password'},
            [StatusCodes.NOT_ACCEPTABLE]: {hasError: true, error: 'profile.profile_name_already_taken'},
            [StatusCodes.CONFLICT]      : {hasError: true, error: 'profile.max_profile_reached'},
            [StatusCodes.FORBIDDEN]     : {hasError: true, error: 'error.try_again_later'}
        });
    }

    async UpdateProfile({password, uid, avatar, profileName, contentRating, locked, pinCode, oldState})
    {

        let data = {};

        // Avatar
        if (avatar.alias !== oldState.avatar.alias)
            data.avatar = avatar.alias;

        // Profile name
        if (profileName !== oldState.profileName)
            data.nickname = profileName;

        // Content rating
        if (contentRating.alias !== oldState.contentRating.alias)
            data.maxContentRating = contentRating.alias;

        // Remove PinCode
        if (!locked && oldState.locked)
            data.removePinCode = true;

        // PinCode
        if (locked && pinCode.length)
            data.pinCode = pinCode;

        // Check diff
        if (Object.keys(data).length === 0)
            return Promise.resolve(true);

        // Set player password
        data.playerPassword = password;

        return doRequest({
            request                     : client.put(`${Endpoints.PROFILES}/${uid}`, data),
            [StatusCodes.OK]            : {hasError: false},
            [StatusCodes.UNAUTHORIZED]  : {hasError: true, error: 'profile.bad_password'},
            [StatusCodes.NOT_ACCEPTABLE]: {hasError: true, error: 'profile.profile_name_already_taken'},
            [StatusCodes.CONFLICT]      : {hasError: true, error: 'profile.max_profile_reached'},
            [StatusCodes.FORBIDDEN]     : {hasError: true, error: 'error.try_again_later'}
        });
    }

    async DeleteProfile({password, uid})
    {
        const data = {playerPassword: password};
        return doRequest({
            request                     : client.delete(`${Endpoints.PROFILES}/${uid}`, {data: data}),
            [StatusCodes.OK]            : {hasError: false},
            [StatusCodes.UNAUTHORIZED]  : {hasError: true, error: 'profile.bad_password'},
            [StatusCodes.NOT_ACCEPTABLE]: {hasError: true, error: 'profile.must_keep_at_least_one_profile'},
        });

    }
}

export default new Profile();
