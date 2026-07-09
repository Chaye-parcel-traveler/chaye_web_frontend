export type EuropeAccess =
  | 'direct_or_connection'
  | 'connection_usually_required'
  | 'limited_or_check_required';

export type Airport = {
  iata: string;
  name: string;
  city: string;
  country?: string;
};

export type Destination = {
  name: string;
  iso2: string;
  status:
    | 'country'
    | 'territory'
    | 'overseas_region'
    | 'overseas_collectivity'
    | 'special_municipality';
  flagImageUrl: string;
  flagImageAlt: string;
  imageUrl: string;
  imageAlt: string;
  europeAccess: EuropeAccess;
  airports: Airport[];
  note?: string;
};

export type EuropeanGateway = {
  country: string;
  iso2: string;
  flagImageUrl: string;
  flagImageAlt: string;
  imageUrl: string;
  imageAlt: string;
  airports: Airport[];
  note?: string;
};

export type FlightDestinationCatalog = {
  $schema: string;
  schemaVersion: string;
  lastReviewed: string;
  locale: 'fr-FR';
  disclaimer: string;
  accessLegend: Record<EuropeAccess, string>;
  imageProviders: {
    flags: {
      name: string;
      pattern: string;
      note: string;
    };
    photos: {
      name: string;
      pattern: string;
      note: string;
    };
  };
  popularEuropeanGatewayAirports: EuropeanGateway[];
  destinations: {
    africa: Destination[];
    antilles: Destination[];
  };
};

