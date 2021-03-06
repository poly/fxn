module.exports = (function(fxn) {

  'use strict';

  const async = require('async');

  let expect = require('chai').expect;

  describe('Execution Queue', function() {

    class TestableMiddleware {

      constructor(option1, option2, option3) {
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
      }

      exec(controller, callback) {
        callback(null);
      }

    }

    it('should let props get passed to Middleware', () => {

      let queue = new fxn.ExecutionQueue();

      queue.use(TestableMiddleware, 'cats', 'dogs');

      expect(queue._queue[0].option1).to.equal('cats');
      expect(queue._queue[0].option2).to.equal('dogs');
      expect(queue._queue[0].option3).to.not.exist;


    });

    it('should let still function if no props get passed to Middleware', () => {

      let queue = new fxn.ExecutionQueue();

      queue.use(TestableMiddleware);

      expect(queue._queue[0].option1).to.not.exist
      expect(queue._queue[0].option2).to.not.exist
      expect(queue._queue[0].option3).to.not.exist


    });

    it('should let objects get passed to Middleware', () => {

      let queue = new fxn.ExecutionQueue();

      queue.use(TestableMiddleware, {name: 'cat', type: 'feline'});

      expect(queue._queue[0].option1).to.exist
      expect(queue._queue[0].option1.name).to.equal('cat')
      expect(queue._queue[0].option2).to.not.exist
      expect(queue._queue[0].option3).to.not.exist

    });


  });

});
