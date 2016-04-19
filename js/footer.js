
var Footer = Backbone.View.extend({
    el: $('#footer'),
    initialize: function(){
        _.bindAll(this, 'render');
        this.render();
    },
    render: function(){
        $(this.el).html("<div>footer</div>");
    }
});
