TrelloClone.Views.BoardItem = Backbone.View.extend({
  template: JST["boards/board_item"],

  className: "single-list",

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    return this;
  }

})
