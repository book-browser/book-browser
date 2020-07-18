import { Principal } from 'src/app/entity/principal';

export let principal = {
    username: 'false',
    authorities: [],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true,
} as Principal 