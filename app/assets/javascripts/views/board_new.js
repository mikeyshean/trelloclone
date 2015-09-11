TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST["boards/board_new"],

  intialize: function (options) {
    this.collection = options.collection;
  },

  events: {
    "submit form.board": "submit"
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var formData = $(e.currentTarget).serializeJSON();
    var that = this

    this.model.save(formData.board, {
      success: function (model) {
        that.collection.add(model);
        Backbone.history.navigate("#/boards/" + model.id, { trigger: true })
      },
      error: function (model, response) {
        response.responseJSON.forEach(function (error) {
          that.$el.append("<p>" + error + "</p>");
        })
      }
    })
  }
})
