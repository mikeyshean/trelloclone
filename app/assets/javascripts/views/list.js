TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST["boards/list_item"],

  tagName: "li",
  className: "deletable",
  events: {

  },

  initialize: function () {
    this.listenTo(this.model.cards(), "add", this.addCardSubview)
    this.listenTo(this.model.cards(), "sync", this.render)

    this.model.cards().each(function (card) {
      this.addCardSubview(card);
    }.bind(this))
  },

  addCardSubview: function (card) {
    var view = new TrelloClone.Views.Card({ model: card })
    this.addSubview(".list-items", view)
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }))
    this.attachSubviews();
    this.$el.attr("data-id", this.model.id)
    return this;
  }
})
