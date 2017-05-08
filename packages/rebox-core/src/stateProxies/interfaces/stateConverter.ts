import { IImmutableState } from './stateProxy';

export interface IStateConverter {
    convertStateToImmutable<S extends IImmutableState>(object: Object, nonImmutableKeys: string[]): S;
}