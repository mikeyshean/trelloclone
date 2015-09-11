TrelloClone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.collection = options.collection;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
  },

  boardsIndex: function () {
    var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
    this._swapView(view);
  },

  boardsNew: function () {
    var board = new TrelloClone.Models.Board();
    var view = new TrelloClone.Views.BoardNew({ model: board, collection: this.collection });
    this._swapView(view);

  },

  boardsShow: function (id) {
    var board = this.collection.getOrFetch(id);
    var view = new TrelloClone.Views.BoardShow({ model: board, collection: this.collection });
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
