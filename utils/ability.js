const { Ability, AbilityBuilder } = require('@casl/ability')

const abilities = (id, role) => {
    const { can, cannot, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'superadmin':
            can('manage', 'all')
            break;
        case 'admin':
            can('read', 'all')
            can('create', 'Pembayaran')
            can(['update', 'delete'], 'Pembayaran', { idPetugas: id })
            can('update', 'Petugas', { id })
            cannot('update', 'Petugas', 'level')
            can('manage', 'Kelas')
            can('manage', 'Siswa')
            break;
        case 'owner':
            can('read', 'all')
            break;
        default:
            break;
    }

    return build()
}

module.exports = abilities