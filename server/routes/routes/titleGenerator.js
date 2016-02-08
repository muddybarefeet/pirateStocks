

var titleGen = {};

var adjectives = [
  'Blue',
  'Belly',
  'Barnicle',
  'Salty',
  'Sloshed',
  'Eye-patched',
  'Mangy',
  'Red',
  'Bilge-Drinking',
  'Wooden-Legged',
  'Deck-swabbing',
  'Black-Spotted',
  'Barrel-Faced',
  'Stumpy',
  'Icky',
  'Scurvy-Infested',
  'Washed-Out',
  'Fearless',
  'Weather-Beaten',
  'Marooned',
  'Rum-Soaked',
  'Landlubber',
  'Swaggering',
  'Scalawag',
  'Lawless',
  'Fearsome',
  'Ruthless'
];

var nouns = [
  'Cannon',
  'Missen',
  'Yardarms',
  'Plank',
  'Treasure',
  'Gold',
  'Rum',
  'Barrel',
  'Pistol',
  'Cutlass',
  'Map',
  'Beard',
  'Jolly Roger',
  'Gunpower',
  'Powder monkey',
  'Bob',
  'Bootey',
  'Galleon',
  'Gangplank',
  'Curse',
  'Captain',
  'Bosun',
  'Anchor',
  'Doubloon',
  'Skull and Crossbones',
  'Island',
  'Rudder'
];

titleGen.getTitle = function () {
  var randomOne = Math.floor(Math.random() * 26);
  var randomTwo = Math.floor(Math.random() * 26);
  var title = adjectives[randomOne] + " " + nouns[randomTwo];
  return title;

};

module.exports = titleGen;



