TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: TrelloClone.Models.List,

  initialize: function (models, options) {
    this.board = options.board;
    this.comparator = "ord";
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {list: this})
    }

    return this._cards
  }
})
