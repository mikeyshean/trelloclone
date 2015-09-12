TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: "api/lists",
  model: TrelloClone.Models.List,

  comparator: "ord",

  initialize: function (models, options) {
    this.board = options.board;
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {list: this})
    }

    return this._cards
  }
})
