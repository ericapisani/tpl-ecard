import { dataReducer, ACTIONS } from '../App.js';

describe("TPL ECard", () => {
  describe("the dataReducer", () => {
    it('should return the initial state', () => {
      const initialState = { libraryCardNumber: "1234" };
      expect(dataReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle SAVE', () => {
      const initialState = { libraryCardNumber: "1234" };
      expect(dataReducer(initialState, { type: ACTIONS.SAVE, payload: "5678" })).toEqual({ libraryCardNumber: "5678" });

    });

    it('should handle DELETE', () => {
      const initialState = { libraryCardNumber: "1234" };
      expect(dataReducer(initialState, { type: ACTIONS.DELETE })).toEqual({ libraryCardNumber: null });
    });
  });
});
