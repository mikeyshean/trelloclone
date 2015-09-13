TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/boards_index"],
  newBoard: JST["boards/new_board"],
  deleteButton: JST["delete_button"],
  className: "board-index",
  events: {
    "mouseenter .deletable > p": "showDeleteBoard",
    "mouseleave .deletable > p": "hideDeleteBoard",
    "click p > .delete": "deleteBoard",
    "submit #new-board": "submitNewBoard"
  },

  initialize: function (options) {
    this.collection = options.collection;

    this.listenTo(this.collection, "add", this.addBoardSubview);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "remove", this.removeBoardSubview);

    this.collection.each(function (board) {
      this.addBoardSubview(board)
    }.bind(this))
  },

  addBoardSubview: function (board) {
    var view = new TrelloClone.Views.BoardItem({ model: board });
    this.addSubview(".lists-wrapper", view)
  },

  removeBoardSubview: function (board) {
    this.removeModelSubview(".lists-wrapper", board)
  },

  render: function () {
    this.$el.html(this.template({ boards: this.collection }))
    this.attachSubviews();
    this.$(".lists-wrapper").append(this.newBoard())
    this.$(".list-form-input").focus()
    return this;
  },

  showDeleteBoard: function (e) {
    e.preventDefault();
    var $p = $(e.currentTarget)
    $p.prepend(this.deleteButton({ $el: $p }))
  },

  hideDeleteBoard: function (e) {
    e.preventDefault();
    var $p = $(e.currentTarget)
    $p.find("button.delete").remove();
  },

  deleteBoard: function (e) {
    e.preventDefault();
    var boardId = $(e.currentTarget).data("id");
    var board = this.collection.get(boardId)
    board.destroy({ wait: true });
  },

  submitNewBoard: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    this.collection.create(formData.board, {
      error: function (model, response) {
        response.responseJSON.forEach(alert)
      },
      wait: true
    });
  }
})
