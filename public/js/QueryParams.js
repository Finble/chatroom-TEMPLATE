function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]).replace(/\+/g, ' '); // regex to replace the + sign in the URL with a space, arising from having 2 words in Room name (URL auto puts a + in URL)
        }
    }
    
    return undefined;
}