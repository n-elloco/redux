import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';


describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later"),
                    tally: Map({Trainspotting: 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles SET_STATE with simple load', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: ["Trainspotting", "28 Days Later"],
                    tally: Map({Trainspotting: 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: ["Trainspotting", "28 Days Later"],
                    tally: Map({Trainspotting: 1})
                })
            })
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('handles VOTE', () => {
        const state = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            },
            hasVoted: 'Trainspotting'
        }));
    });

    it('does not set hasVoted for wrong entry', () => {
        const state = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Sunshine'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            }
        }));
    });

    it('clear hasVoted after changing pair', () => {
        const initialState = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {Trainspotting: 1}
            },
            hasVoted: 'Trainspotting'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionaire']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Sunshine', 'Slumdog Millionaire']
            }
        }));
    });

});
