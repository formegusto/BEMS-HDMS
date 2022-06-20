export type Response<T> = { status: boolean } & T;
export type Request<T> = {
  clickEvent: {
    success?: () => void;
    failure?: () => void;
  };
} & T;

export type CommonStoreShape<T> = { error: boolean } & T;
