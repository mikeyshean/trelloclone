TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards/",
  model: TrelloClone.Models.Board,

  getOrFetch: function (id) {
    var boards = this
    var board = boards.get(id);

    if (board) {
      board.fetch();
    } else {
      board = new boards.model({id: id});
      boards.add(board);

      board.fetch({
        error: function (model, reponse) {
          boards.remove(model);
        }
      })
    }

    return board;
  }
})
