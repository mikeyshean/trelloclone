TrelloClone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow",
    "cards/new": "cardsNew"
  },

  boardsIndex: function () {
    this.collection.fetch({
      success: function () {
        var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
        this._swapView(view);
      }.bind(this),
      reset: true
    })
  },

  boardsNew: function () {
    var board = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.BoardNew({ model: board, collection: this.collection });
    this._swapView(view);

  },

  boardsShow: function (id) {
    var board = this.collection.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({ model: board });
    this._swapView(view);
  },

  _swapView: function (view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
