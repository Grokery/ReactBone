
var AppRouter = Backbone.Router.extend({
    routes: {
        "demo": "demo",
        "*actions": "default"
    }
});
var app_router = new AppRouter();

app_router.on('route:demo', function () {
    $('#content').html("demo");
});

app_router.on('route:default', function (actions) {
    var head = new Header();
    $('#content').html("Hello");
    var foot = new Footer();
});

Backbone.history.start();
