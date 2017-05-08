export interface IInitializable<I, O>{
    initialize(params?: I): O;
}

export interface IAsyncInitializable<I, O>{
    initialize(params?: I): Promise<O>;
}