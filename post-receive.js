// const request = require('request');
// const username = 'vanshiljain';
// const token = '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';

// const perPage = 1000;
// let page = 1;

// function fetchEvents() {
//     console.log(`Fetching events for page ${page}...-----------------------------------------------`);
//     const url = `https://api.github.com/users/${username}/events?page=${page}&per_page=${perPage}`;
//     const options = {
//         headers: {
//             'User-Agent': 'request',
//             'Authorization': `token ${token}`
//         }
//     };

//     request.get(url, options, (error, response, body) => {
//         if (error) {
//             console.error(error);
//             return;
//         }

//         if (response.statusCode !== 200) {
//             console.error(`Failed to fetch events. Status code: ${response.statusCode}`);
//             return;
//         }

//         try {
//             const events = JSON.parse(body);

//             for (const event of events) {
//                 if (event.type === 'PushEvent') {
//                     const commits = event.payload.commits;
//                     console.log(`Repository: ${event.repo.name}`);
//                     for (const commit of commits) {
//                         console.log(`Commit SHA: ${commit.sha}`);
//                         console.log(`Author: ${commit.author.name}`);
//                         console.log(`Message: ${commit.message}`);
//                         console.log('---');
//                     }
//                 }
//             }
//         } catch (err) {
//             console.error('Error parsing JSON:', err);
//         }
//         scheduleFetch();
//     });
// }

// function scheduleFetch() {
//     setTimeout(fetchEvents, 30000);
// }

// fetchEvents();
const request = require('request');
const username = 'vanshiljain';
const token = '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';
const cron = require('node-cron');

const perPage = 1000;

function fetchEvents() {
    console.log('Fetching events...');
    const url = `https://api.github.com/users/${username}/events?page=1&per_page=${perPage}`;
    const options = {
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${token}`
        }
    };

    request.get(url, options, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        if (response.statusCode !== 200) {
            console.error(`Failed to fetch events. Status code: ${response.statusCode}`);
            return;
        }

        try {
            const events = JSON.parse(body);

            for (const event of events) {
                if (event.type === 'PushEvent') {
                    const commits = event.payload.commits;
                    console.log(`Repository: ${event.repo.name}`);
                    for (const commit of commits) {
                        console.log(`Commit SHA: ${commit.sha}`);
                        console.log(`Author: ${commit.author.name}`);
                        console.log(`Message: ${commit.message}`);
                        console.log('---');
                    }
                }
            }
        } catch (err) {
            console.error('Error parsing JSON:', err);
        }
    });
}


cron.schedule('*/30 * * * * *', () => {
    fetchEvents();
});

fetchEvents(); 


