const { Ability, AbilityBuilder } = require('@casl/ability')

const abilities = (id, role) => {
    const { can, build } = new AbilityBuilder(Ability)

    switch (role) {
        case 'superadmin':
            can('manage', 'all')
            break;
        case 'admin':
            can('create', 'Pembayaran')
            can('read', ['Kelas', 'Pembayaran', 'Siswa', 'Spp'])
            can(['update', 'delete'], 'Pembayaran', { idPetugas: id })
            can('update', 'Petugas', { id })
            can('read', 'Petugas')
            can('manage', 'Siswa')
            can('read', 'Spp')
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