import {Endpoints, PrivateClient as client} from 'api';
import {avatarURL, doRequest, preloadImage, StatusCodes} from 'helpers';
import i18n from 'i18n';

class FrontEndHelper {

    constructor()
    {
        this.config = {};
    }

    GetConfig()
    {
        return this.config;
    }

    GetContentRating()
    {
        let contentRatings = this.config?.ContentRating?.PEGI || [];
        return contentRatings.filter(cr => cr.rated === true || !cr.hasOwnProperty('rated'));
    }

    GetMinimumAge(contentRatingAlias)
    {
        let minimumAge = 0;
        this.GetContentRating().forEach(cr => {
            if (Array.isArray(contentRatingAlias))
            {
                contentRatingAlias.forEach(val => {
                    if (val === cr.alias)
                        minimumAge = cr.minimum_age;
                });
            }
            else
            {
                if (cr.alias === contentRatingAlias)
                    minimumAge = cr.minimum_age;
            }
        });
        return minimumAge;
    }

    GetAvatars()
    {
        return this.config.Avatars.map(av => {
            return {
                alias: Object.keys(av)[0],
                file : Object.values(av)[0]
            };
        });
    }

    async Preload(promises)
    {
        return doRequest({

            request: client.get(
                Endpoints.FRONTEND_HELPER,
                {params: {language: i18n.language}}
            ),

            [StatusCodes.OK]: response => {

                // Save config
                this.config = response.data;

                // Remove default avatar
                this.config.Avatars = this.config.Avatars.filter(avatar => Object.keys(avatar)[0] !== 'defaultavatar');

                // Preload avatars
                for (let i = 0; i < this.config.Avatars.length; i++)
                {
                    // Weird data structure, as always...
                    let avatar = Object.values(this.config.Avatars[i])[0];

                    // Push avatar preload promise
                    promises.push(preloadImage(avatarURL(avatar)));
                }

                return true;
            }
        });
    }
}

export default new FrontEndHelper();
