export class Query {
    getQuery(q) {
        return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
    }
}