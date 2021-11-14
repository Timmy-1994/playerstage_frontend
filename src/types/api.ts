interface ISign {
    username:string,
    password:string
}
export interface ISigninRequest extends ISign {}
export interface ISignupRequest extends ISign {}

interface Authority {
    authority: string;
}

export interface ISigninResponse{
    uuid:                  string;
    username:              string;
    password:              string;
    name:                  string;
    birthday:              null;
    sex:                   null;
    phone:                 null;
    email:                 null;
    avatar:                null;
    enabled:               boolean;
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
    valid:                 boolean;
    ctime:                 string;
    utime:                 string;
    authorities:           Authority[];
}
export type ISignupResponse = {
    uuid:                  string;
    username:              string;
    password:              string;
    name:                  string;
    birthday:              null;
    sex:                   null;
    phone:                 null;
    email:                 null;
    avatar:                null;
    enabled:               boolean;
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
    valid:                 boolean;
    ctime:                 null;
    utime:                 null;
}