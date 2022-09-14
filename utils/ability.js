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
            can('update', 'Pembayaran', { idPetugas: id })
            can(['read', 'update'], 'Petugas', { id })
            can('delete', 'Pembayaran', { idPetugas: id })
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