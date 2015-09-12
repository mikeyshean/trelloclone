TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST["boards/list_item"],

  tagName: "li",
  className: "deletable",
  events: {
    "mouseenter li.deletable": "showDelete",
    "click .delete": "delete"
    // "click .list-button.add": "addForm"
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
    return this;
  },

  showDelete: function (e) {
    e.preventDefault();
    var $cardLi = $(e.currentTarget)
    $cardLi.append("<button class=\"delete list-button\" data-id=" + $cardLi.data("id") + ">X</button>")
  },

  hideDelete: function (e) {
    window.setTimeout(function() {
      e.preventDefault();
      var $cardLi = $(e.currentTarget)
      $cardLi.find("button.delete").remove();
    }, 100000)
  },

  delete: function (e) {
    var cardId = $(e.currentTarget).data("id");
    var card = this.model.cards().get(cardId);

    this.removeModelSubview(".list-items", card)
    card.destroy({wait: true});
  }

  // addForm: function (e) {
  //   var $li = $("<li>")
  //   var $form = $("<input type=\"text\" name=\"card[title]\">")
  //   this.$el.append($li.append($form))
  //   $form.focus();
  // }
})
