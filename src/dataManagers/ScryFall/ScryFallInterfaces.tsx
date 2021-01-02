/*Further Information can be found from the link below about the API*/
//https://scryfall.com/docs/api/cards

////////////////////////
/*Main Interfaces*/
////////////////////////

export interface ScryFallInformation {

  name:         string
  mana_cost:    string
  type_line :   string
  oracle_text:  string
  set_name:     string //Full set name
  set:          string //Set Code
  collector_number: string
  image_uris:   ScryFallImages
  legalities:   ScryFallLegality
  reserved:     boolean
  foil:         boolean
  nonfoil:      boolean
  promo:        boolean
  reprint:      boolean
  rarity:       string
  frame:        string
  artist:       string
  prices :      ScryFallPrices
  released_at:  string
  rulings_uri:  string
  prints_search_uri: string
  uri:          string
  digital:      boolean
  tcgplayer_id: number
}

////////////////////////
/*Supporting Interfaces*/
////////////////////////

export interface ScryFallImages {
  small:        string;
  normal:       string;
  large:        string;
  png:          string;
  art_crop:     string;
  border_crop:  string
}

export interface ScryFallLegality {
  standard:   string
  future:     string
  historic:   string
  pioneer:    string
  modern:     string
  legacy:     string
  pauper:     string
  vintage:    string
  penny:      string
  commander:  string
  brawl:      string
  duel:       string
  oldschool:  string
}

export interface ScryFallPrices {
  usd:      string
  usd_foil: string
  tix:      string
}

export interface ScryFallRulings {
  object:       string
  oracle_id:    string
  source:       string
  published_at: string
  comment:      string
}

////////////////////////
/*Default Interface Values*/
////////////////////////

export var blankScryFallInformation : ScryFallInformation = {
  name:         "Error",
  mana_cost:    "{0}",
  type_line :   "Error",
  oracle_text:  "Error",
  set_name:     "Error",
  set:          "ERR",
  collector_number: "0",
  image_uris: {
    small:        "Error",
    normal:       "Error",
    large:        "Error",
    png:          "Error",
    art_crop:     "Error",
    border_crop:  "Error"
  },
  legalities:   {
    standard:   "Error",
    future:     "Error",
    historic:   "Error",
    pioneer:    "Error",
    modern:     "Error",
    legacy:     "Error",
    pauper:     "Error",
    vintage:    "Error",
    penny:      "Error",
    commander:  "Error",
    brawl:      "Error",
    duel:       "Error",
    oldschool:  "Error"
  },
  reserved:     false,
  foil:         false,
  nonfoil:      false,
  promo:        false,
  reprint:      false,
  rarity:       "Error",
  frame:        "Error",
  artist:       "Error",
  prices : {
    usd:        "Error",
    usd_foil:   "Error",
    tix:        "Error"
  },
  released_at:  "Error",
  rulings_uri:  "Error",
  prints_search_uri: "Error",
  uri:          "Error",
  digital:      false,
  tcgplayer_id: -1
};