# url-shortener

### Obective

Build a full stack JavaScript app that is functionally similar to this: https://little-url.herokuapp.com/ and deploy it to Glitch.

### User Stories
- [ ] I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

- [ ] If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

- [ ] User Story: When I visit that shortened URL, it will redirect me to my original link.

### Example Query
```
https://itty-bitty.glitch.me/new/https://www.google.com
https://itty-bitty.glitch.me//new/http://foo.com:80
```

### Example Output
```
{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
```

### Example Usage
```
https://itty-bitty.glitch.me/2871
```

[Live version](https://itty-bitty.glitch.me)
