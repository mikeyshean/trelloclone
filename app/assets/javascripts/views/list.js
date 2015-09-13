TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST["boards/list_item"],
  deleteButton: JST["delete_button"],
  newListItem: JST["lists/new_list_item"],
  className: "single-list",

  events: {
    "mouseenter .card.deletable": "showDeleteCard",
    "mouseleave .card.deletable": "hideDeleteCard",
    "click .card > .delete": "deleteCard",
    "mouseenter .deletable.list-items": "showAddCard",
    "mouseleave .deletable.list-items": "hideAddCard"
  },

  initialize: function () {
    this.toggle = false;
    this.listenTo(this.model.cards(), "add", this.addCardSubview)
    this.listenTo(this.model.cards(), "remove", this.removeCardSubview)
    this.listenTo(this.model.cards(), "sync", this.render)

    this.model.cards().each(function (card) {
      this.addCardSubview(card);
    }.bind(this))
  },

  addCardSubview: function (card) {
    var view = new TrelloClone.Views.Card({ model: card })
    this.addSubview(".cards", view)
  },

  removeCardSubview: function (card) {
    card.destroy({
      success: function () {
        this.removeModelSubview(".cards", card);
        this.render()
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }))
    this.attachSubviews();
    this.$el.attr("data-id", this.model.id)
    return this;
  },

  showDeleteCard: function (e) {
    e.preventDefault();
    var $card = $(e.currentTarget)
    $card.append(this.deleteButton({ $el: $card }));
  },

  hideDeleteCard: function (e) {
    e.preventDefault();
    var $card = $(e.currentTarget)
    $card.find("button.delete").remove();
  },

  deleteCard: function (e) {
    var cardId = $(e.currentTarget).data("id");
    this.model.cards().remove(cardId);
  },

  showAddCard: function (e) {
    if (this.toggle) {
      return;
    }
    this.toggle = true

    this.$(".cards").append(this.newListItem({ list: this.model }))
    this.$(".new-card-input").focus();
    console.log("add: " + this.model.id)
  },

  hideAddCard: function (e) {
    this.$("#new-card").remove()
    console.log("hide: " + this.model.id)
    this.toggle = false
  },
})
