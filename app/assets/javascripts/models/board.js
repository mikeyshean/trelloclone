TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards/",

  toJSON: function () {
    return { board: _.clone(this.attributes) }
  },

  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists)

      this.lists().each(function (list) {
        if (list.get("cards")) {
          list.cards().set(list.get("cards"));
          list.unset("cards");
        }
      })
    }
    delete response.lists
    return response;
  },

  lists: function () {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], {board: this});
    }

    return this._lists
  }
})
