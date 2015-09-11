TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST["boards/list_item"],
  tagName: "li",
  events: {
    "mouseenter .list-items > li": "showDelete",
    "mouseleave .list-items > li": "hideDelete",
    "click .delete": "delete"
  },

  initialize: function () {
    this.collection = this.model.collection;
    this.listenTo(this.model.cards(), "remove add", this.render)
  },

  render: function () {

    this.$el.html(this.template({ list: this.model }))
    this.subviews(".list-items").forEach(function (card) {
      card.remove();
    })

    this.model.cards().each(function (card) {
      var view = new TrelloClone.Views.Card({ model: card })
      this.addSubview(".list-items", view)
    }.bind(this))
    this.attachSubviews();
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
    this.model.cards().remove(cardId).destroy()
    // debugger
  }
})
