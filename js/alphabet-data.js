/**
 * Kids Alphabet & Phonics Data
 * Complete uppercase and lowercase stroke geometry, phonics, vocabulary and animations.
 */
const ALPHABET_DATA = [
  {
    "char": "A",
    "lower": "a",
    "word": "Apple",
    "emoji": "\ud83c\udf4e",
    "phonetic": "ah",
    "soundHint": "/\u00e6/ like apple",
    "color": "#FF4B4B",
    "bgGradient": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
    "altWords": [
      {
        "word": "Ant",
        "emoji": "\ud83d\udc1c"
      },
      {
        "word": "Airplane",
        "emoji": "\u2708\ufe0f"
      },
      {
        "word": "Astronaut",
        "emoji": "\ud83e\uddd1\u200d\ud83d\ude80"
      }
    ],
    "funFact": "Apples float in water because 25% of their volume is air!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            470,
            180
          ],
          [
            200,
            800
          ]
        ],
        "hint": "Slant down left"
      },
      {
        "id": 2,
        "points": [
          [
            530,
            180
          ],
          [
            800,
            800
          ]
        ],
        "hint": "Slant down right"
      },
      {
        "id": 3,
        "points": [
          [
            310,
            520
          ],
          [
            690,
            520
          ]
        ],
        "hint": "Cross the bridge"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            660,
            560
          ],
          [
            530,
            480
          ],
          [
            380,
            560
          ],
          [
            360,
            670
          ],
          [
            450,
            780
          ],
          [
            600,
            780
          ],
          [
            660,
            680
          ]
        ],
        "hint": "Make a round tummy",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            660,
            480
          ],
          [
            660,
            820
          ]
        ],
        "hint": "Pull straight down"
      }
    ]
  },
  {
    "char": "B",
    "lower": "b",
    "word": "Bear",
    "emoji": "\ud83d\udc3b",
    "phonetic": "buh",
    "soundHint": "/b/ like bear",
    "color": "#FF8C00",
    "bgGradient": "linear-gradient(135deg, #FF9F43 0%, #FFA801 100%)",
    "altWords": [
      {
        "word": "Ball",
        "emoji": "\u26bd"
      },
      {
        "word": "Butterfly",
        "emoji": "\ud83e\udd8b"
      },
      {
        "word": "Banana",
        "emoji": "\ud83c\udf4c"
      }
    ],
    "funFact": "Bears have an incredible sense of smell, 7 times better than a bloodhound!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            530,
            180
          ],
          [
            630,
            240
          ],
          [
            630,
            430
          ],
          [
            530,
            490
          ],
          [
            280,
            490
          ]
        ],
        "hint": "Top bump",
        "isCurve": true
      },
      {
        "id": 3,
        "points": [
          [
            340,
            490
          ],
          [
            560,
            490
          ],
          [
            670,
            550
          ],
          [
            670,
            750
          ],
          [
            560,
            800
          ],
          [
            280,
            800
          ]
        ],
        "hint": "Bottom bump",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            820
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            280,
            570
          ],
          [
            380,
            480
          ],
          [
            560,
            480
          ],
          [
            670,
            590
          ],
          [
            670,
            720
          ],
          [
            560,
            820
          ],
          [
            380,
            820
          ],
          [
            280,
            750
          ]
        ],
        "hint": "Round circle to the right",
        "isCurve": true
      }
    ]
  },
  {
    "char": "C",
    "lower": "c",
    "word": "Cat",
    "emoji": "\ud83d\udc31",
    "phonetic": "kuh",
    "soundHint": "/k/ like cat",
    "color": "#10AC84",
    "bgGradient": "linear-gradient(135deg, #10AC84 0%, #1DD1A1 100%)",
    "altWords": [
      {
        "word": "Car",
        "emoji": "\ud83d\ude97"
      },
      {
        "word": "Cake",
        "emoji": "\ud83c\udf82"
      },
      {
        "word": "Cow",
        "emoji": "\ud83d\udc2e"
      }
    ],
    "funFact": "Cats can jump up to 6 times their height in a single bound!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            750,
            300
          ],
          [
            630,
            180
          ],
          [
            450,
            180
          ],
          [
            280,
            310
          ],
          [
            240,
            500
          ],
          [
            280,
            690
          ],
          [
            450,
            820
          ],
          [
            650,
            820
          ],
          [
            750,
            710
          ]
        ],
        "hint": "Big open curve",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            700,
            570
          ],
          [
            600,
            480
          ],
          [
            440,
            480
          ],
          [
            330,
            590
          ],
          [
            330,
            720
          ],
          [
            440,
            820
          ],
          [
            600,
            820
          ],
          [
            700,
            740
          ]
        ],
        "hint": "Little open curve",
        "isCurve": true
      }
    ]
  },
  {
    "char": "D",
    "lower": "d",
    "word": "Dog",
    "emoji": "\ud83d\udc36",
    "phonetic": "duh",
    "soundHint": "/d/ like dog",
    "color": "#0ABDE3",
    "bgGradient": "linear-gradient(135deg, #0ABDE3 0%, #48DBFB 100%)",
    "altWords": [
      {
        "word": "Duck",
        "emoji": "\ud83e\udd86"
      },
      {
        "word": "Dolphin",
        "emoji": "\ud83d\udc2c"
      },
      {
        "word": "Drum",
        "emoji": "\ud83e\udd41"
      }
    ],
    "funFact": "A dog's nose print is unique, just like human fingerprints!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            550,
            180
          ],
          [
            730,
            330
          ],
          [
            730,
            650
          ],
          [
            550,
            800
          ],
          [
            280,
            800
          ]
        ],
        "hint": "One giant tummy",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            680,
            580
          ],
          [
            570,
            480
          ],
          [
            390,
            480
          ],
          [
            290,
            590
          ],
          [
            290,
            720
          ],
          [
            390,
            820
          ],
          [
            580,
            820
          ],
          [
            680,
            720
          ]
        ],
        "hint": "Round circle first",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            680,
            180
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Tall line down on the right"
      }
    ]
  },
  {
    "char": "E",
    "lower": "e",
    "word": "Elephant",
    "emoji": "\ud83d\udc18",
    "phonetic": "eh",
    "soundHint": "/\u025b/ like elephant",
    "color": "#5F27CD",
    "bgGradient": "linear-gradient(135deg, #5F27CD 0%, #341F97 100%)",
    "altWords": [
      {
        "word": "Egg",
        "emoji": "\ud83e\udd5a"
      },
      {
        "word": "Eagle",
        "emoji": "\ud83e\udd85"
      },
      {
        "word": "Earth",
        "emoji": "\ud83c\udf0d"
      }
    ],
    "funFact": "Elephants communicate with low rumbles that can travel through the ground for miles!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            730,
            180
          ]
        ],
        "hint": "Top shelf"
      },
      {
        "id": 3,
        "points": [
          [
            300,
            490
          ],
          [
            650,
            490
          ]
        ],
        "hint": "Middle shelf"
      },
      {
        "id": 4,
        "points": [
          [
            300,
            800
          ],
          [
            730,
            800
          ]
        ],
        "hint": "Bottom shelf"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            310,
            650
          ],
          [
            690,
            650
          ]
        ],
        "hint": "Across the middle"
      },
      {
        "id": 2,
        "points": [
          [
            690,
            650
          ],
          [
            670,
            540
          ],
          [
            560,
            480
          ],
          [
            420,
            480
          ],
          [
            310,
            590
          ],
          [
            310,
            730
          ],
          [
            430,
            820
          ],
          [
            610,
            820
          ],
          [
            700,
            740
          ]
        ],
        "hint": "Up and around like a roller coaster",
        "isCurve": true
      }
    ]
  },
  {
    "char": "F",
    "lower": "f",
    "word": "Fish",
    "emoji": "\ud83d\udc1f",
    "phonetic": "ff",
    "soundHint": "/f/ like fish",
    "color": "#FF6B81",
    "bgGradient": "linear-gradient(135deg, #FF6B81 0%, #FF4757 100%)",
    "altWords": [
      {
        "word": "Frog",
        "emoji": "\ud83d\udc38"
      },
      {
        "word": "Flower",
        "emoji": "\ud83c\udf38"
      },
      {
        "word": "Fox",
        "emoji": "\ud83e\udd8a"
      }
    ],
    "funFact": "Fish sleep with their eyes open because they don't have eyelids!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            730,
            180
          ]
        ],
        "hint": "Top shelf"
      },
      {
        "id": 3,
        "points": [
          [
            300,
            490
          ],
          [
            640,
            490
          ]
        ],
        "hint": "Middle shelf"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            660,
            240
          ],
          [
            550,
            180
          ],
          [
            440,
            230
          ],
          [
            440,
            820
          ]
        ],
        "hint": "Curve like a candy cane down",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            300,
            500
          ],
          [
            580,
            500
          ]
        ],
        "hint": "Cross the waist"
      }
    ]
  },
  {
    "char": "G",
    "lower": "g",
    "word": "Giraffe",
    "emoji": "\ud83e\udd92",
    "phonetic": "guh",
    "soundHint": "/\u0261/ like giraffe or grape",
    "color": "#FFA502",
    "bgGradient": "linear-gradient(135deg, #FFA502 0%, #E67E22 100%)",
    "altWords": [
      {
        "word": "Grapes",
        "emoji": "\ud83c\udf47"
      },
      {
        "word": "Guitar",
        "emoji": "\ud83c\udfb8"
      },
      {
        "word": "Goat",
        "emoji": "\ud83d\udc10"
      }
    ],
    "funFact": "A giraffe's tongue is blue-black and can be up to 20 inches long!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            750,
            300
          ],
          [
            630,
            180
          ],
          [
            450,
            180
          ],
          [
            280,
            310
          ],
          [
            240,
            500
          ],
          [
            280,
            690
          ],
          [
            450,
            820
          ],
          [
            680,
            820
          ],
          [
            720,
            710
          ],
          [
            720,
            520
          ]
        ],
        "hint": "Round like a C then up",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            540,
            520
          ],
          [
            720,
            520
          ]
        ],
        "hint": "Step inside"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            680,
            580
          ],
          [
            570,
            480
          ],
          [
            390,
            480
          ],
          [
            290,
            590
          ],
          [
            290,
            720
          ],
          [
            390,
            820
          ],
          [
            580,
            820
          ],
          [
            680,
            720
          ]
        ],
        "hint": "Circle tummy",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            680,
            860
          ],
          [
            570,
            960
          ],
          [
            380,
            950
          ]
        ],
        "hint": "Tail diving into the grass and hook left",
        "isCurve": true
      }
    ]
  },
  {
    "char": "H",
    "lower": "h",
    "word": "House",
    "emoji": "\ud83c\udfe0",
    "phonetic": "huh",
    "soundHint": "/h/ like house",
    "color": "#2ED573",
    "bgGradient": "linear-gradient(135deg, #2ED573 0%, #10AC84 100%)",
    "altWords": [
      {
        "word": "Hat",
        "emoji": "\ud83c\udfa9"
      },
      {
        "word": "Horse",
        "emoji": "\ud83d\udc34"
      },
      {
        "word": "Heart",
        "emoji": "\u2764\ufe0f"
      }
    ],
    "funFact": "Horses can sleep both lying down and standing up!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            820
          ]
        ],
        "hint": "Left pole down"
      },
      {
        "id": 2,
        "points": [
          [
            720,
            180
          ],
          [
            720,
            820
          ]
        ],
        "hint": "Right pole down"
      },
      {
        "id": 3,
        "points": [
          [
            280,
            500
          ],
          [
            720,
            500
          ]
        ],
        "hint": "Bridge across"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            820
          ]
        ],
        "hint": "Tall pole down"
      },
      {
        "id": 2,
        "points": [
          [
            280,
            600
          ],
          [
            400,
            480
          ],
          [
            580,
            480
          ],
          [
            680,
            580
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Hop over and down",
        "isCurve": true
      }
    ]
  },
  {
    "char": "I",
    "lower": "i",
    "word": "Ice cream",
    "emoji": "\ud83c\udf66",
    "phonetic": "ih",
    "soundHint": "/\u026a/ or /a\u026a/ like ice cream",
    "color": "#1E90FF",
    "bgGradient": "linear-gradient(135deg, #1E90FF 0%, #70A1FF 100%)",
    "altWords": [
      {
        "word": "Iguana",
        "emoji": "\ud83e\udd8e"
      },
      {
        "word": "Igloo",
        "emoji": "\ud83d\uded6"
      },
      {
        "word": "Island",
        "emoji": "\ud83c\udfdd\ufe0f"
      }
    ],
    "funFact": "Vanilla is the most popular ice cream flavor in the world!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            180
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Straight down center"
      },
      {
        "id": 2,
        "points": [
          [
            320,
            180
          ],
          [
            680,
            180
          ]
        ],
        "hint": "Top roof hat"
      },
      {
        "id": 3,
        "points": [
          [
            320,
            820
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Bottom floor stand"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            480
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Short line down"
      },
      {
        "id": 2,
        "points": [
          [
            500,
            270
          ],
          [
            500,
            290
          ]
        ],
        "hint": "Dot on the top"
      }
    ]
  },
  {
    "char": "J",
    "lower": "j",
    "word": "Jellyfish",
    "emoji": "\ud83e\udebc",
    "phonetic": "juh",
    "soundHint": "/d\u0292/ like jellyfish",
    "color": "#9B59B6",
    "bgGradient": "linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)",
    "altWords": [
      {
        "word": "Jam",
        "emoji": "\ud83c\udf53"
      },
      {
        "word": "Juice",
        "emoji": "\ud83e\uddc3"
      },
      {
        "word": "Jacket",
        "emoji": "\ud83e\udde5"
      }
    ],
    "funFact": "Jellyfish have been swimming in oceans for over 500 million years!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            180
          ],
          [
            720,
            180
          ]
        ],
        "hint": "Top hat"
      },
      {
        "id": 2,
        "points": [
          [
            580,
            180
          ],
          [
            580,
            680
          ],
          [
            520,
            820
          ],
          [
            360,
            780
          ]
        ],
        "hint": "Hook down and swing left",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            560,
            480
          ],
          [
            560,
            860
          ],
          [
            480,
            960
          ],
          [
            320,
            920
          ]
        ],
        "hint": "Dive down hook into the pond",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            560,
            270
          ],
          [
            560,
            290
          ]
        ],
        "hint": "Dot on the head"
      }
    ]
  },
  {
    "char": "K",
    "lower": "k",
    "word": "Kangaroo",
    "emoji": "\ud83e\udd98",
    "phonetic": "kuh",
    "soundHint": "/k/ like kangaroo",
    "color": "#E67E22",
    "bgGradient": "linear-gradient(135deg, #E67E22 0%, #D35400 100%)",
    "altWords": [
      {
        "word": "Kite",
        "emoji": "\ud83e\ude81"
      },
      {
        "word": "Koala",
        "emoji": "\ud83d\udc28"
      },
      {
        "word": "Key",
        "emoji": "\ud83d\udd11"
      }
    ],
    "funFact": "Kangaroos cannot walk backwards!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            820
          ]
        ],
        "hint": "Tall pole down"
      },
      {
        "id": 2,
        "points": [
          [
            720,
            200
          ],
          [
            320,
            520
          ]
        ],
        "hint": "Kick in from top"
      },
      {
        "id": 3,
        "points": [
          [
            420,
            460
          ],
          [
            740,
            820
          ]
        ],
        "hint": "Kick out to bottom"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            820
          ]
        ],
        "hint": "Tall pole down"
      },
      {
        "id": 2,
        "points": [
          [
            660,
            500
          ],
          [
            320,
            660
          ]
        ],
        "hint": "Short kick in"
      },
      {
        "id": 3,
        "points": [
          [
            400,
            620
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Short kick out"
      }
    ]
  },
  {
    "char": "L",
    "lower": "l",
    "word": "Lion",
    "emoji": "\ud83e\udd81",
    "phonetic": "ull",
    "soundHint": "/l/ like lion",
    "color": "#F1C40F",
    "bgGradient": "linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)",
    "altWords": [
      {
        "word": "Leaf",
        "emoji": "\ud83c\udf43"
      },
      {
        "word": "Lemon",
        "emoji": "\ud83c\udf4b"
      },
      {
        "word": "Ladybug",
        "emoji": "\ud83d\udc1e"
      }
    ],
    "funFact": "A lion's roar can be heard from 5 miles away!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            300,
            180
          ],
          [
            300,
            820
          ]
        ],
        "hint": "Tall pole down"
      },
      {
        "id": 2,
        "points": [
          [
            300,
            820
          ],
          [
            720,
            820
          ]
        ],
        "hint": "Slide across the floor"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            180
          ],
          [
            500,
            820
          ]
        ],
        "hint": "One tall straight stick"
      }
    ]
  },
  {
    "char": "M",
    "lower": "m",
    "word": "Monkey",
    "emoji": "\ud83d\udc35",
    "phonetic": "mmm",
    "soundHint": "/m/ like monkey",
    "color": "#8D6E63",
    "bgGradient": "linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)",
    "altWords": [
      {
        "word": "Moon",
        "emoji": "\ud83c\udf19"
      },
      {
        "word": "Mango",
        "emoji": "\ud83e\udd6d"
      },
      {
        "word": "Mouse",
        "emoji": "\ud83d\udc2d"
      }
    ],
    "funFact": "Monkeys express affection and peace by grooming each other!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            220,
            820
          ],
          [
            220,
            180
          ]
        ],
        "hint": "Climb up left mountain"
      },
      {
        "id": 2,
        "points": [
          [
            220,
            180
          ],
          [
            500,
            620
          ]
        ],
        "hint": "Slide into the valley"
      },
      {
        "id": 3,
        "points": [
          [
            500,
            620
          ],
          [
            780,
            180
          ]
        ],
        "hint": "Climb up right peak"
      },
      {
        "id": 4,
        "points": [
          [
            780,
            180
          ],
          [
            780,
            820
          ]
        ],
        "hint": "Slide down to base"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            220,
            480
          ],
          [
            220,
            820
          ]
        ],
        "hint": "Down straight"
      },
      {
        "id": 2,
        "points": [
          [
            220,
            600
          ],
          [
            330,
            480
          ],
          [
            460,
            480
          ],
          [
            510,
            580
          ],
          [
            510,
            820
          ]
        ],
        "hint": "First bouncy hill",
        "isCurve": true
      },
      {
        "id": 3,
        "points": [
          [
            510,
            600
          ],
          [
            610,
            480
          ],
          [
            740,
            480
          ],
          [
            780,
            580
          ],
          [
            780,
            820
          ]
        ],
        "hint": "Second bouncy hill",
        "isCurve": true
      }
    ]
  },
  {
    "char": "N",
    "lower": "n",
    "word": "Nest",
    "emoji": "\ud83e\udeba",
    "phonetic": "nnn",
    "soundHint": "/n/ like nest",
    "color": "#26C6DA",
    "bgGradient": "linear-gradient(135deg, #26C6DA 0%, #0097A7 100%)",
    "altWords": [
      {
        "word": "Nut",
        "emoji": "\ud83e\udd5c"
      },
      {
        "word": "Nose",
        "emoji": "\ud83d\udc43"
      },
      {
        "word": "Night",
        "emoji": "\ud83c\udf0c"
      }
    ],
    "funFact": "Some birds weave spiderwebs into their nests to make them soft and strong!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            260,
            820
          ],
          [
            260,
            180
          ]
        ],
        "hint": "Climb straight up"
      },
      {
        "id": 2,
        "points": [
          [
            260,
            180
          ],
          [
            740,
            820
          ]
        ],
        "hint": "Big slide down"
      },
      {
        "id": 3,
        "points": [
          [
            740,
            820
          ],
          [
            740,
            180
          ]
        ],
        "hint": "Rocket straight up"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            300,
            480
          ],
          [
            300,
            820
          ]
        ],
        "hint": "Down straight"
      },
      {
        "id": 2,
        "points": [
          [
            300,
            600
          ],
          [
            440,
            480
          ],
          [
            640,
            480
          ],
          [
            720,
            590
          ],
          [
            720,
            820
          ]
        ],
        "hint": "Hop over the hill",
        "isCurve": true
      }
    ]
  },
  {
    "char": "O",
    "lower": "o",
    "word": "Orange",
    "emoji": "\ud83c\udf4a",
    "phonetic": "aw",
    "soundHint": "/\u0252/ or /o\u028a/ like orange",
    "color": "#FF7043",
    "bgGradient": "linear-gradient(135deg, #FF7043 0%, #F4511E 100%)",
    "altWords": [
      {
        "word": "Owl",
        "emoji": "\ud83e\udd89"
      },
      {
        "word": "Octopus",
        "emoji": "\ud83d\udc19"
      },
      {
        "word": "Ostrich",
        "emoji": "\ud83e\udda4"
      }
    ],
    "funFact": "An octopus has three hearts and blue blood!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            180
          ],
          [
            310,
            240
          ],
          [
            220,
            500
          ],
          [
            310,
            760
          ],
          [
            500,
            820
          ],
          [
            690,
            760
          ],
          [
            780,
            500
          ],
          [
            690,
            240
          ],
          [
            500,
            180
          ]
        ],
        "hint": "Big round circle all the way",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            480
          ],
          [
            360,
            530
          ],
          [
            300,
            650
          ],
          [
            360,
            770
          ],
          [
            500,
            820
          ],
          [
            640,
            770
          ],
          [
            700,
            650
          ],
          [
            640,
            530
          ],
          [
            500,
            480
          ]
        ],
        "hint": "Small round circle all the way",
        "isCurve": true
      }
    ]
  },
  {
    "char": "P",
    "lower": "p",
    "word": "Penguin",
    "emoji": "\ud83d\udc27",
    "phonetic": "puh",
    "soundHint": "/p/ like penguin",
    "color": "#42A5F5",
    "bgGradient": "linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)",
    "altWords": [
      {
        "word": "Panda",
        "emoji": "\ud83d\udc3c"
      },
      {
        "word": "Pizza",
        "emoji": "\ud83c\udf55"
      },
      {
        "word": "Puppy",
        "emoji": "\ud83d\udc36"
      }
    ],
    "funFact": "Penguins can hold their breath underwater for up to 20 minutes!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            550,
            180
          ],
          [
            690,
            240
          ],
          [
            690,
            430
          ],
          [
            550,
            490
          ],
          [
            280,
            490
          ]
        ],
        "hint": "Top round balloon",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            320,
            960
          ]
        ],
        "hint": "Deep dive below the line"
      },
      {
        "id": 2,
        "points": [
          [
            320,
            570
          ],
          [
            420,
            480
          ],
          [
            580,
            480
          ],
          [
            700,
            580
          ],
          [
            700,
            720
          ],
          [
            580,
            820
          ],
          [
            420,
            820
          ],
          [
            320,
            750
          ]
        ],
        "hint": "Circle balloon on the right",
        "isCurve": true
      }
    ]
  },
  {
    "char": "Q",
    "lower": "q",
    "word": "Queen",
    "emoji": "\ud83d\udc51",
    "phonetic": "kwuh",
    "soundHint": "/kw/ like queen",
    "color": "#AB47BC",
    "bgGradient": "linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)",
    "altWords": [
      {
        "word": "Quilt",
        "emoji": "\ud83e\uddf5"
      },
      {
        "word": "Question",
        "emoji": "\u2753"
      },
      {
        "word": "Quail",
        "emoji": "\ud83d\udc26"
      }
    ],
    "funFact": "The letter Q is almost always followed by the letter U in English!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            500,
            180
          ],
          [
            310,
            240
          ],
          [
            220,
            500
          ],
          [
            310,
            760
          ],
          [
            500,
            820
          ],
          [
            690,
            760
          ],
          [
            780,
            500
          ],
          [
            690,
            240
          ],
          [
            500,
            180
          ]
        ],
        "hint": "Big round circle",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            580,
            680
          ],
          [
            780,
            860
          ]
        ],
        "hint": "Little stick tail"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            680,
            580
          ],
          [
            570,
            480
          ],
          [
            390,
            480
          ],
          [
            290,
            590
          ],
          [
            290,
            720
          ],
          [
            390,
            820
          ],
          [
            580,
            820
          ],
          [
            680,
            720
          ]
        ],
        "hint": "Round circle on the left",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            680,
            960
          ],
          [
            760,
            920
          ]
        ],
        "hint": "Deep dive with a back hook",
        "isCurve": true
      }
    ]
  },
  {
    "char": "R",
    "lower": "r",
    "word": "Rainbow",
    "emoji": "\ud83c\udf08",
    "phonetic": "rrr",
    "soundHint": "/r/ like rainbow",
    "color": "#FF5252",
    "bgGradient": "linear-gradient(135deg, #FF5252 0%, #FF793F 100%)",
    "altWords": [
      {
        "word": "Rabbit",
        "emoji": "\ud83d\udc30"
      },
      {
        "word": "Rocket",
        "emoji": "\ud83d\ude80"
      },
      {
        "word": "Robot",
        "emoji": "\ud83e\udd16"
      }
    ],
    "funFact": "A rainbow is actually a full circle of light, but we only see half from the ground!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            270,
            180
          ],
          [
            270,
            800
          ]
        ],
        "hint": "Down straight tall"
      },
      {
        "id": 2,
        "points": [
          [
            340,
            180
          ],
          [
            550,
            180
          ],
          [
            690,
            240
          ],
          [
            690,
            430
          ],
          [
            550,
            490
          ],
          [
            280,
            490
          ]
        ],
        "hint": "Round top tummy",
        "isCurve": true
      },
      {
        "id": 3,
        "points": [
          [
            480,
            490
          ],
          [
            740,
            800
          ]
        ],
        "hint": "Kick leg out to the ground"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            320,
            820
          ]
        ],
        "hint": "Short stick down"
      },
      {
        "id": 2,
        "points": [
          [
            320,
            600
          ],
          [
            420,
            480
          ],
          [
            620,
            480
          ],
          [
            700,
            540
          ]
        ],
        "hint": "Little leaf branch over",
        "isCurve": true
      }
    ]
  },
  {
    "char": "S",
    "lower": "s",
    "word": "Sun",
    "emoji": "\u2600\ufe0f",
    "phonetic": "sss",
    "soundHint": "/s/ like sun",
    "color": "#FFC107",
    "bgGradient": "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
    "altWords": [
      {
        "word": "Star",
        "emoji": "\u2b50"
      },
      {
        "word": "Snake",
        "emoji": "\ud83d\udc0d"
      },
      {
        "word": "Ship",
        "emoji": "\ud83d\udea2"
      }
    ],
    "funFact": "Sunlight takes only 8 minutes and 20 seconds to reach Earth!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            710,
            300
          ],
          [
            580,
            180
          ],
          [
            410,
            180
          ],
          [
            290,
            270
          ],
          [
            310,
            390
          ],
          [
            480,
            480
          ],
          [
            670,
            560
          ],
          [
            710,
            690
          ],
          [
            620,
            820
          ],
          [
            420,
            820
          ],
          [
            280,
            720
          ]
        ],
        "hint": "Slither like a snake",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            660,
            570
          ],
          [
            560,
            480
          ],
          [
            430,
            480
          ],
          [
            340,
            540
          ],
          [
            370,
            620
          ],
          [
            490,
            680
          ],
          [
            640,
            720
          ],
          [
            660,
            780
          ],
          [
            570,
            820
          ],
          [
            420,
            820
          ],
          [
            320,
            750
          ]
        ],
        "hint": "Little baby snake",
        "isCurve": true
      }
    ]
  },
  {
    "char": "T",
    "lower": "t",
    "word": "Tiger",
    "emoji": "\ud83d\udc2f",
    "phonetic": "tuh",
    "soundHint": "/t/ like tiger",
    "color": "#FF7675",
    "bgGradient": "linear-gradient(135deg, #FF7675 0%, #D63031 100%)",
    "altWords": [
      {
        "word": "Tree",
        "emoji": "\ud83c\udf33"
      },
      {
        "word": "Train",
        "emoji": "\ud83d\ude82"
      },
      {
        "word": "Turtle",
        "emoji": "\ud83d\udc22"
      }
    ],
    "funFact": "Every tiger has a completely unique stripe pattern, just like human fingerprints!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            200,
            180
          ],
          [
            800,
            180
          ]
        ],
        "hint": "Long roof top"
      },
      {
        "id": 2,
        "points": [
          [
            500,
            180
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Down straight center"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            480,
            240
          ],
          [
            480,
            760
          ],
          [
            560,
            820
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Tall pole with a bottom curve",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            320,
            480
          ],
          [
            650,
            480
          ]
        ],
        "hint": "Cross the arms"
      }
    ]
  },
  {
    "char": "U",
    "lower": "u",
    "word": "Umbrella",
    "emoji": "\u2602\ufe0f",
    "phonetic": "uh",
    "soundHint": "/\u028c/ like umbrella",
    "color": "#00CEC9",
    "bgGradient": "linear-gradient(135deg, #00CEC9 0%, #0984E3 100%)",
    "altWords": [
      {
        "word": "Unicorn",
        "emoji": "\ud83e\udd84"
      },
      {
        "word": "Underwater",
        "emoji": "\ud83e\udd3f"
      },
      {
        "word": "Up",
        "emoji": "\ud83c\udf88"
      }
    ],
    "funFact": "Umbrellas were invented over 4,000 years ago in ancient Egypt and China!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            280,
            180
          ],
          [
            280,
            660
          ],
          [
            380,
            820
          ],
          [
            620,
            820
          ],
          [
            720,
            660
          ],
          [
            720,
            180
          ]
        ],
        "hint": "Down, scoop around, and back up",
        "isCurve": true
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            320,
            720
          ],
          [
            420,
            820
          ],
          [
            600,
            820
          ],
          [
            680,
            720
          ]
        ],
        "hint": "Down and smile up",
        "isCurve": true
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Straight line down"
      }
    ]
  },
  {
    "char": "V",
    "lower": "v",
    "word": "Violin",
    "emoji": "\ud83c\udfbb",
    "phonetic": "vvv",
    "soundHint": "/v/ like violin",
    "color": "#6C5CE7",
    "bgGradient": "linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)",
    "altWords": [
      {
        "word": "Van",
        "emoji": "\ud83d\ude90"
      },
      {
        "word": "Volcano",
        "emoji": "\ud83c\udf0b"
      },
      {
        "word": "Vegetables",
        "emoji": "\ud83e\udd55"
      }
    ],
    "funFact": "Playing the violin burns about 170 calories per hour!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            240,
            180
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Slide down to the valley point"
      },
      {
        "id": 2,
        "points": [
          [
            500,
            820
          ],
          [
            760,
            180
          ]
        ],
        "hint": "Zoom up to the sky"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            300,
            480
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Short slide down"
      },
      {
        "id": 2,
        "points": [
          [
            500,
            820
          ],
          [
            700,
            480
          ]
        ],
        "hint": "Short zoom up"
      }
    ]
  },
  {
    "char": "W",
    "lower": "w",
    "word": "Whale",
    "emoji": "\ud83d\udc0b",
    "phonetic": "wuh",
    "soundHint": "/w/ like whale",
    "color": "#0984E3",
    "bgGradient": "linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)",
    "altWords": [
      {
        "word": "Watermelon",
        "emoji": "\ud83c\udf49"
      },
      {
        "word": "Windmill",
        "emoji": "\ud83d\udca8"
      },
      {
        "word": "Watch",
        "emoji": "\u231a"
      }
    ],
    "funFact": "A blue whale is as loud as a jet plane and larger than three school buses!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            180,
            180
          ],
          [
            320,
            820
          ]
        ],
        "hint": "Down slope 1"
      },
      {
        "id": 2,
        "points": [
          [
            320,
            820
          ],
          [
            500,
            420
          ]
        ],
        "hint": "Up to middle peak"
      },
      {
        "id": 3,
        "points": [
          [
            500,
            420
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Down slope 2"
      },
      {
        "id": 4,
        "points": [
          [
            680,
            820
          ],
          [
            820,
            180
          ]
        ],
        "hint": "Up to sky peak"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            240,
            480
          ],
          [
            360,
            820
          ]
        ],
        "hint": "Short slope down"
      },
      {
        "id": 2,
        "points": [
          [
            360,
            820
          ],
          [
            500,
            600
          ]
        ],
        "hint": "Short middle peak"
      },
      {
        "id": 3,
        "points": [
          [
            500,
            600
          ],
          [
            640,
            820
          ]
        ],
        "hint": "Short slope down"
      },
      {
        "id": 4,
        "points": [
          [
            640,
            820
          ],
          [
            760,
            480
          ]
        ],
        "hint": "Short climb up"
      }
    ]
  },
  {
    "char": "X",
    "lower": "x",
    "word": "Xylophone",
    "emoji": "\ud83c\udfb5",
    "phonetic": "ks",
    "soundHint": "/ks/ like xylophone or fox",
    "color": "#E84393",
    "bgGradient": "linear-gradient(135deg, #E84393 0%, #FD79A8 100%)",
    "altWords": [
      {
        "word": "X-ray",
        "emoji": "\ud83e\ude7b"
      },
      {
        "word": "Fox",
        "emoji": "\ud83e\udd8a"
      },
      {
        "word": "Box",
        "emoji": "\ud83d\udce6"
      }
    ],
    "funFact": "The word 'xylophone' comes from Greek words meaning 'wood' and 'sound'!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            260,
            180
          ],
          [
            740,
            820
          ]
        ],
        "hint": "Cross down right"
      },
      {
        "id": 2,
        "points": [
          [
            740,
            180
          ],
          [
            260,
            820
          ]
        ],
        "hint": "Cross down left"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Short cross down right"
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            320,
            820
          ]
        ],
        "hint": "Short cross down left"
      }
    ]
  },
  {
    "char": "Y",
    "lower": "y",
    "word": "Yak",
    "emoji": "\ud83d\udc02",
    "phonetic": "yuh",
    "soundHint": "/j/ like yak or yo-yo",
    "color": "#FD9644",
    "bgGradient": "linear-gradient(135deg, #FD9644 0%, #FA8231 100%)",
    "altWords": [
      {
        "word": "Yo-yo",
        "emoji": "\ud83e\ude80"
      },
      {
        "word": "Yacht",
        "emoji": "\u26f5"
      },
      {
        "word": "Yogurt",
        "emoji": "\ud83e\udd63"
      }
    ],
    "funFact": "Wild yaks live high up in freezing Himalayan mountains and have thick woolly fur!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            260,
            180
          ],
          [
            500,
            500
          ]
        ],
        "hint": "Left arm in"
      },
      {
        "id": 2,
        "points": [
          [
            740,
            180
          ],
          [
            500,
            500
          ]
        ],
        "hint": "Right arm in"
      },
      {
        "id": 3,
        "points": [
          [
            500,
            500
          ],
          [
            500,
            820
          ]
        ],
        "hint": "Stem down to floor"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            500,
            740
          ]
        ],
        "hint": "Short slant down"
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            320,
            960
          ]
        ],
        "hint": "Long slant diving deep"
      }
    ]
  },
  {
    "char": "Z",
    "lower": "z",
    "word": "Zebra",
    "emoji": "🦓",
    "phonetic": "zed",
    "soundHint": "/z/ as in zebra (Zed)",
    "color": "#2C3E50",
    "bgGradient": "linear-gradient(135deg, #2C3E50 0%, #4B6584 100%)",
    "altWords": [
      {
        "word": "Zoo",
        "emoji": "\ud83e\udd81"
      },
      {
        "word": "Zipper",
        "emoji": "\ud83e\udd10"
      },
      {
        "word": "Zero",
        "emoji": "0\ufe0f\u20e3"
      }
    ],
    "funFact": "Zebras run in zig-zags to outsmart predators like lions and hyenas!",
    "upperStrokes": [
      {
        "id": 1,
        "points": [
          [
            260,
            180
          ],
          [
            740,
            180
          ]
        ],
        "hint": "Across the sky"
      },
      {
        "id": 2,
        "points": [
          [
            740,
            180
          ],
          [
            260,
            820
          ]
        ],
        "hint": "Zig-zag down"
      },
      {
        "id": 3,
        "points": [
          [
            260,
            820
          ],
          [
            740,
            820
          ]
        ],
        "hint": "Across the floor"
      }
    ],
    "lowerStrokes": [
      {
        "id": 1,
        "points": [
          [
            320,
            480
          ],
          [
            680,
            480
          ]
        ],
        "hint": "Short across"
      },
      {
        "id": 2,
        "points": [
          [
            680,
            480
          ],
          [
            320,
            820
          ]
        ],
        "hint": "Short zig-zag down"
      },
      {
        "id": 3,
        "points": [
          [
            320,
            820
          ],
          [
            680,
            820
          ]
        ],
        "hint": "Short across"
      }
    ]
  }
];
