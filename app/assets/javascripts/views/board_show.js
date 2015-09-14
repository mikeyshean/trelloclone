TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/board_show"],
  newList: JST["boards/new_list"],
  deleteButton: JST["delete_button"],
  className: "board-show",

  events: {
    "submit #new-list": "submitNewList",
    "mouseenter .deletable > p": "showDeleteList",
    "mouseleave .deletable > p": "hideDeleteList",
    "click p > .delete": "deleteList",
    "sortstop .deletable.list-items": "updateOrd"
  },

  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addListSubview);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "remove", this.removeListSubview);

    this.collection.each(function (list) {
      this.addListSubview(list);
    }.bind(this));
  },

  addListSubview: function (list) {
    var view = new TrelloClone.Views.List({ model: list })
    this.addSubview(".lists-wrapper", view);
  },

  removeListSubview: function (list) {
    this.removeModelSubview(".lists-wrapper", list);
  },

  render: function () {
    console.log("board")
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews()
    this.$(".lists-wrapper").append(this.newList())
    this.$(".list-form-input").focus()
    this.sortable()

    return this;
  },

  sortable: function () {
    this.$(".cards.list-items").sortable({
      placeholder: "ui-sortable-placeholder card",
      items: ".card.deletable",
      connectWith: ".cards.list-items",
      cursor: "grabbing"
    });
  },

  showDeleteList: function (e) {
    e.preventDefault();
    var $p = $(e.currentTarget)
    $p.prepend(this.deleteButton({ $el: $p }))
  },

  hideDeleteList: function (e) {
    e.preventDefault();
    var $p = $(e.currentTarget)
    $p.find("button.delete").remove();
  },

  deleteList: function (e) {
    e.preventDefault();
    var listId = $(e.currentTarget).data("id");
    var list = this.collection.get(listId)
    list.destroy({ wait: true });
  },

  submitNewList: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData["list"]["board_id"] = this.model.id;
    this.collection.create(formData, {
      error: function (model, response) {
        response.responseJSON.forEach(alert)
      },
      wait: true
    });
  },

  updateOrd: function (e) {
    var $startList = $(e.currentTarget).find(".cards.list-items")
    var $newList = $(e.toElement.offsetParent).find(".cards.list-items")

    this.reorderCards($startList, $newList)
    this.reorderCards($newList, $startList)
  },

  reorderCards: function ($listOne, $listTwo) {
    var listOneId = $listOne.data("id")
    var $listOneCards = $listOne.find(".deletable.card")

    var listOneModel = this.collection.get(listOneId)
    var listTwoModel = this.collection.get($listTwo.data("id"))

    var ord = 1
    $listOneCards.each(function (idx, card) {
      var cardId = $(card).data("id")
      var card = this.model.cards().get(cardId)

      card.save({ ord: ord, list_id: listOneId })
      ord++
    }.bind(this))
  }
})
