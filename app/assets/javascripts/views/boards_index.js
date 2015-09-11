TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/boards_index"],

  initialize: function (options) {
    this.collection = options.collection;
    this.collection.fetch({ reset: true });

    this.listenTo(this.collection, "add remove reset", this.render)
  },

  render: function () {
    var content = this.template({ boards: this.collection })
    this.$el.html(content);
    return this;
  }
})
