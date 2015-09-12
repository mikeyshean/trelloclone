TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/board_show"],
  newList: JST["boards/new_list"],
  newListItem: JST["lists/new_list_item"],

  events: {
    "submit #new-list": "submitNewList",
    "mouseenter .lists > li": "showAdd",
    "mouseleave .lists > li": "hideAdd",
    "submit #new-card-form": "submitNewCard",
    "mouseenter .deletable": "showDelete",
    "mouseleave .deletable": "hideDelete",
    "click .deletable > .delete": "deleteList"
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
    this.addSubview(".lists", view);
  },

  removeListSubview: function (list) {
    this.removeModelSubview(".lists", list);
    this.render();
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews()
    this.$("ul.lists").append(this.newList())
    return this;
  },

  showAdd: function (e) {
    e.preventDefault();
    var listId = $(e.currentTarget).find("p").data("id")
    var $ul = $(e.currentTarget).find(".list-items")
    $ul.append(this.newListItem({ id: listId}))
    $ul.find(".form-input").focus();
  },

  hideAdd: function (e) {
    e.preventDefault();
    var $ul = $(e.currentTarget).find("#new-card")
    $ul.remove();
  },

  submitNewList: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData["list"]["board_id"] = this.model.id;
    this.model.lists().create(formData, {wait: true});
  },

  submitNewCard: function (e) {
    e.preventDefault();
    var listId = $(e.currentTarget).data("id");
    var formData = $(e.currentTarget).serializeJSON();
    formData["card"]["list_id"] = listId
    var list = this.model.lists().get(listId)
    list.cards().create(formData, {wait: true});
  },

  showDelete: function (e) {
    e.preventDefault();
    var $list = $(e.currentTarget)
    $list.prepend("<button class=\"delete list-button\" data-id=" + $list.data("id") + ">X</button>")
  },

  hideDelete: function (e) {
    e.preventDefault();
    var $list = $(e.currentTarget)
    $list.find("button.delete").remove();
  },

  deleteList: function (e) {
    e.preventDefault();

    var listId = $(e.currentTarget).data("id");
    var list = this.model.lists().get(listId)
    list.destroy();
  }
})