export const flightDestinationCatalog = {
  $schema: 'https://example.com/schemas/flight-destination-catalog.schema.json',
  schemaVersion: '1.0.0',
  lastReviewed: '2026-07-06',
  locale: 'fr-FR',
  disclaimer:
    'Base catalogue pour application. Ne garantit pas qu’un vol direct existe tous les jours. Les routes changent selon saison, sécurité, compagnies et autorisations. Pour la production, vérifier avec une API vols/GDS avant affichage tarifaire ou réservation.',
  accessLegend: {
    direct_or_connection:
      'Vols commerciaux généralement possibles depuis l’Europe, en direct ou via correspondance.',
    connection_usually_required:
      'Vols commerciaux possibles, mais correspondance généralement nécessaire.',
    limited_or_check_required:
      'Pays/aéroport à vérifier avant usage public : disponibilité et sécurité peuvent changer rapidement.',
  },
  imageProviders: {
    flags: {
      name: 'FlagCDN / Flagpedia',
      pattern: 'https://flagcdn.com/w320/{iso2-lowercase}.png',
      note: 'Drapeaux stables et faciles à exploiter en interface.',
    },
    photos: {
      name: 'Unsplash Source',
      pattern: 'https://source.unsplash.com/featured/1600x900/?{query}',
      note: 'Photos basées sur des requêtes ciblées par pays/territoire. Pour une version production, il est préférable de figer les assets ou de stocker ses propres URLs validées.',
    },
  },
  popularEuropeanGatewayAirports: [
    {
      country: 'France',
      iso2: 'FR',
      flagImageUrl: 'https://flagcdn.com/w320/fr.png',
      flagImageAlt: 'Drapeau de France',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Versailles%20Tour%20Eiffel%20France',
      imageAlt: 'France — Versailles et Tour Eiffel',
      airports: [
        {
          iata: 'CDG',
          name: 'Paris-Charles-de-Gaulle',
          city: 'Paris',
        },
        {
          iata: 'ORY',
          name: 'Paris-Orly',
          city: 'Paris',
        },
        {
          iata: 'BOD',
          name: 'Bordeaux-Mérignac',
          city: 'Bordeaux',
        },
        {
          iata: 'LYS',
          name: 'Lyon-Saint-Exupéry',
          city: 'Lyon',
        },
        {
          iata: 'MRS',
          name: 'Marseille-Provence',
          city: 'Marseille',
        },
        {
          iata: 'NTE',
          name: 'Nantes-Atlantique',
          city: 'Nantes',
        },
      ],
    },
    {
      country: 'Belgique',
      iso2: 'BE',
      flagImageUrl: 'https://flagcdn.com/w320/be.png',
      flagImageAlt: 'Drapeau de Belgique',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Grand%20Place%20Bruxelles%20Belgique',
      imageAlt: 'Belgique — Grand-Place de Bruxelles',
      airports: [
        {
          iata: 'BRU',
          name: 'Brussels Airport',
          city: 'Bruxelles',
        },
        {
          iata: 'CRL',
          name: 'Brussels South Charleroi',
          city: 'Charleroi',
        },
      ],
    },
    {
      country: 'Pays-Bas',
      iso2: 'NL',
      flagImageUrl: 'https://flagcdn.com/w320/nl.png',
      flagImageAlt: 'Drapeau de Pays-Bas',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Amsterdam%20canals%20windmills%20Netherlands',
      imageAlt: 'Pays-Bas — canaux d’Amsterdam et moulins',
      airports: [
        {
          iata: 'AMS',
          name: 'Amsterdam-Schiphol',
          city: 'Amsterdam',
        },
      ],
    },
    {
      country: 'Allemagne',
      iso2: 'DE',
      flagImageUrl: 'https://flagcdn.com/w320/de.png',
      flagImageAlt: 'Drapeau de Allemagne',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Neuschwanstein%20Castle%20Germany',
      imageAlt: 'Allemagne — château de Neuschwanstein',
      airports: [
        {
          iata: 'FRA',
          name: 'Francfort-sur-le-Main',
          city: 'Francfort',
        },
        {
          iata: 'MUC',
          name: 'Munich-Franz-Josef-Strauss',
          city: 'Munich',
        },
        {
          iata: 'BER',
          name: 'Berlin-Brandenburg',
          city: 'Berlin',
        },
      ],
    },
    {
      country: 'Royaume-Uni',
      iso2: 'GB',
      flagImageUrl: 'https://flagcdn.com/w320/gb.png',
      flagImageAlt: 'Drapeau de Royaume-Uni',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Tower%20Bridge%20London%20United%20Kingdom',
      imageAlt: 'Royaume-Uni — Tower Bridge à Londres',
      airports: [
        {
          iata: 'LHR',
          name: 'London Heathrow',
          city: 'Londres',
        },
        {
          iata: 'LGW',
          name: 'London Gatwick',
          city: 'Londres',
        },
        {
          iata: 'MAN',
          name: 'Manchester Airport',
          city: 'Manchester',
        },
        {
          iata: 'BHX',
          name: 'Birmingham Airport',
          city: 'Birmingham',
        },
      ],
    },
    {
      country: 'Espagne',
      iso2: 'ES',
      flagImageUrl: 'https://flagcdn.com/w320/es.png',
      flagImageAlt: 'Drapeau de Espagne',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Sagrada%20Familia%20Barcelona%20Spain',
      imageAlt: 'Espagne — Sagrada Família à Barcelone',
      airports: [
        {
          iata: 'MAD',
          name: 'Adolfo-Suárez Madrid-Barajas',
          city: 'Madrid',
        },
        {
          iata: 'BCN',
          name: 'Barcelona-El Prat',
          city: 'Barcelone',
        },
        {
          iata: 'PMI',
          name: 'Palma de Mallorca',
          city: 'Palma',
        },
      ],
    },
    {
      country: 'Portugal',
      iso2: 'PT',
      flagImageUrl: 'https://flagcdn.com/w320/pt.png',
      flagImageAlt: 'Drapeau de Portugal',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Lisbon%20Belem%20Portugal',
      imageAlt: 'Portugal — Lisbonne et Belém',
      airports: [
        {
          iata: 'LIS',
          name: 'Lisbonne-Humberto Delgado',
          city: 'Lisbonne',
        },
        {
          iata: 'OPO',
          name: 'Porto-Francisco Sá Carneiro',
          city: 'Porto',
        },
      ],
    },
    {
      country: 'Italie',
      iso2: 'IT',
      flagImageUrl: 'https://flagcdn.com/w320/it.png',
      flagImageAlt: 'Drapeau de Italie',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Colosseum%20Rome%20Italy',
      imageAlt: 'Italie — Colisée de Rome',
      airports: [
        {
          iata: 'FCO',
          name: 'Rome-Fiumicino',
          city: 'Rome',
        },
        {
          iata: 'MXP',
          name: 'Milan-Malpensa',
          city: 'Milan',
        },
      ],
    },
    {
      country: 'Suisse',
      iso2: 'CH',
      flagImageUrl: 'https://flagcdn.com/w320/ch.png',
      flagImageAlt: 'Drapeau de Suisse',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Matterhorn%20Zermatt%20Switzerland',
      imageAlt: 'Suisse — Cervin à Zermatt',
      airports: [
        {
          iata: 'ZRH',
          name: 'Zurich Airport',
          city: 'Zurich',
        },
        {
          iata: 'GVA',
          name: 'Genève Aéroport',
          city: 'Genève',
        },
      ],
    },
    {
      country: 'Autriche',
      iso2: 'AT',
      flagImageUrl: 'https://flagcdn.com/w320/at.png',
      flagImageAlt: 'Drapeau de Autriche',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Hallstatt%20Austria',
      imageAlt: 'Autriche — Hallstatt',
      airports: [
        {
          iata: 'VIE',
          name: 'Aéroport de Vienne-Schwechat',
          city: 'Vienne',
        },
      ],
    },
    {
      country: 'Turquie',
      iso2: 'TR',
      flagImageUrl: 'https://flagcdn.com/w320/tr.png',
      flagImageAlt: 'Drapeau de Turquie',
      imageUrl:
        'https://source.unsplash.com/featured/1600x900/?Cappadocia%20hot%20air%20balloons%20Turkey',
      imageAlt: 'Turquie — Cappadoce et montgolfières',
      airports: [
        {
          iata: 'IST',
          name: 'Istanbul Airport',
          city: 'Istanbul',
        },
        {
          iata: 'SAW',
          name: 'Istanbul-Sabiha Gökçen',
          city: 'Istanbul',
        },
      ],
      note: 'Hub euro-asiatique très utilisé pour les correspondances Afrique/Antilles.',
    },
  ],
  destinations: {
    africa: [
      {
        name: 'Algérie',
        iso2: 'DZ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/dz.png',
        flagImageAlt: 'Drapeau de Algérie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Casbah%20Algiers%20Algeria',
        imageAlt: 'Algérie — Casbah d’Alger',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'ALG',
            name: 'Aéroport d’Alger - Houari-Boumédiène',
            city: 'Alger',
          },
          {
            iata: 'ORN',
            name: 'Aéroport d’Oran - Ahmed Ben Bella',
            city: 'Oran',
          },
          {
            iata: 'CZL',
            name: 'Aéroport de Constantine - Mohamed Boudiaf',
            city: 'Constantine',
          },
        ],
      },
      {
        name: 'Angola',
        iso2: 'AO',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ao.png',
        flagImageAlt: 'Drapeau de Angola',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Kalandula%20Falls%20Angola',
        imageAlt: 'Angola — chutes de Kalandula',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'LAD',
            name: 'Aéroport international Quatro de Fevereiro',
            city: 'Luanda',
          },
          {
            iata: 'CBT',
            name: 'Aéroport de Catumbela',
            city: 'Catumbela',
          },
          {
            iata: 'CAB',
            name: 'Aéroport de Cabinda',
            city: 'Cabinda',
          },
        ],
      },
      {
        name: 'Bénin',
        iso2: 'BJ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bj.png',
        flagImageAlt: 'Drapeau de Bénin',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Ganvie%20Benin',
        imageAlt: 'Bénin — cité lacustre de Ganvié',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'COO',
            name: 'Aéroport international Cardinal Bernardin Gantin',
            city: 'Cotonou',
          },
        ],
      },
      {
        name: 'Botswana',
        iso2: 'BW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bw.png',
        flagImageAlt: 'Drapeau de Botswana',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Okavango%20Delta%20Botswana',
        imageAlt: 'Botswana — delta de l’Okavango',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'GBE',
            name: 'Aéroport international Sir Seretse Khama',
            city: 'Gaborone',
          },
          {
            iata: 'MUB',
            name: 'Aéroport de Maun',
            city: 'Maun',
          },
          {
            iata: 'BBK',
            name: 'Aéroport de Kasane',
            city: 'Kasane',
          },
        ],
      },
      {
        name: 'Burkina Faso',
        iso2: 'BF',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bf.png',
        flagImageAlt: 'Drapeau de Burkina Faso',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Sindou%20Peaks%20Burkina%20Faso',
        imageAlt: 'Burkina Faso — pics de Sindou',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'OUA',
            name: 'Aéroport international de Ouagadougou',
            city: 'Ouagadougou',
          },
          {
            iata: 'BOY',
            name: 'Aéroport de Bobo-Dioulasso',
            city: 'Bobo-Dioulasso',
          },
        ],
        note: 'Vérifier les restrictions de sécurité selon période.',
      },
      {
        name: 'Burundi',
        iso2: 'BI',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bi.png',
        flagImageAlt: 'Drapeau de Burundi',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Lake%20Tanganyika%20Burundi',
        imageAlt: 'Burundi — lac Tanganyika',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'BJM',
            name: 'Aéroport international Melchior Ndadaye',
            city: 'Bujumbura',
          },
        ],
      },
      {
        name: 'Cabo Verde',
        iso2: 'CV',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cv.png',
        flagImageAlt: 'Drapeau de Cabo Verde',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Santo%20Antao%20Cape%20Verde',
        imageAlt: 'Cabo Verde — paysages de Santo Antão',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SID',
            name: 'Aéroport international Amílcar-Cabral',
            city: 'Sal',
          },
          {
            iata: 'RAI',
            name: 'Aéroport international Nelson Mandela',
            city: 'Praia',
          },
          {
            iata: 'VXE',
            name: 'Aéroport Cesária-Évora',
            city: 'São Vicente',
          },
          {
            iata: 'BVC',
            name: 'Aéroport international Aristides-Pereira',
            city: 'Boa Vista',
          },
        ],
      },
      {
        name: 'Cameroun',
        iso2: 'CM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cm.png',
        flagImageAlt: 'Drapeau de Cameroun',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Mount%20Cameroon%20Kribi%20Cameroon',
        imageAlt: 'Cameroun — mont Cameroun ou plages de Kribi',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'DLA',
            name: 'Aéroport international de Douala',
            city: 'Douala',
          },
          {
            iata: 'NSI',
            name: 'Aéroport international de Yaoundé-Nsimalen',
            city: 'Yaoundé',
          },
        ],
      },
      {
        name: 'République centrafricaine',
        iso2: 'CF',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cf.png',
        flagImageAlt: 'Drapeau de République centrafricaine',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Dzanga%20Sangha%20Central%20African%20Republic',
        imageAlt: 'République centrafricaine — réserve de Dzanga-Sangha',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'BGF',
            name: "Aéroport international Bangui M'Poko",
            city: 'Bangui',
          },
        ],
        note: 'Vérifier les restrictions de sécurité selon période.',
      },
      {
        name: 'Tchad',
        iso2: 'TD',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/td.png',
        flagImageAlt: 'Drapeau de Tchad',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Ennedi%20Chad%20desert%20arches',
        imageAlt: 'Tchad — plateau de l’Ennedi',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'NDJ',
            name: "Aéroport international de N'Djaména",
            city: "N'Djaména",
          },
        ],
        note: 'Vérifier les restrictions de sécurité selon période.',
      },
      {
        name: 'Comores',
        iso2: 'KM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/km.png',
        flagImageAlt: 'Drapeau de Comores',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Comoros%20beach%20Karthala',
        imageAlt: 'Comores — plages et volcan Karthala',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'HAH',
            name: 'Aéroport international Prince Said Ibrahim',
            city: 'Moroni',
          },
          {
            iata: 'AJN',
            name: "Aéroport d'Ouani",
            city: 'Anjouan',
          },
        ],
      },
      {
        name: 'Congo',
        iso2: 'CG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cg.png',
        flagImageAlt: 'Drapeau de Congo',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Congo%20River%20Brazzaville',
        imageAlt: 'Congo — fleuve Congo à Brazzaville',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'BZV',
            name: 'Aéroport international Maya-Maya',
            city: 'Brazzaville',
          },
          {
            iata: 'PNR',
            name: 'Aéroport international Agostinho-Neto',
            city: 'Pointe-Noire',
          },
        ],
      },
      {
        name: 'Côte d’Ivoire',
        iso2: 'CI',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ci.png',
        flagImageAlt: 'Drapeau de Côte d’Ivoire',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Yamoussoukro%20Basilica%20C%C3%B4te%20d%27Ivoire',
        imageAlt: 'Côte d’Ivoire — basilique de Yamoussoukro',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'ABJ',
            name: 'Aéroport international Félix-Houphouët-Boigny',
            city: 'Abidjan',
          },
        ],
      },
      {
        name: 'République démocratique du Congo',
        iso2: 'CD',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cd.png',
        flagImageAlt: 'Drapeau de République démocratique du Congo',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Virunga%20Democratic%20Republic%20of%20the%20Congo',
        imageAlt: 'République démocratique du Congo — parc des Virunga',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'FIH',
            name: "Aéroport international de N'djili",
            city: 'Kinshasa',
          },
          {
            iata: 'FBM',
            name: 'Aéroport international de Lubumbashi',
            city: 'Lubumbashi',
          },
          {
            iata: 'GOM',
            name: 'Aéroport international de Goma',
            city: 'Goma',
          },
        ],
      },
      {
        name: 'Djibouti',
        iso2: 'DJ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/dj.png',
        flagImageAlt: 'Drapeau de Djibouti',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Lake%20Assal%20Djibouti',
        imageAlt: 'Djibouti — lac Assal',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'JIB',
            name: 'Aéroport international Ambouli',
            city: 'Djibouti',
          },
        ],
      },
      {
        name: 'Égypte',
        iso2: 'EG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/eg.png',
        flagImageAlt: 'Drapeau de Égypte',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Giza%20pyramids%20Egypt',
        imageAlt: 'Égypte — pyramides de Gizeh',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'CAI',
            name: 'Aéroport international du Caire',
            city: 'Le Caire',
          },
          {
            iata: 'HRG',
            name: 'Aéroport international d’Hurghada',
            city: 'Hurghada',
          },
          {
            iata: 'SSH',
            name: 'Aéroport international de Charm el-Cheikh',
            city: 'Charm el-Cheikh',
          },
          {
            iata: 'LXR',
            name: 'Aéroport international de Louxor',
            city: 'Louxor',
          },
          {
            iata: 'HBE',
            name: 'Aéroport Borg El Arab',
            city: 'Alexandrie',
          },
        ],
      },
      {
        name: 'Guinée équatoriale',
        iso2: 'GQ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gq.png',
        flagImageAlt: 'Drapeau de Guinée équatoriale',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Malabo%20Bioko%20Equatorial%20Guinea',
        imageAlt: 'Guinée équatoriale — Malabo et île de Bioko',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SSG',
            name: 'Aéroport international de Malabo',
            city: 'Malabo',
          },
          {
            iata: 'BSG',
            name: 'Aéroport de Bata',
            city: 'Bata',
          },
        ],
      },
      {
        name: 'Érythrée',
        iso2: 'ER',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/er.png',
        flagImageAlt: 'Drapeau de Érythrée',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Asmara%20Eritrea%20architecture',
        imageAlt: 'Érythrée — architecture d’Asmara',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'ASM',
            name: 'Aéroport international d’Asmara',
            city: 'Asmara',
          },
        ],
        note: 'Vérifier ouverture commerciale et restrictions avant usage.',
      },
      {
        name: 'Eswatini',
        iso2: 'SZ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sz.png',
        flagImageAlt: 'Drapeau de Eswatini',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Mlilwane%20Eswatini%20landscape',
        imageAlt: 'Eswatini — paysages de Mlilwane',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'SHO',
            name: 'Aéroport international King Mswati III',
            city: 'Manzini',
          },
        ],
      },
      {
        name: 'Éthiopie',
        iso2: 'ET',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/et.png',
        flagImageAlt: 'Drapeau de Éthiopie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Lalibela%20Ethiopia',
        imageAlt: 'Éthiopie — églises de Lalibela',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'ADD',
            name: 'Aéroport international de Bole',
            city: 'Addis-Abeba',
          },
          {
            iata: 'DIR',
            name: 'Aéroport international d’Aba Tenna Dejazmach Yilma',
            city: 'Dire Dawa',
          },
          {
            iata: 'BJR',
            name: 'Aéroport de Bahir Dar',
            city: 'Bahir Dar',
          },
        ],
      },
      {
        name: 'Gabon',
        iso2: 'GA',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ga.png',
        flagImageAlt: 'Drapeau de Gabon',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Loango%20National%20Park%20Gabon',
        imageAlt: 'Gabon — parc national de Loango',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'LBV',
            name: 'Aéroport international Léon-Mba',
            city: 'Libreville',
          },
          {
            iata: 'POG',
            name: 'Aéroport international de Port-Gentil',
            city: 'Port-Gentil',
          },
        ],
      },
      {
        name: 'Gambie',
        iso2: 'GM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gm.png',
        flagImageAlt: 'Drapeau de Gambie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Gambia%20River%20Kunta%20Kinteh%20Island',
        imageAlt: 'Gambie — fleuve Gambie',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'BJL',
            name: 'Aéroport international de Banjul',
            city: 'Banjul',
          },
        ],
      },
      {
        name: 'Ghana',
        iso2: 'GH',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gh.png',
        flagImageAlt: 'Drapeau de Ghana',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Cape%20Coast%20Castle%20Ghana',
        imageAlt: 'Ghana — Cape Coast Castle',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'ACC',
            name: 'Aéroport international Kotoka',
            city: 'Accra',
          },
          {
            iata: 'KMS',
            name: 'Aéroport de Kumasi',
            city: 'Kumasi',
          },
        ],
      },
      {
        name: 'Guinée',
        iso2: 'GN',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gn.png',
        flagImageAlt: 'Drapeau de Guinée',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Fouta%20Djallon%20Guinea%20waterfalls',
        imageAlt: 'Guinée — Fouta-Djalon',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'CKY',
            name: 'Aéroport international Ahmed Sékou Touré',
            city: 'Conakry',
          },
        ],
      },
      {
        name: 'Guinée-Bissau',
        iso2: 'GW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gw.png',
        flagImageAlt: 'Drapeau de Guinée-Bissau',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Bijagos%20Guinea%20Bissau',
        imageAlt: 'Guinée-Bissau — archipel des Bijagos',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'OXB',
            name: 'Aéroport international Osvaldo Vieira',
            city: 'Bissau',
          },
        ],
      },
      {
        name: 'Kenya',
        iso2: 'KE',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ke.png',
        flagImageAlt: 'Drapeau de Kenya',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Masai%20Mara%20Kenya',
        imageAlt: 'Kenya — Masai Mara',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'NBO',
            name: 'Aéroport international Jomo Kenyatta',
            city: 'Nairobi',
          },
          {
            iata: 'MBA',
            name: 'Aéroport international Moi',
            city: 'Mombasa',
          },
          {
            iata: 'WIL',
            name: 'Aéroport Wilson',
            city: 'Nairobi',
          },
        ],
      },
      {
        name: 'Lesotho',
        iso2: 'LS',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ls.png',
        flagImageAlt: 'Drapeau de Lesotho',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Sani%20Pass%20Lesotho%20mountains',
        imageAlt: 'Lesotho — montagnes du Sani Pass',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'MSU',
            name: 'Aéroport international Moshoeshoe I',
            city: 'Maseru',
          },
        ],
      },
      {
        name: 'Liberia',
        iso2: 'LR',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/lr.png',
        flagImageAlt: 'Drapeau de Liberia',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Robertsport%20Liberia%20beach',
        imageAlt: 'Liberia — plages de Robertsport',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'ROB',
            name: 'Aéroport international Roberts',
            city: 'Monrovia',
          },
        ],
      },
      {
        name: 'Libye',
        iso2: 'LY',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ly.png',
        flagImageAlt: 'Drapeau de Libye',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Leptis%20Magna%20Libya',
        imageAlt: 'Libye — site antique de Leptis Magna',
        europeAccess: 'limited_or_check_required',
        airports: [
          {
            iata: 'MJI',
            name: 'Aéroport international de Mitiga',
            city: 'Tripoli',
          },
          {
            iata: 'BEN',
            name: 'Aéroport international de Benina',
            city: 'Benghazi',
          },
          {
            iata: 'TIP',
            name: 'Aéroport international de Tripoli',
            city: 'Tripoli',
          },
        ],
        note: 'Vols et sécurité à vérifier fortement avant toute promesse utilisateur.',
      },
      {
        name: 'Madagascar',
        iso2: 'MG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/mg.png',
        flagImageAlt: 'Drapeau de Madagascar',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Avenue%20of%20the%20Baobabs%20Madagascar',
        imageAlt: 'Madagascar — allée des baobabs',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'TNR',
            name: "Aéroport international d'Ivato",
            city: 'Antananarivo',
          },
          {
            iata: 'NOS',
            name: 'Aéroport de Fascene',
            city: 'Nosy Be',
          },
          {
            iata: 'TLE',
            name: 'Aéroport de Toliara',
            city: 'Toliara',
          },
        ],
      },
      {
        name: 'Malawi',
        iso2: 'MW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/mw.png',
        flagImageAlt: 'Drapeau de Malawi',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Lake%20Malawi',
        imageAlt: 'Malawi — lac Malawi',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'LLW',
            name: 'Aéroport international Kamuzu',
            city: 'Lilongwe',
          },
          {
            iata: 'BLZ',
            name: 'Aéroport international Chileka',
            city: 'Blantyre',
          },
        ],
      },
      {
        name: 'Mali',
        iso2: 'ML',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ml.png',
        flagImageAlt: 'Drapeau de Mali',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Djenne%20Mosque%20Mali',
        imageAlt: 'Mali — grande mosquée de Djenné',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'BKO',
            name: 'Aéroport international Modibo-Keïta',
            city: 'Bamako',
          },
        ],
        note: 'Vérifier les restrictions de sécurité selon période.',
      },
      {
        name: 'Mauritanie',
        iso2: 'MR',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/mr.png',
        flagImageAlt: 'Drapeau de Mauritanie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Chinguetti%20Mauritania%20desert',
        imageAlt: 'Mauritanie — Chinguetti et désert',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'NKC',
            name: 'Aéroport international de Nouakchott-Oumtounsy',
            city: 'Nouakchott',
          },
          {
            iata: 'NDB',
            name: 'Aéroport international de Nouadhibou',
            city: 'Nouadhibou',
          },
        ],
      },
      {
        name: 'Maurice',
        iso2: 'MU',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/mu.png',
        flagImageAlt: 'Drapeau de Maurice',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Le%20Morne%20Brabant%20Mauritius',
        imageAlt: 'Maurice — Morne Brabant',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'MRU',
            name: 'Aéroport international Sir Seewoosagur Ramgoolam',
            city: 'Plaine Magnien',
          },
        ],
      },
      {
        name: 'Maroc',
        iso2: 'MA',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ma.png',
        flagImageAlt: 'Drapeau de Maroc',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Chefchaouen%20Morocco',
        imageAlt: 'Maroc — Chefchaouen',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'CMN',
            name: 'Aéroport Mohammed V',
            city: 'Casablanca',
          },
          {
            iata: 'RAK',
            name: 'Aéroport Marrakech-Ménara',
            city: 'Marrakech',
          },
          {
            iata: 'AGA',
            name: 'Aéroport Agadir-Al Massira',
            city: 'Agadir',
          },
          {
            iata: 'TNG',
            name: 'Aéroport Tanger-Ibn Battouta',
            city: 'Tanger',
          },
          {
            iata: 'FEZ',
            name: 'Aéroport Fès-Saïss',
            city: 'Fès',
          },
        ],
      },
      {
        name: 'Mozambique',
        iso2: 'MZ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/mz.png',
        flagImageAlt: 'Drapeau de Mozambique',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Bazaruto%20Mozambique',
        imageAlt: 'Mozambique — archipel de Bazaruto',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'MPM',
            name: 'Aéroport international de Maputo',
            city: 'Maputo',
          },
          {
            iata: 'BEW',
            name: 'Aéroport de Beira',
            city: 'Beira',
          },
          {
            iata: 'VNX',
            name: 'Aéroport de Vilankulo',
            city: 'Vilankulo',
          },
        ],
      },
      {
        name: 'Namibie',
        iso2: 'NA',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/na.png',
        flagImageAlt: 'Drapeau de Namibie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Sossusvlei%20Namibia',
        imageAlt: 'Namibie — dunes de Sossusvlei',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'WDH',
            name: 'Aéroport international Hosea Kutako',
            city: 'Windhoek',
          },
          {
            iata: 'WVB',
            name: 'Aéroport de Walvis Bay',
            city: 'Walvis Bay',
          },
        ],
      },
      {
        name: 'Niger',
        iso2: 'NE',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ne.png',
        flagImageAlt: 'Drapeau de Niger',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Agadez%20Niger%20desert',
        imageAlt: 'Niger — Agadez et désert',
        europeAccess: 'limited_or_check_required',
        airports: [
          {
            iata: 'NIM',
            name: 'Aéroport international Diori Hamani',
            city: 'Niamey',
          },
          {
            iata: 'AJY',
            name: 'Aéroport international Mano Dayak',
            city: 'Agadez',
          },
        ],
        note: 'Vols et sécurité à vérifier avant toute promesse utilisateur.',
      },
      {
        name: 'Nigeria',
        iso2: 'NG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ng.png',
        flagImageAlt: 'Drapeau de Nigeria',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Zuma%20Rock%20Nigeria',
        imageAlt: 'Nigeria — Zuma Rock',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'LOS',
            name: 'Aéroport international Murtala-Muhammed',
            city: 'Lagos',
          },
          {
            iata: 'ABV',
            name: 'Aéroport international Nnamdi-Azikiwe',
            city: 'Abuja',
          },
          {
            iata: 'KAN',
            name: 'Aéroport international Mallam Aminu Kano',
            city: 'Kano',
          },
          {
            iata: 'PHC',
            name: 'Aéroport international de Port Harcourt',
            city: 'Port Harcourt',
          },
        ],
      },
      {
        name: 'Rwanda',
        iso2: 'RW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/rw.png',
        flagImageAlt: 'Drapeau de Rwanda',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Volcanoes%20National%20Park%20Rwanda',
        imageAlt: 'Rwanda — parc national des Volcans',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'KGL',
            name: 'Aéroport international de Kigali',
            city: 'Kigali',
          },
        ],
      },
      {
        name: 'São Tomé-et-Príncipe',
        iso2: 'ST',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/st.png',
        flagImageAlt: 'Drapeau de São Tomé-et-Príncipe',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Pico%20Cao%20Grande%20Sao%20Tome%20and%20Principe',
        imageAlt: 'São Tomé-et-Príncipe — Pico Cão Grande',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'TMS',
            name: 'Aéroport international de São Tomé',
            city: 'São Tomé',
          },
          {
            iata: 'PCP',
            name: 'Aéroport de Principe',
            city: 'Príncipe',
          },
        ],
      },
      {
        name: 'Sénégal',
        iso2: 'SN',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sn.png',
        flagImageAlt: 'Drapeau de Sénégal',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Goree%20Island%20Dakar%20Senegal',
        imageAlt: 'Sénégal — île de Gorée',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'DSS',
            name: 'Aéroport international Blaise-Diagne',
            city: 'Dakar',
          },
          {
            iata: 'CSK',
            name: 'Aéroport de Cap Skirring',
            city: 'Cap Skirring',
          },
        ],
      },
      {
        name: 'Seychelles',
        iso2: 'SC',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sc.png',
        flagImageAlt: 'Drapeau de Seychelles',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Anse%20Source%20d%27Argent%20Seychelles',
        imageAlt: 'Seychelles — Anse Source d’Argent',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SEZ',
            name: 'Aéroport international des Seychelles',
            city: 'Mahé',
          },
        ],
      },
      {
        name: 'Sierra Leone',
        iso2: 'SL',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sl.png',
        flagImageAlt: 'Drapeau de Sierra Leone',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?River%20No%202%20Beach%20Sierra%20Leone',
        imageAlt: 'Sierra Leone — River Number Two Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'FNA',
            name: 'Aéroport international de Freetown',
            city: 'Freetown',
          },
        ],
      },
      {
        name: 'Somalie',
        iso2: 'SO',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/so.png',
        flagImageAlt: 'Drapeau de Somalie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Lido%20Beach%20Mogadishu%20Somalia',
        imageAlt: 'Somalie — plage de Lido à Mogadiscio',
        europeAccess: 'limited_or_check_required',
        airports: [
          {
            iata: 'MGQ',
            name: 'Aéroport international Aden Adde',
            city: 'Mogadiscio',
          },
          {
            iata: 'HGA',
            name: 'Aéroport international d’Hargeisa',
            city: 'Hargeisa',
          },
          {
            iata: 'BSA',
            name: 'Aéroport de Bosaso',
            city: 'Bosaso',
          },
        ],
        note: 'Vols et sécurité à vérifier fortement avant toute promesse utilisateur.',
      },
      {
        name: 'Afrique du Sud',
        iso2: 'ZA',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/za.png',
        flagImageAlt: 'Drapeau de Afrique du Sud',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Table%20Mountain%20Cape%20Town%20South%20Africa',
        imageAlt: 'Afrique du Sud — Table Mountain au Cap',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'JNB',
            name: 'Aéroport international OR Tambo',
            city: 'Johannesburg',
          },
          {
            iata: 'CPT',
            name: 'Aéroport international du Cap',
            city: 'Le Cap',
          },
          {
            iata: 'DUR',
            name: 'Aéroport international King Shaka',
            city: 'Durban',
          },
        ],
      },
      {
        name: 'Soudan du Sud',
        iso2: 'SS',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ss.png',
        flagImageAlt: 'Drapeau de Soudan du Sud',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Sudd%20South%20Sudan%20wetlands',
        imageAlt: 'Soudan du Sud — marais du Sudd',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'JUB',
            name: 'Aéroport international de Djouba',
            city: 'Djouba',
          },
        ],
        note: 'Vérifier les restrictions de sécurité selon période.',
      },
      {
        name: 'Soudan',
        iso2: 'SD',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sd.png',
        flagImageAlt: 'Drapeau de Soudan',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Meroe%20pyramids%20Sudan',
        imageAlt: 'Soudan — pyramides de Méroé',
        europeAccess: 'limited_or_check_required',
        airports: [
          {
            iata: 'PZU',
            name: 'Aéroport international de Port-Soudan',
            city: 'Port-Soudan',
          },
          {
            iata: 'KRT',
            name: 'Aéroport international de Khartoum',
            city: 'Khartoum',
          },
        ],
        note: 'Port-Soudan sert de hub international principal; Khartoum reste à vérifier selon reprise opérationnelle.',
      },
      {
        name: 'Tanzanie',
        iso2: 'TZ',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/tz.png',
        flagImageAlt: 'Drapeau de Tanzanie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Kilimanjaro%20Zanzibar%20Tanzania',
        imageAlt: 'Tanzanie — Kilimandjaro ou Zanzibar',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'DAR',
            name: 'Aéroport international Julius Nyerere',
            city: 'Dar es Salaam',
          },
          {
            iata: 'JRO',
            name: 'Aéroport international du Kilimandjaro',
            city: 'Kilimandjaro/Arusha',
          },
          {
            iata: 'ZNZ',
            name: 'Aéroport international Abeid Amani Karume',
            city: 'Zanzibar',
          },
        ],
      },
      {
        name: 'Togo',
        iso2: 'TG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/tg.png',
        flagImageAlt: 'Drapeau de Togo',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Kpalime%20Togo%20waterfall',
        imageAlt: 'Togo — paysages de Kpalimé',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'LFW',
            name: 'Aéroport international Gnassingbé Eyadéma',
            city: 'Lomé',
          },
        ],
      },
      {
        name: 'Tunisie',
        iso2: 'TN',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/tn.png',
        flagImageAlt: 'Drapeau de Tunisie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Sidi%20Bou%20Said%20Tunisia',
        imageAlt: 'Tunisie — Sidi Bou Saïd',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'TUN',
            name: 'Aéroport Tunis-Carthage',
            city: 'Tunis',
          },
          {
            iata: 'MIR',
            name: 'Aéroport international de Monastir Habib-Bourguiba',
            city: 'Monastir',
          },
          {
            iata: 'DJE',
            name: 'Aéroport international de Djerba-Zarzis',
            city: 'Djerba',
          },
          {
            iata: 'NBE',
            name: 'Aéroport international Enfidha-Hammamet',
            city: 'Enfidha',
          },
        ],
      },
      {
        name: 'Ouganda',
        iso2: 'UG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ug.png',
        flagImageAlt: 'Drapeau de Ouganda',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Bwindi%20Uganda%20forest',
        imageAlt: 'Ouganda — forêt de Bwindi',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'EBB',
            name: 'Aéroport international d’Entebbe',
            city: 'Entebbe',
          },
        ],
      },
      {
        name: 'Zambie',
        iso2: 'ZM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/zm.png',
        flagImageAlt: 'Drapeau de Zambie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Victoria%20Falls%20Zambia',
        imageAlt: 'Zambie — chutes Victoria',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'LUN',
            name: 'Aéroport international Kenneth Kaunda',
            city: 'Lusaka',
          },
          {
            iata: 'LVI',
            name: 'Aéroport Harry Mwanga Nkumbula',
            city: 'Livingstone',
          },
          {
            iata: 'NLA',
            name: 'Aéroport international Simon Mwansa Kapwepwe',
            city: 'Ndola',
          },
        ],
      },
      {
        name: 'Zimbabwe',
        iso2: 'ZW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/zw.png',
        flagImageAlt: 'Drapeau de Zimbabwe',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Victoria%20Falls%20Zimbabwe',
        imageAlt: 'Zimbabwe — chutes Victoria',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'HRE',
            name: 'Aéroport international Robert Gabriel Mugabe',
            city: 'Harare',
          },
          {
            iata: 'VFA',
            name: 'Aéroport de Victoria Falls',
            city: 'Victoria Falls',
          },
          {
            iata: 'BUQ',
            name: 'Aéroport international Joshua Mqabuko Nkomo',
            city: 'Bulawayo',
          },
        ],
      },
      {
        name: 'Réunion',
        iso2: 'RE',
        status: 'overseas_region',
        flagImageUrl: 'https://flagcdn.com/w320/re.png',
        flagImageAlt: 'Drapeau de Réunion',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Piton%20de%20la%20Fournaise%20Reunion%20Island',
        imageAlt: 'Réunion — Piton de la Fournaise',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'RUN',
            name: 'Aéroport de La Réunion Roland-Garros',
            city: 'Saint-Denis',
          },
          {
            iata: 'ZSE',
            name: 'Aéroport de Pierrefonds',
            city: 'Saint-Pierre',
          },
        ],
        note: 'Collectivité française dans l’océan Indien, utile si le périmètre DOM-TOM est inclus.',
      },
      {
        name: 'Mayotte',
        iso2: 'YT',
        status: 'overseas_region',
        flagImageUrl: 'https://flagcdn.com/w320/yt.png',
        flagImageAlt: 'Drapeau de Mayotte',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Mayotte%20lagoon',
        imageAlt: 'Mayotte — lagon de Mayotte',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'DZA',
            name: 'Aéroport de Dzaoudzi-Pamandzi',
            city: 'Dzaoudzi',
          },
        ],
        note: 'Département français de l’océan Indien, utile si le périmètre DOM-TOM est inclus.',
      },
      {
        name: 'Sainte-Hélène, Ascension et Tristan da Cunha',
        iso2: 'SH',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/sh.png',
        flagImageAlt: 'Drapeau de Sainte-Hélène, Ascension et Tristan da Cunha',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Saint%20Helena%20island%20cliffs',
        imageAlt: 'Sainte-Hélène — falaises et paysages insulaires',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'HLE',
            name: 'Aéroport de Sainte-Hélène',
            city: 'Jamestown',
          },
        ],
        note: 'Territoire britannique isolé; à traiter comme cas spécifique.',
      },
    ],
    antilles: [
      {
        name: 'Anguilla',
        iso2: 'AI',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/ai.png',
        flagImageAlt: 'Drapeau de Anguilla',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Shoal%20Bay%20Anguilla',
        imageAlt: 'Anguilla — Shoal Bay',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'AXA',
            name: 'Aéroport international Clayton J. Lloyd',
            city: 'The Valley',
          },
        ],
        note: 'Territoire britannique d’outre-mer.',
      },
      {
        name: 'Antigua-et-Barbuda',
        iso2: 'AG',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ag.png',
        flagImageAlt: 'Drapeau de Antigua-et-Barbuda',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?English%20Harbour%20Antigua%20Barbuda',
        imageAlt: 'Antigua-et-Barbuda — English Harbour',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'ANU',
            name: 'Aéroport international V. C. Bird',
            city: "St. John's",
          },
        ],
      },
      {
        name: 'Aruba',
        iso2: 'AW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/aw.png',
        flagImageAlt: 'Drapeau de Aruba',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Eagle%20Beach%20Aruba',
        imageAlt: 'Aruba — Eagle Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'AUA',
            name: 'Aéroport international Reine-Beatrix',
            city: 'Oranjestad',
          },
        ],
      },
      {
        name: 'Bahamas',
        iso2: 'BS',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bs.png',
        flagImageAlt: 'Drapeau de Bahamas',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Exuma%20Bahamas',
        imageAlt: 'Bahamas — Exuma',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'NAS',
            name: 'Aéroport international Lynden Pindling',
            city: 'Nassau',
          },
          {
            iata: 'FPO',
            name: 'Aéroport international de Grand Bahama',
            city: 'Freeport',
          },
        ],
        note: 'Archipel caribéen souvent inclus dans les bases “Caraïbes”, même s’il n’est pas toujours classé dans les Antilles strictes.',
      },
      {
        name: 'Barbade',
        iso2: 'BB',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/bb.png',
        flagImageAlt: 'Drapeau de Barbade',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Bathsheba%20Barbados',
        imageAlt: 'Barbade — Bathsheba',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'BGI',
            name: 'Aéroport international Grantley-Adams',
            city: 'Bridgetown',
          },
        ],
      },
      {
        name: 'Bonaire',
        iso2: 'BQ',
        status: 'special_municipality',
        flagImageUrl: 'https://flagcdn.com/w320/bq.png',
        flagImageAlt: 'Drapeau de Bonaire',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Bonaire%20salt%20flats%20beach',
        imageAlt: 'Bonaire — salines et eaux turquoise',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'BON',
            name: 'Aéroport international Flamingo',
            city: 'Kralendijk',
          },
        ],
        note: 'Commune spéciale des Pays-Bas caribéens.',
      },
      {
        name: 'Îles Vierges britanniques',
        iso2: 'VG',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/vg.png',
        flagImageAlt: 'Drapeau de Îles Vierges britanniques',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?The%20Baths%20Virgin%20Gorda%20British%20Virgin%20Islands',
        imageAlt: 'Îles Vierges britanniques — The Baths à Virgin Gorda',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'EIS',
            name: 'Aéroport international Terrance B. Lettsome',
            city: 'Tortola',
          },
        ],
        note: 'Territoire britannique d’outre-mer.',
      },
      {
        name: 'Îles Caïmans',
        iso2: 'KY',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/ky.png',
        flagImageAlt: 'Drapeau de Îles Caïmans',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Seven%20Mile%20Beach%20Cayman%20Islands',
        imageAlt: 'Îles Caïmans — Seven Mile Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'GCM',
            name: 'Aéroport international Owen Roberts',
            city: 'Grand Cayman',
          },
        ],
      },
      {
        name: 'Cuba',
        iso2: 'CU',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cu.png',
        flagImageAlt: 'Drapeau de Cuba',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Havana%20Cuba%20colorful%20street',
        imageAlt: 'Cuba — La Havane',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'HAV',
            name: 'Aéroport international José-Martí',
            city: 'La Havane',
          },
          {
            iata: 'VRA',
            name: 'Aéroport Juan Gualberto Gómez',
            city: 'Varadero',
          },
          {
            iata: 'HOG',
            name: 'Aéroport Frank País',
            city: 'Holguín',
          },
          {
            iata: 'SCU',
            name: 'Aéroport Antonio Maceo',
            city: 'Santiago de Cuba',
          },
        ],
      },
      {
        name: 'Curaçao',
        iso2: 'CW',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/cw.png',
        flagImageAlt: 'Drapeau de Curaçao',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Willemstad%20Curacao',
        imageAlt: 'Curaçao — Willemstad',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'CUR',
            name: 'Aéroport international de Curaçao',
            city: 'Willemstad',
          },
        ],
      },
      {
        name: 'Dominique',
        iso2: 'DM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/dm.png',
        flagImageAlt: 'Drapeau de Dominique',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Trafalgar%20Falls%20Dominica',
        imageAlt: 'Dominique — chutes de Trafalgar',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'DOM',
            name: 'Aéroport Douglas-Charles',
            city: 'Marigot',
          },
        ],
      },
      {
        name: 'République dominicaine',
        iso2: 'DO',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/do.png',
        flagImageAlt: 'Drapeau de République dominicaine',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Punta%20Cana%20Dominican%20Republic',
        imageAlt: 'République dominicaine — Punta Cana',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'PUJ',
            name: 'Aéroport international de Punta Cana',
            city: 'Punta Cana',
          },
          {
            iata: 'SDQ',
            name: 'Aéroport international Las Américas',
            city: 'Saint-Domingue',
          },
          {
            iata: 'POP',
            name: 'Aéroport international Gregorio Luperón',
            city: 'Puerto Plata',
          },
          {
            iata: 'STI',
            name: 'Aéroport international du Cibao',
            city: 'Santiago de los Caballeros',
          },
        ],
      },
      {
        name: 'Grenade',
        iso2: 'GD',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/gd.png',
        flagImageAlt: 'Drapeau de Grenade',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Grand%20Anse%20Grenada',
        imageAlt: 'Grenade — Grand Anse Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'GND',
            name: 'Aéroport international Maurice Bishop',
            city: "St. George's",
          },
        ],
      },
      {
        name: 'Guadeloupe',
        iso2: 'GP',
        status: 'overseas_region',
        flagImageUrl: 'https://flagcdn.com/w320/gp.png',
        flagImageAlt: 'Drapeau de Guadeloupe',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Deshaies%20Grande%20Anse%20Guadeloupe%20beach',
        imageAlt: 'Guadeloupe — plage de Deshaies',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'PTP',
            name: 'Aéroport Guadeloupe-Pôle Caraïbes',
            city: 'Pointe-à-Pitre',
          },
          {
            iata: 'SFG',
            name: 'Aéroport de Saint-François',
            city: 'Saint-François',
          },
          {
            iata: 'GBJ',
            name: 'Aérodrome de Marie-Galante',
            city: 'Grand-Bourg',
          },
        ],
        note: 'Département/région d’outre-mer français.',
      },
      {
        name: 'Haïti',
        iso2: 'HT',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/ht.png',
        flagImageAlt: 'Drapeau de Haïti',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Citadelle%20Laferriere%20Haiti',
        imageAlt: 'Haïti — Citadelle Laferrière',
        europeAccess: 'limited_or_check_required',
        airports: [
          {
            iata: 'PAP',
            name: 'Aéroport international Toussaint-Louverture',
            city: 'Port-au-Prince',
          },
          {
            iata: 'CAP',
            name: 'Aéroport international de Cap-Haïtien',
            city: 'Cap-Haïtien',
          },
        ],
        note: 'Sécurité aérienne à vérifier fortement; Port-au-Prince a connu des restrictions importantes.',
      },
      {
        name: 'Jamaïque',
        iso2: 'JM',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/jm.png',
        flagImageAlt: 'Drapeau de Jamaïque',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Dunns%20River%20Falls%20Jamaica',
        imageAlt: 'Jamaïque — Dunn’s River Falls',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'MBJ',
            name: 'Aéroport international Sangster',
            city: 'Montego Bay',
          },
          {
            iata: 'KIN',
            name: 'Aéroport international Norman Manley',
            city: 'Kingston',
          },
        ],
      },
      {
        name: 'Martinique',
        iso2: 'MQ',
        status: 'overseas_region',
        flagImageUrl: 'https://flagcdn.com/w320/mq.png',
        flagImageAlt: 'Drapeau de Martinique',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Les%20Salines%20Martinique%20beach',
        imageAlt: 'Martinique — plage des Salines',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'FDF',
            name: 'Aéroport international Martinique Aimé Césaire',
            city: 'Fort-de-France',
          },
        ],
        note: 'Département/région d’outre-mer français.',
      },
      {
        name: 'Montserrat',
        iso2: 'MS',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/ms.png',
        flagImageAlt: 'Drapeau de Montserrat',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Soufriere%20Hills%20volcano%20Montserrat',
        imageAlt: 'Montserrat — volcan Soufrière Hills',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'MNI',
            name: 'Aéroport John A. Osborne',
            city: 'Montserrat',
          },
        ],
        note: 'Territoire britannique d’outre-mer.',
      },
      {
        name: 'Porto Rico',
        iso2: 'PR',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/pr.png',
        flagImageAlt: 'Drapeau de Porto Rico',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Old%20San%20Juan%20Puerto%20Rico',
        imageAlt: 'Porto Rico — Vieux San Juan',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SJU',
            name: 'Aéroport international Luis-Muñoz-Marín',
            city: 'San Juan',
          },
          {
            iata: 'BQN',
            name: 'Aéroport Rafael Hernández',
            city: 'Aguadilla',
          },
          {
            iata: 'PSE',
            name: 'Aéroport Mercedita',
            city: 'Ponce',
          },
        ],
        note: 'Territoire non incorporé des États-Unis.',
      },
      {
        name: 'Saba',
        iso2: 'BQ',
        status: 'special_municipality',
        flagImageUrl: 'https://flagcdn.com/w320/bq.png',
        flagImageAlt: 'Drapeau de Saba',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Saba%20island%20Caribbean',
        imageAlt: 'Saba — relief volcanique',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'SAB',
            name: 'Aéroport Juancho E. Yrausquin',
            city: 'Saba',
          },
        ],
        note: 'Commune spéciale des Pays-Bas caribéens.',
      },
      {
        name: 'Saint-Barthélemy',
        iso2: 'BL',
        status: 'overseas_collectivity',
        flagImageUrl: 'https://flagcdn.com/w320/bl.png',
        flagImageAlt: 'Drapeau de Saint-Barthélemy',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Saint%20Jean%20Beach%20St%20Barts',
        imageAlt: 'Saint-Barthélemy — plage de Saint-Jean',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'SBH',
            name: 'Aéroport Gustaf III',
            city: 'Saint-Barthélemy',
          },
        ],
        note: 'Collectivité d’outre-mer française.',
      },
      {
        name: 'Saint-Christophe-et-Niévès',
        iso2: 'KN',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/kn.png',
        flagImageAlt: 'Drapeau de Saint-Christophe-et-Niévès',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Brimstone%20Hill%20St%20Kitts%20Nevis',
        imageAlt: 'Saint-Christophe-et-Niévès — Brimstone Hill',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SKB',
            name: 'Aéroport international Robert L. Bradshaw',
            city: 'Basseterre',
          },
          {
            iata: 'NEV',
            name: 'Aéroport international Vance W. Amory',
            city: 'Nevis',
          },
        ],
      },
      {
        name: 'Sainte-Lucie',
        iso2: 'LC',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/lc.png',
        flagImageAlt: 'Drapeau de Sainte-Lucie',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Pitons%20Saint%20Lucia',
        imageAlt: 'Sainte-Lucie — les Pitons',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'UVF',
            name: 'Aéroport international Hewanorra',
            city: 'Vieux Fort',
          },
          {
            iata: 'SLU',
            name: 'Aéroport George F. L. Charles',
            city: 'Castries',
          },
        ],
      },
      {
        name: 'Saint-Martin',
        iso2: 'MF',
        status: 'overseas_collectivity',
        flagImageUrl: 'https://flagcdn.com/w320/mf.png',
        flagImageAlt: 'Drapeau de Saint-Martin',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Orient%20Bay%20Saint%20Martin',
        imageAlt: 'Saint-Martin — Orient Bay',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'SFG',
            name: 'Aéroport de Grand-Case-Espérance',
            city: 'Grand-Case',
          },
        ],
        note: 'Collectivité d’outre-mer française; souvent desservie via Sint Maarten SXM.',
      },
      {
        name: 'Sint Maarten',
        iso2: 'SX',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/sx.png',
        flagImageAlt: 'Drapeau de Sint Maarten',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Maho%20Beach%20Sint%20Maarten%20airplane',
        imageAlt: 'Sint Maarten — Maho Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SXM',
            name: 'Aéroport international Princess Juliana',
            city: 'Simpson Bay',
          },
        ],
        note: 'Pays constitutif du Royaume des Pays-Bas.',
      },
      {
        name: 'Saint-Vincent-et-les-Grenadines',
        iso2: 'VC',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/vc.png',
        flagImageAlt: 'Drapeau de Saint-Vincent-et-les-Grenadines',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Tobago%20Cays%20Saint%20Vincent%20Grenadines',
        imageAlt: 'Saint-Vincent-et-les-Grenadines — Tobago Cays',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'SVD',
            name: 'Aéroport international Argyle',
            city: 'Saint-Vincent',
          },
          {
            iata: 'CIW',
            name: 'Aéroport de Canouan',
            city: 'Canouan',
          },
          {
            iata: 'BQU',
            name: 'Aéroport J. F. Mitchell',
            city: 'Bequia',
          },
          {
            iata: 'UNI',
            name: 'Aéroport d’Union Island',
            city: 'Union Island',
          },
        ],
      },
      {
        name: 'Trinité-et-Tobago',
        iso2: 'TT',
        status: 'country',
        flagImageUrl: 'https://flagcdn.com/w320/tt.png',
        flagImageAlt: 'Drapeau de Trinité-et-Tobago',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Maracas%20Beach%20Trinidad%20Tobago',
        imageAlt: 'Trinité-et-Tobago — Maracas Beach',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'POS',
            name: 'Aéroport international de Piarco',
            city: 'Port of Spain',
          },
          {
            iata: 'TAB',
            name: 'Aéroport international A. N. R. Robinson',
            city: 'Tobago',
          },
        ],
      },
      {
        name: 'Îles Turks-et-Caïcos',
        iso2: 'TC',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/tc.png',
        flagImageAlt: 'Drapeau de Îles Turks-et-Caïcos',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Grace%20Bay%20Turks%20and%20Caicos',
        imageAlt: 'Îles Turks-et-Caïcos — Grace Bay',
        europeAccess: 'direct_or_connection',
        airports: [
          {
            iata: 'PLS',
            name: 'Aéroport international de Providenciales',
            city: 'Providenciales',
          },
          {
            iata: 'GDT',
            name: 'Aéroport JAGS McCartney',
            city: 'Grand Turk',
          },
        ],
        note: 'Archipel caribéen souvent inclus dans les bases “Caraïbes”, même s’il n’est pas toujours classé dans les Antilles strictes.',
      },
      {
        name: 'Îles Vierges américaines',
        iso2: 'VI',
        status: 'territory',
        flagImageUrl: 'https://flagcdn.com/w320/vi.png',
        flagImageAlt: 'Drapeau de Îles Vierges américaines',
        imageUrl:
          'https://source.unsplash.com/featured/1600x900/?Magens%20Bay%20US%20Virgin%20Islands',
        imageAlt: 'Îles Vierges américaines — Magens Bay',
        europeAccess: 'connection_usually_required',
        airports: [
          {
            iata: 'STT',
            name: 'Aéroport Cyril E. King',
            city: 'Saint Thomas',
          },
          {
            iata: 'STX',
            name: 'Aéroport Henry E. Rohlsen',
            city: 'Sainte-Croix',
          },
        ],
        note: 'Territoire non incorporé des États-Unis.',
      },
    ],
  },
} satisfies FlightDestinationCatalog;

export default flightDestinationCatalog;
