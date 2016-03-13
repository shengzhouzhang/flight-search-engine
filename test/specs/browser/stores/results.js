
import sinon from 'sinon';
import { expect } from 'chai';

import resultStore, { reducer } from '../../../../src/browser/stores/results';

describe('Results Store', () => {

  describe('initial state', () => {

    it('should be null', () => {
      expect(resultStore.getState()).to.eql(null);
    });
  });

  describe('dispatch function', () => {

    it('should update state', () => {
      const RESULT = 'RESULT';
      resultStore.dispatch({ type: 'UPDATE', result: RESULT });
      expect(resultStore.getState()).to.eql(RESULT);
    });
  });

  describe('subscribe function', () => {

    it('should subscribe to changes', () => {
      const RESULT = 'RESULT';
      let onChangeHander = sinon.spy();
      let unsubscribe = resultStore.subscribe(() => {
        let state = resultStore.getState();
        onChangeHander(state);
      });
      resultStore.dispatch({ type: 'UPDATE', result: RESULT });
      expect(onChangeHander.called).to.eql(true);
      expect(onChangeHander.getCall(0).args[0]).to.eql(RESULT);
      unsubscribe();
    });
  });

  describe('unsubscribe function', () => {

    it('should unsubscribe from changes', () => {
      const RESULT = 'RESULT';
      let onChangeHander = sinon.spy();
      let unsubscribe = resultStore.subscribe(() => {
        let state = resultStore.getState();
        onChangeHander(state);
      });
      unsubscribe();
      resultStore.dispatch({ type: 'UPDATE', result: RESULT });
      expect(onChangeHander.called).to.eql(false);
    });
  });

  describe('reducer function', () => {

    it('should handle UPDATE action', () => {
      const RESULT = 'RESULT';
      let state = reducer(null, { type: 'UPDATE', result: RESULT });
      expect(state).to.eql(RESULT);
    });

    it('should handle default action', () => {
      const RESULT = 'RESULT';
      let state = reducer(RESULT, { type: '', result: null });
      expect(state).to.eql(RESULT);
    });
  });
});
