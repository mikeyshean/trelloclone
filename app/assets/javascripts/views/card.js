TrelloClone.Views.Card = Backbone.View.extend({
  template: JST["boards/card"],
  tagName: "li",
  className: "card deletable group",

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    this.$el.attr("data-id", this.model.id)
    return this;
  }
})
