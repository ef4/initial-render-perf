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
  manyTimes: 10,
  fixedDuration: 10,
  emberVersion: Ember.VERSION,
  emberPerf: Ember.inject.service(),

  isProdBuild: Ember.computed(function() {
    try {
      Ember.assert("are we running prod?", false);
      return true;
    } catch (err) {
      return false;
    }
  }),

  stats: Ember.computed('timings.[]', function() {
    let timings = this.get('timings');
    if (timings.length === 0) {
      return null;
    }
    return {
      mean: Math.floor(timings.reduce((a,b) => a + b.ms, 0) / timings.length)
    };
  }),

  resetTest() {
    this.set('showList', false);
    return waitForRender();
  },

  runTest() {
    let emberPerf = this.get('emberPerf');

    return this.resetTest().then(() => {
      this.set('showList', true);

      return emberPerf.measureRender();
    })
      .then((results) => {
        this.get('timings').pushObject({ ms: results.elapsedTime });
      });
  },

  actions: {
    clear() {
      this.resetTest();
      this.set('timings', []);
    },
    runOneTest() {
      this.runTest();
    },
    renderMany() {
      let counter = this.get('manyTimes');
      let step = () => this.runTest().then(() => {
        if (--counter > 0) {
          return step();
        }
      });
      return step();
    },
    renderFixed() {
      let endAt = new Date().getTime() + this.get('fixedDuration')*1000;
      let step = () => this.runTest().then(() => {
        if (new Date() < endAt) {
          return step();
        }
      });
      return step();
    }
  }
});
