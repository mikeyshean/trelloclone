TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/board_show"],
  newList: JST["boards/new_list"],
  deleteButton: JST["delete_button"],
  className: "board-show",
  
  events: {
    "submit #new-list": "submitNewList",
    "mouseenter .deletable > p": "showDeleteList",
    "mouseleave .deletable > p": "hideDeleteList",
    "click p > .delete": "deleteList"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListSubview);
    this.listenTo(this.model.lists(), "sync", this.render);
    this.listenTo(this.model.lists(), "remove", this.removeListSubview);

    this.model.lists().each(function (list) {
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
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews()
    this.$(".lists-wrapper").append(this.newList())
    this.$(".list-form-input").focus()
    return this;
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
    var list = this.model.lists().get(listId)
    list.destroy({ wait: true });
  },

  submitNewList: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData["list"]["board_id"] = this.model.id;
    this.model.lists().create(formData, {
      error: function (model, response) {
        response.responseJSON.forEach(alert)
      },
      wait: true
    });
  }
})
