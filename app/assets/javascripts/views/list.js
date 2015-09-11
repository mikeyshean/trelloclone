TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST["boards/list_item"],
  tagName: "li",
  events: {
    "mouseenter .list-items > li": "showDelete",
    "mouseleave .list-items > li": "hideDelete",
    "click .delete": "delete"
  },

  initialize: function () {
    this.listenTo(this.model.cards(), "update", this.render)
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }))


    this.model.cards().each(function (card) {
      var view = new TrelloClone.Views.Card({ model: card })
      this.addSubview(".list-items", view)
    }.bind(this))
    return this;
  },

  showDelete: function (e) {
    e.preventDefault();
    var $cardLi = $(e.currentTarget)
    $cardLi.append("<button class=\"delete\" data-id=" + $cardLi.data("id") + ">X</button>")
  },

  hideDelete: function (e) {
    e.preventDefault();
    var $cardLi = $(e.currentTarget)
    $cardLi.find("button.delete").remove();
  },

  delete: function (e) {
    var cardId = $(e.currentTarget).data("id");
    var card = this.model.cards().get(cardId);

    card.destroy();
    this.removeModelSubview(".list-items", card)

  }
})
