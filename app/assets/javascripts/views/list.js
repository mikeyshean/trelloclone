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
    "mouseleave .deletable.list-items": "hideAddCard",
    "submit #new-card-form": "submitNewCard",
  },

  initialize: function (options) {
    this.toggle = false;
    this.boardView = options.boardView
    this.listenTo(this.model.cards(), "add", this.addCardSubview)
    this.listenTo(this.model.cards(), "remove", this.removeCardSubview)
    this.listenTo(this.model.cards(), "add", this.render);

    this.model.cards().each(function (card) {
      this.addCardSubview(card);
    }.bind(this))
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }))
    this.attachSubviews();
    console.log("list");
    return this;
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
  },

  hideAddCard: function (e) {
    this.$("#new-card").remove()
    this.toggle = false
  },

  submitNewCard: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData["card"]["list_id"] = this.model.id

    this.model.cards().create(formData, {
      success: function () {
        this.model.trigger("resort")
      }.bind(this),
      error: function (model, response) {
        response.responseJSON.forEach(alert)
      },
      wait: true
    });
  },
})
