import { assetUrl } from '../../utils/assets'
// DONNÉES ÉDITABLES : annuaire Joueurs / PNJ de démonstration.
export type DirectoryKind = 'players' | 'npcs'
export type MemberSort = 'lastSeen' | 'oldest' | 'newest' | 'rpDesc' | 'rpAsc' | 'bountyDesc' | 'loreImportanceDesc'

export type MemberDirectoryEntry = {
  id: string
  kind: DirectoryKind
  firstName: string
  dynastyName: string
  species: string
  faction: string
  crew: string
  lastSeen: number
  lastSeenLabel: string
  joinedAt: number
  rpCount: number
  bounty: number
  activeRps: number
  avatarImage?: string
  avatarLabel: string
  profileId?: string
  loreImportance?: 1 | 2 | 3 | 4 | 5
}

export const memberDirectory: MemberDirectoryEntry[] = [
  { id: 'm-lysa', kind: 'players', firstName: 'Lysa', dynastyName: 'Arven', species: 'Humain', faction: 'Humanis', crew: 'VVF Raviolo', lastSeen: 2, lastSeenLabel: 'Il y a 2 min', joinedAt: 20251103, rpCount: 31, bounty: 0, activeRps: 2, avatarImage: assetUrl('/lysa-dialogue-realistic.png'), avatarLabel: 'LA', profileId: 'lysa' },
  { id: 'm-seris', kind: 'players', firstName: 'Seris', dynastyName: 'Vaelor', species: 'Humain', faction: 'Primordia', crew: 'VVF Mnémosyne', lastSeen: 18, lastSeenLabel: 'Il y a 18 min', joinedAt: 20251216, rpCount: 18, bounty: 1200, activeRps: 0, avatarImage: assetUrl('/character-dialogue-avatar.png'), avatarLabel: 'SV', profileId: 'seris' },
  { id: 'm-nael', kind: 'players', firstName: 'Nael', dynastyName: 'Coris', species: 'Humain', faction: 'Humanis', crew: 'VVF Azur', lastSeen: 34, lastSeenLabel: 'Il y a 34 min', joinedAt: 20260108, rpCount: 22, bounty: 350, activeRps: 1, avatarImage: assetUrl('/character-dialogue-avatar.png'), avatarLabel: 'NC', profileId: 'nael' },
  { id: 'm-tarek', kind: 'players', firstName: 'Tarek', dynastyName: 'Solan', species: 'Humain', faction: 'Humanis', crew: 'VVF Raviolo', lastSeen: 61, lastSeenLabel: 'Il y a 1 h', joinedAt: 20251201, rpCount: 7, bounty: 0, activeRps: 0, avatarLabel: 'TS' },
  { id: 'm-irae', kind: 'players', firstName: 'Irae', dynastyName: 'Nemor', species: 'Aural (test)', faction: 'Primordia', crew: 'VVF Mnémosyne', lastSeen: 143, lastSeenLabel: 'Il y a 2 h', joinedAt: 20260212, rpCount: 12, bounty: 9400, activeRps: 3, avatarLabel: 'IN' },
  { id: 'm-kael', kind: 'players', firstName: 'Kael', dynastyName: 'Orven', species: 'Syréen (test)', faction: 'Vestiges', crew: 'Éclat Gris', lastSeen: 225, lastSeenLabel: 'Il y a 4 h', joinedAt: 20260303, rpCount: 4, bounty: 28000, activeRps: 0, avatarLabel: 'KO' },
  { id: 'm-nerys', kind: 'players', firstName: 'Nerys', dynastyName: 'Taal', species: 'Aural (test)', faction: 'Humanis', crew: 'Éclat Gris', lastSeen: 390, lastSeenLabel: 'Il y a 6 h', joinedAt: 20260427, rpCount: 16, bounty: 200, activeRps: 1, avatarLabel: 'NT' },
  { id: 'm-evan', kind: 'players', firstName: 'Evan', dynastyName: 'Marek', species: 'Humain', faction: 'Vestiges', crew: '', lastSeen: 710, lastSeenLabel: 'Il y a 12 h', joinedAt: 20260514, rpCount: 1, bounty: 6400, activeRps: 0, avatarLabel: 'EM' },
  { id: 'm-yara', kind: 'players', firstName: 'Yara', dynastyName: 'Kell', species: 'Syréen (test)', faction: 'Primordia', crew: 'VVF Azur', lastSeen: 1210, lastSeenLabel: 'Hier', joinedAt: 20260130, rpCount: 25, bounty: 0, activeRps: 2, avatarLabel: 'YK' },
  { id: 'm-solan', kind: 'players', firstName: 'Solan', dynastyName: 'Meris', species: 'Humain', faction: 'Humanis', crew: 'Aube Lente', lastSeen: 2880, lastSeenLabel: 'Il y a 2 j', joinedAt: 20260702, rpCount: 3, bounty: 17500, activeRps: 0, avatarLabel: 'SM' },
  { id: 'm-maela', kind: 'players', firstName: 'Maela', dynastyName: 'Ryn', species: 'Aural (test)', faction: 'Vestiges', crew: 'Aube Lente', lastSeen: 5760, lastSeenLabel: 'Il y a 4 j', joinedAt: 20260818, rpCount: 2, bounty: 800, activeRps: 0, avatarLabel: 'MR' },
  { id: 'm-joren', kind: 'players', firstName: 'Joren', dynastyName: 'Ilyan', species: 'Humain', faction: 'Humanis', crew: '', lastSeen: 10080, lastSeenLabel: 'Il y a 7 j', joinedAt: 20251121, rpCount: 39, bounty: 42500, activeRps: 4, avatarLabel: 'JI' },
  { id: 'm-sia', kind: 'players', firstName: 'Sia', dynastyName: 'Vel', species: 'Syréen (test)', faction: 'Primordia', crew: 'VVF Mnémosyne', lastSeen: 18720, lastSeenLabel: 'Il y a 13 j', joinedAt: 20260901, rpCount: 0, bounty: 0, activeRps: 0, avatarLabel: 'SV' },
  { id: 'm-lio', kind: 'players', firstName: 'Lio', dynastyName: 'Daren', species: 'Humain', faction: 'Vestiges', crew: 'Éclat Gris', lastSeen: 33120, lastSeenLabel: 'Il y a 23 j', joinedAt: 20260529, rpCount: 8, bounty: 11300, activeRps: 0, avatarLabel: 'LD' },
  { id: 'n-helena', kind: 'npcs', firstName: 'Helena', dynastyName: 'Var', species: 'Humain', faction: 'Humanis', crew: 'Station Hélios', lastSeen: 8, lastSeenLabel: 'Active récemment', joinedAt: 0, rpCount: 0, bounty: 0, activeRps: 1, loreImportance: 5, avatarLabel: 'HV' },
  { id: 'n-oris', kind: 'npcs', firstName: 'Oris', dynastyName: 'Tenn', species: 'Aural (test)', faction: 'Primordia', crew: 'VVF Mnémosyne', lastSeen: 75, lastSeenLabel: 'Active aujourd’hui', joinedAt: 0, rpCount: 0, bounty: 22000, activeRps: 0, loreImportance: 3, avatarLabel: 'OT' },
  { id: 'n-marek', kind: 'npcs', firstName: 'Marek', dynastyName: 'Dross', species: 'Humain', faction: 'Vestiges', crew: 'Éclat Gris', lastSeen: 180, lastSeenLabel: 'Active aujourd’hui', joinedAt: 0, rpCount: 0, bounty: 69000, activeRps: 2, loreImportance: 4, avatarLabel: 'MD' },
  { id: 'n-esha', kind: 'npcs', firstName: 'Esha', dynastyName: 'Venn', species: 'Syréen (test)', faction: 'Humanis', crew: 'Station Hélios', lastSeen: 360, lastSeenLabel: 'Active aujourd’hui', joinedAt: 0, rpCount: 0, bounty: 3500, activeRps: 0, loreImportance: 2, avatarLabel: 'EV' },
  { id: 'n-ros', kind: 'npcs', firstName: 'Ros', dynastyName: 'Kader', species: 'Humain', faction: 'Primordia', crew: '', lastSeen: 1440, lastSeenLabel: 'Active hier', joinedAt: 0, rpCount: 0, bounty: 8700, activeRps: 0, loreImportance: 2, avatarLabel: 'RK' },
  { id: 'n-telis', kind: 'npcs', firstName: 'Telis', dynastyName: 'Ahn', species: 'Aural (test)', faction: 'Vestiges', crew: 'Aube Lente', lastSeen: 4320, lastSeenLabel: 'Active il y a 3 j', joinedAt: 0, rpCount: 0, bounty: 118000, activeRps: 1, loreImportance: 5, avatarLabel: 'TA' },
  { id: 'n-kessa', kind: 'npcs', firstName: 'Kessa', dynastyName: 'Myr', species: 'Syréen (test)', faction: 'Humanis', crew: 'Aube Lente', lastSeen: 8640, lastSeenLabel: 'Active il y a 6 j', joinedAt: 0, rpCount: 0, bounty: 0, activeRps: 0, loreImportance: 1, avatarLabel: 'KM' },
  { id: 'n-varek', kind: 'npcs', firstName: 'Varek', dynastyName: 'Oss', species: 'Humain', faction: 'Vestiges', crew: '', lastSeen: 15840, lastSeenLabel: 'Active il y a 11 j', joinedAt: 0, rpCount: 0, bounty: 51000, activeRps: 0, loreImportance: 4, avatarLabel: 'VO' },
]

