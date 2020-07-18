
export class Principal {
    username: string;
    authorities: Array<string>;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
}