const https = require('https');

const query = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      difficulty
      content
      topicTags { name }
      codeSnippets {
        langSlug
        code
      }
      sampleTestCase
    }
  }
`;

const data = JSON.stringify({
  query: query,
  variables: {
    titleSlug: "two-sum"
  }
});

const options = {
  hostname: 'leetcode.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'User-Agent': 'Mozilla/5.0'
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  res.on('end', () => {
    console.log(responseData);
  });
});

req.write(data);
req.end();
