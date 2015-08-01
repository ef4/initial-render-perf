import Ember from 'ember';

var MyThing = Ember.Object.extend({
  d: function() {
    return this.get("a") + this.get("b");
  }.property("a", "b")
});

var listItems = [];
for (var i=0; i<50; i++) {
  listItems.pushObject(MyThing.create({
    a: "a" + i,
    b: "b" + i,
    c: "c" + i
  }));
}

function waitForRender() {
  return new Ember.RSVP.Promise(resolve => Ember.run.schedule('afterRender', resolve));
}

export default Ember.Controller.extend({
  listItems,
  showList: false,
  timings: [],

  resetTest() {
    this.set('showList', false);
    return waitForRender();
  },

  actions: {
    clear() {
      this.resetTest();
    },
    runOneTest() {
      this.resetTest().then(() => {
        let startTime = new Date();
        this.set('showList', true);
        return waitForRender().then(() => {
          let ms = (new Date()) - startTime;
          this.get('timings').pushObject(ms);
        });
      });
    }
  }
});
