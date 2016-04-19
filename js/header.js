var Header = Backbone.View.extend({
    el: $('#header'),
    initialize: function(){
        _.bindAll(this, 'render');
        this.render();
    },
    render: function(){
        $(this.el).html("<div>header</div>");
    }
});
