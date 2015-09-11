TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards_index"],

  render: function () {
    var content = this.template({ collection: this.collection })
    this.$el.html(content);
    return this;
  }
})
