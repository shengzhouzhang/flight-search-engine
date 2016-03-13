
import sinon from 'sinon';
import { expect } from 'chai';

import filterStore, { reducer } from '../../../../src/browser/stores/filter';

describe('Filter Store', () => {

  describe('initial state', () => {

    it('should be null', () => {
      expect(filterStore.getState()).to.eql({ min: 0, max: undefined });
    });
  });

  describe('dispatch function', () => {

    it('should update state', () => {
      const FILTER = 'FILTER';
      filterStore.dispatch({ type: 'UPDATE', filter: FILTER });
      expect(filterStore.getState()).to.eql(FILTER);
    });
  });

  describe('subscribe function', () => {

    it('should subscribe to changes', () => {
      const FILTER = 'FILTER';
      let onChangeHander = sinon.spy();
      let unsubscribe = filterStore.subscribe(() => {
        let state = filterStore.getState();
        onChangeHander(state);
      });
      filterStore.dispatch({ type: 'UPDATE', filter: FILTER });
      expect(onChangeHander.called).to.eql(true);
      expect(onChangeHander.getCall(0).args[0]).to.eql(FILTER);
      unsubscribe();
    });
  });

  describe('unsubscribe function', () => {

    it('should unsubscribe from changes', () => {
      const FILTER = 'FILTER';
      let onChangeHander = sinon.spy();
      let unsubscribe = filterStore.subscribe(() => {
        let state = filterStore.getState();
        onChangeHander(state);
      });
      unsubscribe();
      filterStore.dispatch({ type: 'UPDATE', filter: FILTER });
      expect(onChangeHander.called).to.eql(false);
    });
  });

  describe('reducer function', () => {

    it('should handle UPDATE action', () => {
      const FILTER = 'FILTER';
      let state = reducer(null, { type: 'UPDATE', filter: FILTER });
      expect(state).to.eql(FILTER);
    });

    it('should handle default action', () => {
      const FILTER = 'FILTER';
      let state = reducer(FILTER, { type: '', filter: null });
      expect(state).to.eql(FILTER);
    });
  });
});
