TrelloClone.Views.Card = Backbone.View.extend({
  template: JST["boards/card"],
  tagName: "li",
  className: "card deletable group",

  initialize: function () {
    // this.listenTo(this.model, "change:ord", this.render)
  },

  render: function () {
    console.log("card")
    this.$el.html(this.template({ card: this.model }));
    this.$el.attr("data-id", this.model.id)
    return this;
  }
})
