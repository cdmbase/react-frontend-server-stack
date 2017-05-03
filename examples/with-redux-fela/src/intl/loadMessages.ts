import * as fs from 'fs';
import * as path from 'path';


const descriptorToMessages = descriptors => 
 descriptors.reduce(
     (previous, { defaultMessage, id }) => ({
         ...previous,
         [id]: defaultMessage,
     }),
     {},
 )


const loadMessages = options => {
    const {
        includeDefault = false,
    } = options || {};
    const isDictionary = fileName => 
        path.extname(fileName) === '.js' &&
        (includeDefault || !fileName.startWith('_'));

        return fs
        .readdirSync('messages')
        .filter(isDictionary)
        .map(fileName => ({
            descriptors: require(`../../config/messages/${fileName}`).default,
            locale: fileName.split('.')[0],
        }))
        .reduce(
            (previous, { descriptors, locale }) => ({
                ...previous,
                [locale]: descriptorToMessages(descriptors)
            }),
            {},
        );
};

export default loadMessages;