```html
<html manifest="demo.appcache"> 
```
```ruby
# anytime the cache file is changed, the browser will re-cache
CACHE MANIFEST
# will cache
bootstrap.min.css
https://code.jquery.com/jquery-3.3.1.slim.min.js

FALLBACK:
# fallback for uncached resources (i.e. use a local resource)
img/hd.jpg img/pikachu.jpg

NETWORK:
# will not cache
```
