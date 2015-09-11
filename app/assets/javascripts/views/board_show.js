TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/board_show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.subviews(".lists").forEach(function (list) {
      list.remove();
    });

    this.model.lists().each(function (list) {
      var view = new TrelloClone.Views.List({ model: list })
      this.addSubview(".lists", view);
    }.bind(this))

    this.attachSubviews()
    return this;
  }
})
