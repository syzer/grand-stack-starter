const test = require('ava')
const fetch = require('isomorphic-fetch')
const axios = require('axios')

test('Subscription', t =>
  fetch('http://localhost:4001/graphql', {
    'headers': {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,pl;q=0.8,de;q=0.7,it;q=0.6,fr;q=0.5',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'pragma': 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    },
    'referrer': 'http://localhost:4001/graphql',
    'referrerPolicy': 'strict-origin-when-cross-origin',
    'body': '{"operationName":null,"variables":{},"query":"{\\n  usersBySubstring(substring: \\"Bo\\") {\\n    name\\n    reviews {\\n      stars\\n      id\\n    }\\n  }\\n  User {\\n    numReviews\\n    name\\n    id\\n    _id\\n  }\\n}\\n"}',
    'method': 'POST',
    'mode': 'cors',
    'credentials': 'omit'
  })
    .then(e =>
      e.json())
    .then(e => {
      // t.deepEqual(e.data.User[0],
      //   { numReviews: 6, name: 'Bob', id: 'u2', _id: '171' },
      // )
      t.pass()
    })
    .catch(err => {
      console.error(err)
      t.fail(err)
    }))

test('Subscription with Axios', t =>
  axios.post('http://localhost:4001/graphql',
    {
      query: `
        query {
          usersBySubstring(substring: "Bo") {
            name
            reviews {
              stars
              id
            }
          }
            User {
              numReviews
              name
              id
              _id
            }
          }`
    })
    .then(e => {
      t.pass()
    })
    .catch(err => {
      console.error(err)
      t.fail(err)
    })
)



