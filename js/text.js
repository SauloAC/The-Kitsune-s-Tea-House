// The Kitsune's Tea House — every word the game says.
//
// game.js holds the rules: the numbers, which hotspot hides which flaw, what a
// press costs. This file holds the words, once per language. Every language
// block has exactly the same keys, so adding a language never touches game.js:
// it needs only its code in LANGUAGES (js/i18n.js) and a link in each page's menu.
//
// Languages: en (default), pt, es, fr, ja. The Spanish, French and Japanese are
// translations waiting for review by native speakers.

// A line on screen is narration, the host speaking, or you speaking.
// The speaker's name is looked up per language, so only the key is stored here.
function narrate(text) {
  return { who: null, text };
}

function host(text) {
  return { who: "host", text };
}

function you(text) {
  return { who: "you", text };
}

const TEXT = {
  en: {
    name: "English",

    // Words the interface uses. {n}, {thing}, {line} and so on are filled in by t().
    ui: {
      speakerHost: "Host",
      speakerYou: "You",
      quoteOpen: "“",
      quoteClose: "”",
      examine: "Examine {thing}",
      costMark: "burns 1 mark",
      costLast: "burns the last mark",
      costFreeOne: "free — 1 look left",
      costFreeMany: "free — {n} looks left",
      costSuspicion: "+1 suspicion",
      ask: "Ask: “{line}”",
      letGo: "Let it go: “{line}”",
      press: "Press her: “{line}”",
      answer: "{label}: “{line}”",
      sitBack: "Sit back down",
      doorIn: "Open the door you came in by",
      doorInNote: "still air",
      doorBack: "Open the paper door at the back",
      doorBackNote: "a cold draft",
      signLedger: "Sign the ledger",
      markTitle: "Mark {n} — {title}",
      endingTitle: "Ending {n} of 5 — {title}",
      confirmed: "✓ {name} — confirmed",
      clueItem: "{name} — confirmed",
      cluesNone: "None yet.",
      cluesCount: "Clues confirmed: {n} of 3.",
      candle: "Candle: {n} of 6 marks left",
      playAgain: "Play again"
    },

    // Words the three pages use, outside the game screen
    pages: {
      siteTitle: "The Kitsune's Tea House",
      skip: "Skip to content",
      navMain: "Main",
      navHome: "Home",
      navGame: "Game",
      navHowTo: "How to Play",
      navLanguage: "Language",
      footer: "A short story game in plain HTML, CSS and JavaScript.",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "A short mystery game: prove your host isn't human before the candle burns down.",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "Fog has closed the road, and the only light for miles is a tea house. Your host is gracious, patient, and not quite human. Prove it before the candle burns down — then choose the door that leads home.",
      homeEnter: "Enter the tea house",
      homeHowTo: "How to play",

      gameTitleTag: "Game — The Kitsune's Tea House",
      gameHostImage: "Host illustration",
      gameHostNormal: "The host, seated behind the low table, pouring tea with a faint smile.",
      gameHostSuspicious: "The host, no longer smiling, her eyes fixed on you. On the wall behind her, her shadow has too many tails.",
      gameHostMaskGood: "The host lifting a white porcelain mask away from her face. Beneath it she is smiling, with amber fox eyes and red markings at their corners, a brush wet with ink in her other hand. On the table, a stroke of ink is struck across the open ledger.",
      gameHostMaskBad: "The host kneeling perfectly still, with only darkness where her face should be. Her face lies on the table beside her: a cracked porcelain mask with its eyes closed, next to an old open ledger and a candle that has just gone out.",
      gameSceneRoadEarned: "At dawn, a traveller in a straw hat and cloak, leaning on a walking staff, comes down a dirt road with the tea house behind him. It still glows on the hillside, while the last of the fog settles in the valley below.",
      gameSceneRoadLucky: "Morning light between ancient cedar trees. A narrow path ends in the grass of an empty clearing, beside a line of mossy stones, where the tea house should stand.",
      gameSceneStay: "Seen from the guest's place at the low table: your hands hold a brush over the open ledger, the ink still wet. The teapot has been set down on its tray beside a steaming cup, and through the open paper door the host walks away into the fog.",
      gameSceneMidnight: "The room almost dark, seen from the guest's place: the guest book lies open on the low table, a name freshly written in black ink, the brush resting on the page with no hand holding it. Beside it the host's hands tip the teapot over a steaming cup; her face is out of frame. Two small candles are burning again, and the paper door at the back is shut.",
      gameChoices: "Choices",
      gameClues: "Confirmed clues",
      gameLog: "Log",
      gameLogTitle: "What has happened",
      gameLogClose: "Close",
      gameLogEmpty: "Nothing yet.",

      howToTitleTag: "How to Play — The Kitsune's Tea House",
      howToHeading: "How to Play",
      howToIntro: "It's a foggy night and you've taken shelter in a roadside tea house. Your host is kind. She is also not human. Find the proof before the candle burns down, then choose the door that leads home.",
      howToCandleHeading: "The candle",
      howToCandleText: "The candle has six marks. Examining something burns one. When the last mark burns, it's midnight.",
      howToTalkHeading: "Talking to her",
      howToTalkText: "Once you've noticed something odd, you can bring it up with your host. That's free — she'll explain it away. Then you can let it go, or <strong>press her</strong>. Pressing is how you prove things, but every press makes her more wary of you — read how she's described under the candle. Push too far and she stops pretending.",
      howToCluesHeading: "Clues",
      howToCluesText: "Noticing something strange isn't proof. A clue is <strong>confirmed</strong> only once you've seen it <em>and</em> pressed her about it. Confirmed clues are listed next to the scene with a ✓.",
      howToDoorsHeading: "The doors",
      howToDoorsText: "At the last mark there are two doors. Only one leads back to the road. The more clues you've confirmed, the easier they are to tell apart.",
      howToControlsHeading: "Controls",
      howToControlsTouch: "<strong>Touch or mouse:</strong> tap a choice.",
      howToControlsKeyboard: "<strong>Keyboard:</strong> <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> move between choices; <kbd>Enter</kbd> or <kbd>Space</kbd> picks one.",
      howToEnter: "Enter the tea house"
    },

    // How each candle mark begins (DESIGN.md, "The six marks")
    marks: {
      6: {
        title: "Arrival",
        lines: [
          narrate("Fog swallows the road behind you completely. Ahead, a warm yellow light glows in the paper window of a tea house, a welcome that feels almost staged."),
          host("The fog out there forgives no one until dawn… Come in. The tea is already poured.")
        ]
      },
      5: {
        title: "Settling",
        lines: [narrate("The embers in the hearth glow a faint red. Time seems to slow. She kneels in silence across from you, watching you over the rim of her cup.")]
      },
      4: {
        title: "The rain",
        lines: [
          narrate("Rain hits the walls all at once, sudden and violent, and the world outside disappears. The lamplight falls on the black lacquer tray and lies there like a mirror of water."),
          host("The storm is here. Now it's just us, and this room.")
        ]
      },
      3: {
        title: "She leaves",
        lines: [
          narrate("“I'll fetch more water,” she says, and slides the door shut behind her. You're alone… but the candle flame doesn't move, as if even the air has stopped."),
          narrate("A guest book lies open beside the water jar. You have just enough time to examine two things before she comes back.")
        ]
      },
      2: {
        title: "Her question",
        lines: [
          narrate("She comes back and kneels slowly across from you, her eyes fixed on yours. The steam from the tea rises between you."),
          host("Tell me, traveller… after everything you've seen, do you really know who you're sitting with?")
        ]
      },
      1: {
        title: "The doors",
        lines: [
          narrate("The candle is down to a last sliver of wax, about to go out, throwing long shadows across the paper doors."),
          host("The candle is at its end… If you want to see daylight, your choice has to be made now.")
        ]
      }
    },

    // Lines that depend on what the player has done
    nudge: host("Tea waits for no one… Drink a little. It's still warm."),
    doorsClear: narrate("At the door you came in by, the air is stale and still. Through the paper door at the back, a cold, damp breeze slips in, faintly smelling of pine."),
    doorsUnclear: narrate("Two identical paper doors in the half-dark. The air is still at both, and nothing tells you which way is true."),
    ledgerOffer: narrate("She sets the ledger down near the doors and holds out a brush soaked in fresh ink, waiting in silence."),
    stepsBack: narrate("Soft steps in the corridor outside, bare feet sliding over old wood: your time is up, and she's coming back."),
    sitBackDown: narrate("You smooth your clothes and drop back onto your cushion before she can find you standing."),

    // What you see when you examine something.
    //   whileAway: at mark 3, while she's out of the room
    //   afterRain: from mark 4 on
    hotspots: {
      hearth: {
        label: "the hearth",
        text: "The firelight throws her shadow onto the paper wall. You count the tails twice and get a different number every time.",
        whileAway: "The fire has burned low. On the paper wall, where she was sitting, her shadow is still kneeling. You count the tails, and the number keeps changing. Then it fades."
      },
      tea: {
        label: "the tea service",
        text: "The cup in your hands has a crane painted on it, wings spread. And yet you would have sworn it was a plum branch when she poured your tea."
      },
      window: {
        label: "the window",
        text: "Fog presses against the paper panes, so thick that the lamplight dies a hand's width away. Somewhere out there is the road you came in on.",
        afterRain: "Rain beats on the wooden shutters. The window has gone completely black; you can't see the road outside anymore."
      },
      scroll: {
        label: "the wall scroll",
        text: "A scroll hangs on the wall: a single long brushstroke in the shape of a mountain path, and a poem too worn to read. Only the last line has survived — “the traveller rests; the road waits.”"
      },
      fan: {
        label: "her fan",
        text: "Her fan rests folded on the low table: plain paper, worn at the ribs, painted with a single maple leaf. It smells faintly of cedar smoke."
      },
      tray: {
        label: "the lacquer tray",
        text: "The rain has darkened the window, and the lacquer tray reflects the light like still water. In it you see the room behind you: the hearth, the scrolls, your own shoulder — but no one sitting across from you.",
        whileAway: "The lacquer tray reflects the light like still water. In it you see the room behind you — and the host, kneeling across from you, pouring tea. But the real cushion is empty."
      },
      ledger: {
        label: "the ledger",
        text: "A guest book lies open beside the water jar. Names in hundreds of different hands — in brush, in pencil, even a child's careful letters. Every entry bears the date of this same night. Decades apart."
      }
    },

    // What you can bring up with her (DESIGN.md, "Flaw dialogue")
    topics: {
      shadow: {
        name: "Shadow",
        opener: "Your shadow looks strange on that wall.",
        deflect: "The walls are old. The paper warps the light.",
        letGo: "It must just be the paper, yes.",
        letGoReply: "Mm. Your tea is getting cold.",
        press: "The paper isn't moving. Your shadow is.",
        tell: "She lifts her cup. On the wall, the shadow lifted its cup a moment before she did. The fire in the hearth burns blue for a second.",
        reply: "…You notice far too many details for someone so tired."
      },
      teaware: {
        name: "Teaware",
        opener: "This cup… didn't it have a plum branch painted on it?",
        deflect: "It's a set of twelve, every one different. And you're already on your second cup.",
        letGo: "Two cups. Of course.",
        letGoReply: "Of course. Drink deep — the night is long.",
        press: "I've only had one cup. I haven't even finished it.",
        tell: "The steam rising from your cup turns back and sinks into the tea.",
        reply: "One, then. Mortals are so fussy about numbers."
      },
      reflection: {
        name: "Reflection",
        opener: "I saw something in your lacquer tray.",
        deflect: "Lacquer that old doesn't reflect anything clearly. You can't expect it to show everyone at the table.",
        letGo: "It must just be the rain reflecting off the window.",
        letGoReply: "Rain always makes the world look emptier than it really is.",
        press: "I never said anyone was missing from the reflection.",
        tell: "For a moment she goes completely still — not a breath. Then she smiles, her lips stretching a little too far.",
        reply: "Didn't you? Hosts learn to guess what their guests are thinking."
      },
      ledger: {
        name: "Ledger",
        opener: "I read your ledger.",
        deflect: "My guest register. Every traveller signs it before they leave.",
        letGo: "It's a beautiful old book.",
        letGoReply: "Isn't it? There's always room for one more name.",
        press: "Every name has tonight's date. Decades apart.",
        tell: "She doesn't look at the book. She looks straight at you.",
        reply: "The fog comes on the same night every year, and so do lost travellers. Is it so strange that I keep count?",
        after: "Strange, yes. But nothing she said was wrong."
      }
    },

    // Suspicion in words, never a coloured bar. The index is state.suspicion (0–3).
    suspicion: [
      "She is pouring tea.",
      "She doesn't blink.",
      "She is watching your hands.",
      "She has stopped pretending."
    ],

    // On an ending that resolves, the HUD line says how the night ended instead
    // of how suspicious she is (renderSuspicion in game.js)
    afterEnding: {
      roadEarned: "She pours tea for the next traveller.",
      roadLucky: "The house is gone, and so is she.",
      stay: "She is gone. The tea is yours now.",
      midnight: "Your name is in the book now.",
      table: "The night has begun again."
    },

    // How rattled she is after each confirmed clue. The index is how many
    // clues are confirmed; the third press always ends the game instead.
    composure: [
      null,
      "Her smile freezes for a fraction of a second. Then she pours you more tea with impeccable calm, as if your words were only a passing breeze.",
      "She sets the teapot down on the wooden table with a hard knock, and doesn't touch it again. The warmth has gone from her face completely, and a heavy silence fills the room."
    ],

    // Her question at mark 2. The answer never changes the ending, only how it's
    // remembered at the end (see remember, below).
    answers: {
      lie: {
        label: "Lie",
        say: "Just the lady of this tea house. Nothing more.",
        reply: "Of course. And nothing more than that needs to be said in this room."
      },
      deflect: {
        label: "Deflect",
        say: "I only know that you serve excellent tea… and that the night would be much colder without it.",
        reply: "That isn't an answer, traveller… but it's a courtesy I appreciate."
      },
      honest: {
        label: "Be honest",
        say: "I've looked at you closely… and I'm sure I'm not talking to a human.",
        reply: "Honest guests are so rare around here… The mountain air usually brings more pretending."
      }
    },

    // How your answer is remembered at the end. game.js picks one of the four
    // for each ending (ENDING_MEMORY); deflecting leaves nothing to remember.
    remember: {
      escaped: {
        honest: "She'll remember that you looked the spirit in the eye and told the truth.",
        lie: "She'll remember that you chose the lie to keep up appearances."
      },
      kept: {
        honest: "She will remember your truth… forever.",
        lie: "She will remember your lie… forever."
      },
      again: {
        honest: "The night has begun again, but she still remembers that you were honest.",
        lie: "The night has begun again, but she still remembers that you lied."
      },
      inherited: {
        honest: "Behind the mask, you will remember that you looked the spirit in the eye and told the truth.",
        lie: "Behind the mask, you will remember that you tried to lie."
      }
    },

    // The five endings (DESIGN.md, "Five endings"). Endings 1 and 4 have two
    // versions. Every ending shows what becomes of your name in the ledger.
    endings: {
      roadEarned: {
        title: "The road",
        lines: [
          narrate("You open the paper door and step out onto the road. Behind you, the first cold light of dawn comes into the room and reaches the ledger, untouched on the table, its next page still blank."),
          narrate("Your name will never be part of this night. The way back is finally clear of the fog.")
        ]
      },
      roadLucky: {
        title: "The road",
        lines: [
          narrate("You stumble outside, straight into the morning light. When you look back, there are only old trees where the tea house should be — and you'll never know what almost made you sign that book."),
          narrate("You survived on pure luck, but the mountain cold will never quite leave you.")
        ]
      },
      table: {
        title: "The table",
        lines: [
          narrate("The door opens onto the same thick fog. When you turn around, the candle is whole again, the tea is steaming, and the ledger shows a fresh blank page, waiting for you."),
          host("Welcome back, traveller. The night is long… and it has only just begun again."),
          narrate("You have sat here before — and you can't remember how many times. The fog never lets the road show itself, and the book keeps a blank page for every turn. The night will only end when something of yours stays in the book: your name, or the proof of who she is.")
        ]
      },
      midnight: {
        title: "Midnight",
        lines: [
          narrate("The flame dies. In the total dark, you hear the wet sound of a brush moving on its own across the paper, tracing your name without you lifting a finger."),
          host("Time is up. Since you made no choice, the house chose for you."),
          narrate("When the candle is lit again, you are still sitting at the table — and you will go on sitting there. Your name is in the book now, dated tonight, under all the others who never left either. She fills your cup and waits for the next traveller to knock.")
        ]
      },
      maskGood: {
        title: "The mask",
        lines: [
          narrate("She gives a true smile and lifts away her porcelain mask. Then she takes up the brush, strikes hard through the space where your name would have gone, and shuts the book with a snap."),
          host("Few deserve to see the dawn… but you, traveller, have earned your way out.")
        ]
      },
      maskBad: {
        title: "The mask",
        lines: [
          narrate("Her face falls onto the table: a porcelain mask, hollow inside. You pick it up and set it over your own face. In the first pages of the ledger, you find her name — dated three hundred years ago."),
          narrate("Now you are the one who keeps the hearth lit and pours the tea. Forever — or until the next traveller accuses without proof and takes your place.")
        ]
      },
      stay: {
        title: "The ledger",
        lines: [
          narrate("You take the brush in your own hands and write your name of your own free will, the black ink shining on the page. She smiles and, for the first time in three hundred years, sets the teapot down."),
          host("Thank you, traveller. The tea is yours now… and the road, at last, is mine."),
          narrate("The paper door slides open onto the fog, and her steps fade until there is nothing left of them. You fill your own cup, the third one. Outside, the world is cold and unforgiving; in here the tea never runs out — and it won't, until another traveller writes their own name.")
        ]
      }
    }
  },

  // Português (do Brasil) — adapted from the author's own notes.
  pt: {
    name: "Português",

    ui: {
      speakerHost: "Anfitriã",
      speakerYou: "Você",
      quoteOpen: "“",
      quoteClose: "”",
      examine: "Examinar {thing}",
      costMark: "queima 1 marca",
      costLast: "queima a última marca",
      costFreeOne: "grátis — resta 1 espiada",
      costFreeMany: "grátis — restam {n} espiadas",
      costSuspicion: "+1 de suspeita",
      ask: "Perguntar: “{line}”",
      letGo: "Deixar passar: “{line}”",
      press: "Insistir: “{line}”",
      answer: "{label}: “{line}”",
      sitBack: "Voltar a se sentar",
      doorIn: "Abrir a porta por onde você entrou",
      doorInNote: "ar parado",
      doorBack: "Abrir a porta de papel ao fundo",
      doorBackNote: "uma brisa fria",
      signLedger: "Assinar o livro de visitas",
      markTitle: "Marca {n} — {title}",
      endingTitle: "Final {n} de 5 — {title}",
      confirmed: "✓ Pista confirmada: {name}",
      clueItem: "Pista confirmada: {name}",
      cluesNone: "Nenhuma ainda.",
      cluesCount: "Pistas confirmadas: {n} de 3.",
      candle: "Vela: restam {n} de 6 marcas",
      playAgain: "Jogar de novo"
    },

    pages: {
      siteTitle: "The Kitsune's Tea House",
      skip: "Pular para o conteúdo",
      navMain: "Principal",
      navHome: "Início",
      navGame: "Jogo",
      navHowTo: "Como Jogar",
      navLanguage: "Idioma",
      footer: "Um pequeno jogo de história em HTML, CSS e JavaScript simples.",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "Um pequeno mistério: prove que sua anfitriã não é humana antes que a vela se apague.",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "A névoa fechou a estrada e a única luz por quilômetros é uma casa de chá. Sua anfitriã é gentil, paciente e não é bem humana. Prove isso antes que a vela se apague — e então escolha a porta que leva você para casa.",
      homeEnter: "Entrar na casa de chá",
      homeHowTo: "Como jogar",

      gameTitleTag: "Jogo — The Kitsune's Tea House",
      gameHostImage: "Ilustração da anfitriã",
      gameHostNormal: "A anfitriã, sentada atrás da mesa baixa, servindo chá com um leve sorriso.",
      gameHostSuspicious: "A anfitriã, já sem sorriso, com os olhos fixos em você. Na parede atrás dela, a sombra dela tem caudas demais.",
      gameHostMaskGood: "A anfitriã afastando do rosto uma máscara branca de porcelana. Por baixo, ela sorri, com olhos âmbar de raposa e marcas vermelhas nos cantos, e segura um pincel molhado de tinta. Na mesa, um traço de tinta risca o livro de visitas aberto.",
      gameHostMaskBad: "A anfitriã ajoelhada, imóvel, com apenas escuridão onde deveria estar o rosto. O rosto dela está sobre a mesa: uma máscara de porcelana rachada, de olhos fechados, ao lado de um livro de visitas antigo e de uma vela que acabou de se apagar.",
      gameSceneRoadEarned: "Ao amanhecer, um viajante de chapéu de palha e capa, apoiado num cajado, desce por uma estrada de terra com a casa de chá ficando para trás. Ela ainda brilha na encosta, e o resto da névoa se assenta no vale lá embaixo.",
      gameSceneRoadLucky: "Luz da manhã entre cedros antigos. Um caminho estreito termina na grama de uma clareira vazia, ao lado de uma fileira de pedras cobertas de musgo, onde deveria estar a casa de chá.",
      gameSceneStay: "Visto do lugar do hóspede na mesa baixa: as suas mãos seguram o pincel sobre o livro de visitas aberto, com a tinta ainda fresca. O bule está pousado na bandeja, ao lado de uma xícara fumegante, e pela porta de papel aberta a anfitriã se afasta na névoa.",
      gameSceneMidnight: "A sala quase às escuras, vista do lugar do hóspede: o livro de visitas está aberto na mesa baixa, com um nome recém-escrito em tinta preta e o pincel pousado na página, sem que ninguém o segure. Ao lado, as mãos da anfitriã inclinam o bule sobre uma xícara fumegante; o rosto dela fica fora do enquadramento. Duas velas pequenas ardem outra vez, e a porta de papel ao fundo está fechada.",
      gameChoices: "Escolhas",
      gameClues: "Pistas confirmadas",
      gameLog: "Histórico",
      gameLogTitle: "O que aconteceu",
      gameLogClose: "Fechar",
      gameLogEmpty: "Nada ainda.",

      howToTitleTag: "Como Jogar — The Kitsune's Tea House",
      howToHeading: "Como Jogar",
      howToIntro: "É uma noite de névoa e você se abrigou numa casa de chá à beira da estrada. Sua anfitriã é simpática. E também não é humana. Encontre as provas antes que a vela se apague e então escolha a porta que leva você para casa.",
      howToCandleHeading: "A vela",
      howToCandleText: "A vela tem seis marcas. Examinar alguma coisa queima uma. Quando a última marca queima, é meia-noite.",
      howToTalkHeading: "Falar com ela",
      howToTalkText: "Assim que você percebe algo estranho, pode comentar com a anfitriã. Isso é grátis — ela vai arranjar uma explicação. Depois você pode deixar passar ou <strong>insistir</strong>. Insistir é como se provam as coisas, mas cada insistência deixa ela mais desconfiada — leia como ela é descrita embaixo da vela. Se forçar demais, ela para de fingir.",
      howToCluesHeading: "Pistas",
      howToCluesText: "Perceber algo estranho não é prova. Uma pista só fica <strong>confirmada</strong> depois de você ter visto <em>e</em> ter insistido com ela. As pistas confirmadas aparecem ao lado da cena com um ✓.",
      howToDoorsHeading: "As portas",
      howToDoorsText: "Na última marca há duas portas. Só uma leva de volta à estrada. Quanto mais pistas você tiver confirmado, mais fácil é distinguir uma da outra.",
      howToControlsHeading: "Controles",
      howToControlsTouch: "<strong>Toque ou mouse:</strong> toque em uma escolha.",
      howToControlsKeyboard: "<strong>Teclado:</strong> <kbd>Tab</kbd> e <kbd>Shift</kbd>+<kbd>Tab</kbd> movem entre as escolhas; <kbd>Enter</kbd> ou <kbd>Espaço</kbd> escolhe.",
      howToEnter: "Entrar na casa de chá"
    },

    marks: {
      6: {
        title: "Chegada",
        lines: [
          narrate("A névoa espessa engole completamente o caminho atrás de você, enquanto uma luz amarelada brilha na janela de papel da casa de chá — um acolhimento que parece quase encenado."),
          host("A névoa lá fora não perdoa ninguém até o amanhecer… Entre, o chá já está servido.")
        ]
      },
      5: {
        title: "Acomodar-se",
        lines: [narrate("As brasas da lareira brilham num vermelho tênue. O tempo parece desacelerar. Ela se ajoelha em silêncio à sua frente, observando você por cima da xícara.")]
      },
      4: {
        title: "A chuva",
        lines: [
          narrate("A chuva bate nas paredes de repente, violenta, e o mundo lá fora desaparece. A luz da lamparina pousa na bandeja de laca preta e fica ali, como um espelho de água."),
          host("A tempestade chegou. Agora somos só nós e esta sala.")
        ]
      },
      3: {
        title: "Ela sai",
        lines: [
          narrate("“Vou buscar mais água,” diz ela, e fecha a porta atrás de si. Você fica sozinho… mas a chama da vela não se mexe, como se até o ar tivesse parado."),
          narrate("Um livro de visitas está aberto ao lado do jarro de água. Você tem tempo só para examinar duas coisas antes que ela volte.")
        ]
      },
      2: {
        title: "A pergunta dela",
        lines: [
          narrate("Ela volta e se ajoelha lentamente à sua frente, com os olhos fixos nos seus. O vapor do chá sobe entre vocês."),
          host("Me diga, viajante… depois de tudo o que você viu, sabe realmente com quem está sentado?")
        ]
      },
      1: {
        title: "As portas",
        lines: [
          narrate("A vela está reduzida a um último resto de cera, prestes a se apagar, lançando sombras longas pelas portas de papel."),
          host("A vela está no fim… Se quer ver a luz do dia, sua escolha tem de ser feita agora.")
        ]
      }
    },

    nudge: host("O chá não espera ninguém… Beba um pouco, ainda está quente."),
    doorsClear: narrate("Na porta por onde você entrou, o ar está parado e abafado. Pela porta de papel ao fundo entra uma brisa fria e úmida, com um leve aroma de pinho."),
    doorsUnclear: narrate("Duas portas de papel idênticas na penumbra. O ar está imóvel nas duas e nada diz qual é o caminho verdadeiro."),
    ledgerOffer: narrate("Ela pousa o livro de visitas perto das portas e estende um pincel embebido em tinta fresca, esperando em silêncio."),
    stepsBack: narrate("Passos suaves soam no corredor lá fora, pés descalços deslizando na madeira velha: seu tempo acabou e ela está chegando."),
    sitBackDown: narrate("Você ajeita a roupa e se deixa cair de volta na almofada antes que ela te encontre de pé."),

    hotspots: {
      hearth: {
        label: "a lareira",
        text: "A luz do fogo projeta a sombra dela na parede de papel. Você conta as caudas duas vezes e chega sempre a um número diferente.",
        whileAway: "O fogo baixou. Na parede de papel, onde ela estava sentada, a sombra dela continua ajoelhada. Você conta as caudas e o número muda de novo. Depois, se desfaz."
      },
      tea: {
        label: "o serviço de chá",
        text: "A xícara nas suas mãos tem uma garça de asas abertas pintada. No entanto, você juraria que era um ramo de ameixeira quando ela serviu o chá."
      },
      window: {
        label: "a janela",
        text: "A névoa pressiona os painéis de papel, tão espessa que a luz da lamparina morre a um palmo de distância. Em algum lugar lá fora está a estrada por onde você veio.",
        afterRain: "A chuva bate nas venezianas de madeira. A janela ficou completamente preta; você já não consegue ver a estrada lá fora."
      },
      scroll: {
        label: "o pergaminho",
        text: "Um pergaminho pendurado na parede: uma única e longa pincelada imitando um caminho na montanha, e um poema gasto demais para ser lido. Só a última linha sobreviveu — “o viajante descansa; o caminho espera.”"
      },
      fan: {
        label: "o leque dela",
        text: "O leque dela repousa dobrado sobre a mesa baixa: papel simples, gasto nas hastes, pintado com uma única folha de bordo. Cheira levemente a fumaça de cedro."
      },
      tray: {
        label: "a bandeja de laca",
        text: "A chuva escureceu a janela, e a bandeja de laca reflete a luz como água parada. Nela você vê a sala atrás de você: a lareira, os pergaminhos, seu próprio ombro — mas não vê ninguém sentado à sua frente.",
        whileAway: "A bandeja de laca reflete a luz como água parada. Nela você vê a sala atrás de você — e vê a anfitriã, ajoelhada à sua frente servindo chá. Mas a almofada real está vazia."
      },
      ledger: {
        label: "o livro de visitas",
        text: "Um livro de visitas aberto junto ao jarro de água. Nomes em centenas de caligrafias diferentes — a pincel, a lápis, até as letras caprichadas de uma criança. Todas as entradas têm a data desta mesma noite. Separadas por décadas."
      }
    },

    topics: {
      shadow: {
        name: "Sombra",
        opener: "Sua sombra está estranha naquela parede.",
        deflect: "As paredes são velhas. O papel deforma a luz.",
        letGo: "Deve ser só o papel, sim.",
        letGoReply: "Mm. Seu chá está esfriando.",
        press: "O papel não está se mexendo. Sua sombra está.",
        tell: "Ela levanta a xícara. Na parede, a sombra levantou a xícara um instante antes dela. O fogo da lareira arde com uma luz azul por um segundo.",
        reply: "…Você repara em detalhes demais para quem está tão cansado."
      },
      teaware: {
        name: "Xícara",
        opener: "Esta xícara… não tinha um ramo de ameixeira pintado?",
        deflect: "É um jogo de doze, todas diferentes. E você já está na segunda xícara.",
        letGo: "Duas xícaras. Claro.",
        letGoReply: "Claro. Beba fundo — a noite é longa.",
        press: "Eu só tomei uma xícara. Nem terminei ainda.",
        tell: "O vapor que sobe da sua xícara inverte o sentido e afunda de volta no chá.",
        reply: "Uma, então. Os mortais são tão chatos com números."
      },
      reflection: {
        name: "Reflexo",
        opener: "Eu vi uma coisa na sua bandeja de laca.",
        deflect: "Laca tão antiga não reflete nada com clareza. Você não pode esperar que mostre todo mundo à mesa.",
        letGo: "Deve ser só o reflexo da chuva na janela.",
        letGoReply: "A chuva sempre faz o mundo parecer mais vazio do que é.",
        press: "Eu nunca disse que faltava alguém no reflexo.",
        tell: "Por um momento, ela fica completamente imóvel — nem um fôlego. Depois sorri, com os lábios se esticando um pouco demais.",
        reply: "Não disse? Os anfitriões aprendem a adivinhar o que os convidados estão pensando."
      },
      ledger: {
        name: "Livro de visitas",
        opener: "Eu li o seu livro de visitas.",
        deflect: "Meu registro de hóspedes. Todos os viajantes assinam antes de partir.",
        letGo: "É um livro antigo e bonito.",
        letGoReply: "Não é? Sempre tem espaço para mais um nome.",
        press: "Todos os nomes têm a data de hoje. Separados por décadas.",
        tell: "Ela não olha para o livro. Olha diretamente para você.",
        reply: "A névoa chega na mesma noite todos os anos, e os viajantes perdidos também. É tão estranho assim que eu mantenha a conta?",
        after: "Estranho, sim. Mas nada do que ela disse estava errado."
      }
    },

    suspicion: [
      "Ela está servindo o chá.",
      "Ela não pisca.",
      "Ela está observando suas mãos.",
      "Ela parou de fingir."
    ],

    afterEnding: {
      roadEarned: "Ela serve o chá ao próximo viajante.",
      roadLucky: "A casa sumiu, e ela também.",
      stay: "Ela saiu. Agora o chá é seu.",
      midnight: "O seu nome já está no livro.",
      table: "A noite recomeçou. Ela serve o chá."
    },

    composure: [
      null,
      "O sorriso dela congela por uma fração de segundo. Depois ela volta a encher sua xícara com uma calma impecável, como se suas palavras fossem só uma brisa passageira.",
      "Ela pousa o bule na madeira da mesa com uma pancada forte e não toca mais nele. O calor sumiu por completo do rosto dela e um silêncio pesado toma conta da sala."
    ],

    answers: {
      lie: {
        label: "Mentir",
        say: "Apenas com a dona desta casa de chá. Nada mais.",
        reply: "Com certeza. E nada mais do que isso precisa ser dito nesta sala."
      },
      deflect: {
        label: "Desviar",
        say: "Sei apenas que você serve um chá excelente… e que a noite seria muito mais fria sem ele.",
        reply: "Isso não é uma resposta, viajante… mas é uma cortesia que eu aprecio."
      },
      honest: {
        label: "Ser honesto",
        say: "Olhei bem para você… e tenho certeza de que não estou falando com uma humana.",
        reply: "Convidados honestos são tão raros por estas bandas… O ar da montanha costuma trazer mais fingimento."
      }
    },

    remember: {
      escaped: {
        honest: "Ela vai lembrar que você olhou nos olhos do espírito e disse a verdade.",
        lie: "Ela vai lembrar que você escolheu a mentira para manter as aparências."
      },
      kept: {
        honest: "Ela vai se lembrar da sua verdade… para sempre.",
        lie: "Ela vai se lembrar da sua mentira… para sempre."
      },
      again: {
        honest: "A noite recomeçou, mas ela ainda se lembra de que você foi honesto.",
        lie: "A noite recomeçou, mas ela ainda se lembra de que você mentiu."
      },
      inherited: {
        honest: "Atrás da máscara, você vai se lembrar de que olhou o espírito nos olhos e disse a verdade.",
        lie: "Atrás da máscara, você vai se lembrar de que tentou mentir."
      }
    },

    endings: {
      roadEarned: {
        title: "A estrada",
        lines: [
          narrate("Você abre a porta de papel e sai para a estrada. Atrás de você, a primeira luz fria da madrugada entra na sala e alcança o livro de visitas, intocado sobre a mesa, com a página seguinte ainda em branco."),
          narrate("O seu nome nunca fará parte desta noite. O caminho de volta está finalmente livre da névoa.")
        ]
      },
      roadLucky: {
        title: "A estrada",
        lines: [
          narrate("Você tropeça para fora, direto na luz da manhã. Quando olha para trás, só há árvores velhas onde a casa de chá deveria estar — e você nunca vai saber o que quase o fez assinar aquele livro."),
          narrate("Você sobreviveu por pura sorte, mas o frio da montanha nunca vai te abandonar por completo.")
        ]
      },
      table: {
        title: "A mesa",
        lines: [
          narrate("A porta se abre para a mesma névoa densa. Quando você se vira, a vela está inteira de novo, o chá solta vapor e o livro de visitas exibe uma página em branco, fresca, à sua espera."),
          host("Bem-vindo de volta, viajante. A noite é longa… e acabou de começar outra vez."),
          narrate("Você já esteve sentado aqui antes — e não se lembra de quantas vezes. A névoa não deixa a estrada aparecer, e o livro guarda uma página em branco para cada volta. A noite só vai acabar quando alguma coisa sua ficar no livro: o seu nome, ou a prova de quem ela é.")
        ]
      },
      midnight: {
        title: "Meia-noite",
        lines: [
          narrate("A chama morre. Na escuridão absoluta, você ouve o som úmido de um pincel se movendo sozinho sobre o papel, traçando o seu nome sem que você levante um dedo."),
          host("O tempo acabou. Já que você não fez uma escolha, a casa escolheu por você."),
          narrate("Quando a vela acende de novo, você continua sentado à mesa — e vai continuar. O seu nome está no livro, com a data de hoje, embaixo de todos os outros que também nunca saíram. Ela enche a sua xícara e espera o próximo viajante bater à porta.")
        ]
      },
      maskGood: {
        title: "A máscara",
        lines: [
          narrate("Ela dá um sorriso verdadeiro e levanta a máscara de porcelana. Depois pega o pincel, risca com força o espaço onde o seu nome estaria e fecha o livro com um estalo."),
          host("Poucos merecem ver o amanhecer… mas você, viajante, conquistou a sua saída.")
        ]
      },
      maskBad: {
        title: "A máscara",
        lines: [
          narrate("O rosto dela cai sobre a mesa: uma máscara de porcelana, vazia por dentro. Você a pega e a coloca sobre o próprio rosto. Nas primeiras páginas do livro, encontra o nome dela — datado de trezentos anos atrás."),
          narrate("Agora é você quem mantém a lareira acesa e serve o chá. Para sempre — ou até que o próximo viajante acuse sem provas e tome o seu lugar.")
        ]
      },
      stay: {
        title: "O livro de visitas",
        lines: [
          narrate("Você segura o pincel com as próprias mãos e escreve o seu nome por livre e espontânea vontade, a tinta preta brilhando na página. Ela sorri e, pela primeira vez em trezentos anos, pousa o bule."),
          host("Obrigada, viajante. O chá agora é seu… e a estrada, enfim, é minha."),
          narrate("A porta de papel se abre para a névoa, e os passos dela se afastam até sumirem. Você enche a sua própria xícara, a terceira. Lá fora o mundo é frio e implacável; aqui dentro o chá nunca acaba — e não vai acabar, até que outro viajante escreva o próprio nome.")
        ]
      }
    }
  },

  // Español — translated from the Portuguese and English, for review.
  es: {
    name: "Español",

    ui: {
      speakerHost: "Anfitriona",
      speakerYou: "Tú",
      quoteOpen: "«",
      quoteClose: "»",
      examine: "Examinar {thing}",
      costMark: "quema 1 marca",
      costLast: "quema la última marca",
      costFreeOne: "gratis — queda 1 vistazo",
      costFreeMany: "gratis — quedan {n} vistazos",
      costSuspicion: "+1 de sospecha",
      ask: "Preguntar: «{line}»",
      letGo: "Dejarlo pasar: «{line}»",
      press: "Insistir: «{line}»",
      answer: "{label}: «{line}»",
      sitBack: "Volver a sentarte",
      doorIn: "Abrir la puerta por la que entraste",
      doorInNote: "aire quieto",
      doorBack: "Abrir la puerta de papel del fondo",
      doorBackNote: "una corriente fría",
      signLedger: "Firmar el libro de visitas",
      markTitle: "Marca {n} — {title}",
      endingTitle: "Final {n} de 5 — {title}",
      confirmed: "✓ Pista confirmada: {name}",
      clueItem: "Pista confirmada: {name}",
      cluesNone: "Ninguna todavía.",
      cluesCount: "Pistas confirmadas: {n} de 3.",
      candle: "Vela: quedan {n} de 6 marcas",
      playAgain: "Jugar otra vez"
    },

    pages: {
      siteTitle: "The Kitsune's Tea House",
      skip: "Saltar al contenido",
      navMain: "Principal",
      navHome: "Inicio",
      navGame: "Juego",
      navHowTo: "Cómo jugar",
      navLanguage: "Idioma",
      footer: "Un pequeño juego de historia en HTML, CSS y JavaScript puros.",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "Un pequeño misterio: demuestra que tu anfitriona no es humana antes de que se apague la vela.",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "La niebla ha cerrado el camino y la única luz en kilómetros es una casa de té. Tu anfitriona es amable, paciente y no del todo humana. Demuéstralo antes de que se apague la vela, y luego elige la puerta que te lleva a casa.",
      homeEnter: "Entrar en la casa de té",
      homeHowTo: "Cómo jugar",

      gameTitleTag: "Juego — The Kitsune's Tea House",
      gameHostImage: "Ilustración de la anfitriona",
      gameHostNormal: "La anfitriona, sentada tras la mesa baja, sirviendo té con una leve sonrisa.",
      gameHostSuspicious: "La anfitriona, ya sin sonrisa, con los ojos fijos en ti. En la pared, a su espalda, su sombra tiene demasiadas colas.",
      gameHostMaskGood: "La anfitriona apartando de su rostro una máscara blanca de porcelana. Debajo sonríe, con ojos ámbar de zorro y marcas rojas en las comisuras, y sostiene un pincel mojado en tinta. Sobre la mesa, un trazo de tinta tacha el libro de visitas abierto.",
      gameHostMaskBad: "La anfitriona arrodillada e inmóvil, con solo oscuridad donde debería estar su rostro. Su rostro yace sobre la mesa: una máscara de porcelana agrietada, con los ojos cerrados, junto a un viejo libro de visitas y una vela recién apagada.",
      gameSceneRoadEarned: "Al amanecer, un viajero con sombrero de paja y capa, apoyado en un bastón, baja por un camino de tierra con la casa de té a sus espaldas. Aún brilla en la ladera, mientras los restos de niebla se asientan en el valle.",
      gameSceneRoadLucky: "Luz de la mañana entre cedros antiguos. Un sendero estrecho termina en la hierba de un claro vacío, junto a una hilera de piedras cubiertas de musgo, donde debería estar la casa de té.",
      gameSceneStay: "Visto desde el sitio del huésped en la mesa baja: tus manos sostienen el pincel sobre el libro de visitas abierto, con la tinta aún fresca. La tetera está posada en la bandeja, junto a una taza humeante, y por la puerta de papel abierta la anfitriona se aleja en la niebla.",
      gameSceneMidnight: "La sala casi a oscuras, vista desde el sitio del huésped: el libro de visitas está abierto sobre la mesa baja, con un nombre recién escrito en tinta negra y el pincel apoyado en la página, sin que nadie lo sostenga. Al lado, las manos de la anfitriona inclinan la tetera sobre una taza humeante; su rostro queda fuera del encuadre. Dos velas pequeñas vuelven a arder, y la puerta de papel del fondo está cerrada.",
      gameChoices: "Opciones",
      gameClues: "Pistas confirmadas",
      gameLog: "Registro",
      gameLogTitle: "Lo que ha pasado",
      gameLogClose: "Cerrar",
      gameLogEmpty: "Nada todavía.",

      howToTitleTag: "Cómo jugar — The Kitsune's Tea House",
      howToHeading: "Cómo jugar",
      howToIntro: "Es una noche de niebla y te has refugiado en una casa de té al borde del camino. Tu anfitriona es amable. Y tampoco es humana. Encuentra las pruebas antes de que se apague la vela y luego elige la puerta que te lleva a casa.",
      howToCandleHeading: "La vela",
      howToCandleText: "La vela tiene seis marcas. Examinar algo quema una. Cuando se quema la última, es medianoche.",
      howToTalkHeading: "Hablar con ella",
      howToTalkText: "En cuanto notas algo raro, puedes comentarlo con tu anfitriona. Eso es gratis: ella lo explicará como si nada. Después puedes dejarlo pasar o <strong>insistir</strong>. Insistir es como se prueban las cosas, pero cada insistencia la vuelve más desconfiada: lee cómo se la describe debajo de la vela. Si aprietas demasiado, deja de fingir.",
      howToCluesHeading: "Pistas",
      howToCluesText: "Notar algo extraño no es una prueba. Una pista solo queda <strong>confirmada</strong> cuando la has visto <em>y</em> has insistido con ella. Las pistas confirmadas aparecen junto a la escena con un ✓.",
      howToDoorsHeading: "Las puertas",
      howToDoorsText: "En la última marca hay dos puertas. Solo una lleva de vuelta al camino. Cuantas más pistas hayas confirmado, más fácil es distinguirlas.",
      howToControlsHeading: "Controles",
      howToControlsTouch: "<strong>Táctil o ratón:</strong> toca una opción.",
      howToControlsKeyboard: "<strong>Teclado:</strong> <kbd>Tab</kbd> y <kbd>Shift</kbd>+<kbd>Tab</kbd> se mueven entre opciones; <kbd>Enter</kbd> o <kbd>Espacio</kbd> elige.",
      howToEnter: "Entrar en la casa de té"
    },

    marks: {
      6: {
        title: "Llegada",
        lines: [
          narrate("La niebla se traga por completo el camino a tus espaldas. Delante, una luz amarilla y cálida brilla en la ventana de papel de una casa de té, una bienvenida que parece casi ensayada."),
          host("La niebla de ahí fuera no perdona a nadie hasta el amanecer… Entra. El té ya está servido.")
        ]
      },
      5: {
        title: "Acomodarse",
        lines: [narrate("Las brasas del hogar brillan de un rojo tenue. El tiempo parece ir más despacio. Ella se arrodilla en silencio frente a ti, observándote por encima de su taza.")]
      },
      4: {
        title: "La lluvia",
        lines: [
          narrate("La lluvia golpea las paredes de golpe, violenta, y el mundo exterior desaparece. La luz del candil cae sobre la bandeja de laca negra y se queda ahí, como un espejo de agua."),
          host("La tormenta ya está aquí. Ahora solo quedamos nosotros y esta sala.")
        ]
      },
      3: {
        title: "Ella sale",
        lines: [
          narrate("«Voy a por más agua», dice, y cierra la puerta al salir. Estás solo… pero la llama de la vela no se mueve, como si hasta el aire se hubiera detenido."),
          narrate("Un libro de visitas está abierto junto a la jarra de agua. Tienes tiempo justo para examinar dos cosas antes de que vuelva.")
        ]
      },
      2: {
        title: "Su pregunta",
        lines: [
          narrate("Vuelve y se arrodilla despacio frente a ti, con los ojos fijos en los tuyos. El vapor del té sube entre los dos."),
          host("Dime, viajero… después de todo lo que has visto, ¿sabes realmente con quién estás sentado?")
        ]
      },
      1: {
        title: "Las puertas",
        lines: [
          narrate("La vela se ha reducido a una última brizna de cera, a punto de apagarse, y lanza sombras largas sobre las puertas de papel."),
          host("La vela está en las últimas… Si quieres ver la luz del día, tienes que elegir ahora.")
        ]
      }
    },

    nudge: host("El té no espera a nadie… Bebe un poco, todavía está caliente."),
    doorsClear: narrate("En la puerta por la que entraste, el aire está quieto y viciado. Por la puerta de papel del fondo entra una corriente fría y húmeda, con un leve olor a pino."),
    doorsUnclear: narrate("Dos puertas de papel idénticas en la penumbra. El aire está quieto en las dos y nada te dice cuál es el camino verdadero."),
    ledgerOffer: narrate("Deja el libro de visitas junto a las puertas y te ofrece un pincel empapado en tinta fresca, esperando en silencio."),
    stepsBack: narrate("Pasos suaves en el pasillo de fuera, pies descalzos deslizándose sobre la madera vieja: se te acabó el tiempo y ella ya vuelve."),
    sitBackDown: narrate("Te alisas la ropa y te dejas caer de nuevo sobre el cojín antes de que te encuentre de pie."),

    hotspots: {
      hearth: {
        label: "el hogar",
        text: "La luz del fuego proyecta su sombra en la pared de papel. Cuentas las colas dos veces y cada vez te sale un número distinto.",
        whileAway: "El fuego ha bajado. En la pared de papel, donde ella estaba sentada, su sombra sigue arrodillada. Cuentas las colas y el número no deja de cambiar. Luego se desvanece."
      },
      tea: {
        label: "el servicio de té",
        text: "La taza que tienes en las manos lleva pintada una grulla con las alas abiertas. Y sin embargo habrías jurado que era una rama de ciruelo cuando te sirvió el té."
      },
      window: {
        label: "la ventana",
        text: "La niebla presiona contra los paneles de papel, tan espesa que la luz del candil muere a un palmo de distancia. En algún lugar ahí fuera está el camino por el que viniste.",
        afterRain: "La lluvia golpea las contraventanas de madera. La ventana se ha vuelto completamente negra; ya no ves el camino de fuera."
      },
      scroll: {
        label: "el pergamino",
        text: "Un pergamino colgado en la pared: una sola pincelada larga con forma de sendero de montaña y un poema demasiado gastado para leerlo. Solo ha sobrevivido la última línea: «el viajero descansa; el camino espera»."
      },
      fan: {
        label: "su abanico",
        text: "Su abanico descansa plegado sobre la mesa baja: papel sencillo, gastado en las varillas, pintado con una sola hoja de arce. Huele levemente a humo de cedro."
      },
      tray: {
        label: "la bandeja de laca",
        text: "La lluvia ha oscurecido la ventana, y la bandeja de laca refleja la luz como agua quieta. En ella ves la sala a tus espaldas: el hogar, los pergaminos, tu propio hombro… pero a nadie sentado frente a ti.",
        whileAway: "La bandeja de laca refleja la luz como agua quieta. En ella ves la sala a tus espaldas… y a la anfitriona, arrodillada frente a ti, sirviendo té. Pero el cojín real está vacío."
      },
      ledger: {
        label: "el libro de visitas",
        text: "Un libro de visitas abierto junto a la jarra de agua. Nombres en cientos de caligrafías distintas: a pincel, a lápiz, incluso las letras cuidadosas de un niño. Todas las entradas llevan la fecha de esta misma noche. Separadas por décadas."
      }
    },

    topics: {
      shadow: {
        name: "Sombra",
        opener: "Tu sombra se ve rara en esa pared.",
        deflect: "Las paredes son viejas. El papel deforma la luz.",
        letGo: "Será solo el papel, sí.",
        letGoReply: "Mm. Se te está enfriando el té.",
        press: "El papel no se mueve. Tu sombra sí.",
        tell: "Levanta su taza. En la pared, la sombra levantó la taza un instante antes que ella. El fuego del hogar arde azul durante un segundo.",
        reply: "…Te fijas en demasiados detalles para estar tan cansado."
      },
      teaware: {
        name: "Taza",
        opener: "Esta taza… ¿no tenía pintada una rama de ciruelo?",
        deflect: "Es un juego de doce, todas distintas. Y tú ya vas por la segunda taza.",
        letGo: "Dos tazas. Claro.",
        letGoReply: "Claro. Bebe hondo: la noche es larga.",
        press: "Solo me he tomado una taza. Ni siquiera la he terminado.",
        tell: "El vapor que sube de tu taza da la vuelta y se hunde de nuevo en el té.",
        reply: "Una, entonces. Los mortales sois tan quisquillosos con los números."
      },
      reflection: {
        name: "Reflejo",
        opener: "He visto algo en tu bandeja de laca.",
        deflect: "Una laca tan vieja no refleja nada con claridad. No puedes esperar que muestre a todos los que están a la mesa.",
        letGo: "Será solo el reflejo de la lluvia en la ventana.",
        letGoReply: "La lluvia siempre hace que el mundo parezca más vacío de lo que es.",
        press: "Yo nunca dije que faltara nadie en el reflejo.",
        tell: "Por un momento se queda completamente inmóvil, sin respirar. Luego sonríe, con los labios estirándose un poco de más.",
        reply: "¿No lo dijiste? Los anfitriones aprendemos a adivinar lo que piensan sus invitados."
      },
      ledger: {
        name: "Libro de visitas",
        opener: "He leído tu libro de visitas.",
        deflect: "Mi registro de huéspedes. Todos los viajeros firman antes de marcharse.",
        letGo: "Es un libro viejo y bonito.",
        letGoReply: "¿Verdad que sí? Siempre hay sitio para un nombre más.",
        press: "Todos los nombres llevan la fecha de hoy. Separados por décadas.",
        tell: "No mira el libro. Te mira directamente a ti.",
        reply: "La niebla llega la misma noche todos los años, y los viajeros perdidos también. ¿Tan extraño es que lleve la cuenta?",
        after: "Extraño, sí. Pero nada de lo que dijo era falso."
      }
    },

    suspicion: [
      "Está sirviendo el té.",
      "No parpadea.",
      "Está mirándote las manos.",
      "Ha dejado de fingir."
    ],

    afterEnding: {
      roadEarned: "Sirve el té al próximo viajero.",
      roadLucky: "La casa ha desaparecido, y ella también.",
      stay: "Ella se ha ido. Ahora el té es tuyo.",
      midnight: "Tu nombre ya está en el libro.",
      table: "La noche ha vuelto a empezar."
    },

    composure: [
      null,
      "Su sonrisa se congela una fracción de segundo. Luego te sirve más té con una calma impecable, como si tus palabras fueran solo una brisa pasajera.",
      "Deja la tetera sobre la madera de la mesa con un golpe fuerte y no vuelve a tocarla. El calor ha desaparecido por completo de su rostro y un silencio pesado llena la sala."
    ],

    answers: {
      lie: {
        label: "Mentir",
        say: "Solo con la señora de esta casa de té. Nada más.",
        reply: "Por supuesto. Y nada más que eso hace falta decir en esta sala."
      },
      deflect: {
        label: "Desviar",
        say: "Solo sé que sirves un té excelente… y que la noche sería mucho más fría sin él.",
        reply: "Eso no es una respuesta, viajero… pero es una cortesía que agradezco."
      },
      honest: {
        label: "Ser sincero",
        say: "Te he mirado bien… y estoy seguro de que no estoy hablando con una humana.",
        reply: "Los invitados sinceros son muy raros por aquí… El aire de la montaña suele traer más fingimiento."
      }
    },

    remember: {
      escaped: {
        honest: "Recordará que miraste al espíritu a los ojos y dijiste la verdad.",
        lie: "Recordará que elegiste la mentira para guardar las apariencias."
      },
      kept: {
        honest: "Recordará tu verdad… para siempre.",
        lie: "Recordará tu mentira… para siempre."
      },
      again: {
        honest: "La noche ha vuelto a empezar, pero ella aún recuerda que fuiste sincero.",
        lie: "La noche ha vuelto a empezar, pero ella aún recuerda que mentiste."
      },
      inherited: {
        honest: "Tras la máscara, recordarás que miraste al espíritu a los ojos y dijiste la verdad.",
        lie: "Tras la máscara, recordarás que intentaste mentir."
      }
    },

    endings: {
      roadEarned: {
        title: "El camino",
        lines: [
          narrate("Abres la puerta de papel y sales al camino. A tus espaldas, la primera luz fría del alba entra en la sala y alcanza el libro de visitas, intacto sobre la mesa, con la página siguiente aún en blanco."),
          narrate("Tu nombre nunca formará parte de esta noche. El camino de vuelta por fin está libre de niebla.")
        ]
      },
      roadLucky: {
        title: "El camino",
        lines: [
          narrate("Sales a trompicones, directo a la luz de la mañana. Cuando miras atrás, solo hay árboles viejos donde debería estar la casa de té… y nunca sabrás qué estuvo a punto de hacerte firmar aquel libro."),
          narrate("Sobreviviste por pura suerte, pero el frío de la montaña nunca te abandonará del todo.")
        ]
      },
      table: {
        title: "La mesa",
        lines: [
          narrate("La puerta se abre a la misma niebla espesa. Cuando te das la vuelta, la vela vuelve a estar entera, el té humea y el libro de visitas muestra una página en blanco, recién estrenada, esperándote."),
          host("Bienvenido de nuevo, viajero. La noche es larga… y acaba de empezar otra vez."),
          narrate("Ya te has sentado aquí antes — y no recuerdas cuántas veces. La niebla no deja que aparezca el camino, y el libro guarda una página en blanco para cada vuelta. La noche solo va a terminar cuando algo tuyo quede en el libro: tu nombre, o la prueba de quién es ella.")
        ]
      },
      midnight: {
        title: "Medianoche",
        lines: [
          narrate("La llama muere. En la oscuridad absoluta oyes el sonido húmedo de un pincel que se mueve solo sobre el papel, trazando tu nombre sin que muevas un dedo."),
          host("Se acabó el tiempo. Como no elegiste, la casa eligió por ti."),
          narrate("Cuando la vela se enciende de nuevo, sigues sentado a la mesa — y vas a seguir. Tu nombre ya está en el libro, con la fecha de hoy, debajo de todos los demás que tampoco salieron. Ella te llena la taza y espera a que el próximo viajero llame a la puerta.")
        ]
      },
      maskGood: {
        title: "La máscara",
        lines: [
          narrate("Te dedica una sonrisa sincera y se levanta la máscara de porcelana. Luego toma el pincel, tacha con fuerza el espacio donde habría ido tu nombre y cierra el libro con un chasquido."),
          host("Pocos merecen ver el amanecer… pero tú, viajero, te has ganado la salida.")
        ]
      },
      maskBad: {
        title: "La máscara",
        lines: [
          narrate("Su rostro cae sobre la mesa: una máscara de porcelana, hueca por dentro. La recoges y te la pones sobre la cara. En las primeras páginas del libro encuentras su nombre, fechado hace trescientos años."),
          narrate("Ahora eres tú quien mantiene el hogar encendido y sirve el té. Para siempre, o hasta que el próximo viajero acuse sin pruebas y ocupe tu lugar.")
        ]
      },
      stay: {
        title: "El libro de visitas",
        lines: [
          narrate("Tomas el pincel con tus propias manos y escribes tu nombre por voluntad propia, con la tinta negra brillando en la página. Ella sonríe y, por primera vez en trescientos años, deja la tetera."),
          host("Gracias, viajero. El té ahora es tuyo… y el camino, por fin, es mío."),
          narrate("La puerta de papel se abre a la niebla y sus pasos se alejan hasta desaparecer. Llenas tu propia taza, la tercera. Fuera, el mundo es frío e implacable; aquí dentro el té nunca se acaba… y no se acabará hasta que otro viajero escriba su propio nombre.")
        ]
      }
    }
  },

  // Français — translated from the English and Portuguese, for review by a
  // native speaker. The traveller and the host say "vous" to each other.
  // French spacing: a narrow no-break space, written \u202F so no editor can
  // swallow it, sits before : ; ? ! and inside « ». Punctuation never wraps alone.
  fr: {
    name: "Français",

    ui: {
      speakerHost: "Hôtesse",
      speakerYou: "Vous",
      quoteOpen: "«\u202F",
      quoteClose: "\u202F»",
      examine: "Examiner {thing}",
      costMark: "brûle 1 marque",
      costLast: "brûle la dernière marque",
      costFreeOne: "gratuit — encore 1 coup d'œil",
      costFreeMany: "gratuit — encore {n} coups d'œil",
      costSuspicion: "+1 de méfiance",
      ask: "Demander\u202F: «\u202F{line}\u202F»",
      letGo: "Laisser couler\u202F: «\u202F{line}\u202F»",
      press: "Insister\u202F: «\u202F{line}\u202F»",
      answer: "{label}\u202F: «\u202F{line}\u202F»",
      sitBack: "Se rasseoir",
      doorIn: "Ouvrir la porte par laquelle vous êtes entré",
      doorInNote: "air immobile",
      doorBack: "Ouvrir la porte de papier du fond",
      doorBackNote: "un courant d'air froid",
      signLedger: "Signer le registre",
      markTitle: "Marque {n} — {title}",
      endingTitle: "Fin {n} sur 5 — {title}",
      confirmed: "✓ Indice confirmé\u202F: {name}",
      clueItem: "Indice confirmé\u202F: {name}",
      cluesNone: "Aucun pour l'instant.",
      cluesCount: "Indices confirmés\u202F: {n} sur 3.",
      candle: "Bougie\u202F: il reste {n} sur 6 marques",
      playAgain: "Rejouer"
    },

    pages: {
      siteTitle: "The Kitsune's Tea House",
      skip: "Aller au contenu",
      navMain: "Principal",
      navHome: "Accueil",
      navGame: "Jeu",
      navHowTo: "Comment jouer",
      navLanguage: "Langue",
      footer: "Un court jeu narratif écrit en HTML, CSS et JavaScript simples.",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "Un court jeu d'enquête\u202F: prouvez que votre hôtesse n'est pas humaine avant que la bougie ne s'éteigne.",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "Le brouillard a fermé la route, et la seule lumière à des lieues à la ronde est celle d'une maison de thé. Votre hôtesse est gracieuse, patiente, et pas tout à fait humaine. Prouvez-le avant que la bougie ne s'éteigne — puis choisissez la porte qui mène chez vous.",
      homeEnter: "Entrer dans la maison de thé",
      homeHowTo: "Comment jouer",

      gameTitleTag: "Jeu — The Kitsune's Tea House",
      gameHostImage: "Illustration de l'hôtesse",
      gameHostNormal: "L'hôtesse, assise derrière la table basse, sert le thé avec un léger sourire.",
      gameHostSuspicious: "L'hôtesse, qui ne sourit plus, les yeux fixés sur vous. Sur le mur derrière elle, son ombre a trop de queues.",
      gameHostMaskGood: "L'hôtesse écarte de son visage un masque de porcelaine blanche. Dessous, elle sourit, avec des yeux de renard couleur d'ambre et des marques rouges à leurs coins, un pinceau trempé d'encre dans l'autre main. Sur la table, un trait d'encre barre le registre ouvert.",
      gameHostMaskBad: "L'hôtesse, agenouillée et parfaitement immobile, n'a que du noir à la place du visage. Son visage repose sur la table à côté d'elle\u202F: un masque de porcelaine fêlé aux yeux clos, près d'un vieux registre ouvert et d'une bougie qui vient de s'éteindre.",
      gameSceneRoadEarned: "À l'aube, un voyageur coiffé d'un chapeau de paille et vêtu d'une cape, appuyé sur un bâton, descend un chemin de terre en laissant la maison de thé derrière lui. Elle brille encore sur le versant, tandis que les dernières brumes se posent dans la vallée.",
      gameSceneRoadLucky: "La lumière du matin entre des cèdres centenaires. Un sentier étroit s'arrête dans l'herbe d'une clairière vide, près d'une rangée de pierres moussues, là où devrait se trouver la maison de thé.",
      gameSceneStay: "Depuis la place de l'hôte à la table basse, vos mains tiennent le pinceau au-dessus du registre ouvert, l'encre encore fraîche. La théière est posée sur son plateau, à côté d'une tasse fumante, et par la porte de papier ouverte l'hôtesse s'éloigne dans le brouillard.",
      gameSceneMidnight: "La salle presque dans le noir, vue depuis la place du voyageur\u202F: le registre est ouvert sur la table basse, un nom fraîchement écrit à l'encre noire et le pinceau posé sur la page, sans main pour le tenir. À côté, les mains de l'hôtesse penchent la théière au-dessus d'une tasse fumante\u202F; son visage reste hors cadre. Deux petites bougies brûlent de nouveau, et la porte de papier du fond est fermée.",
      gameChoices: "Choix",
      gameClues: "Indices confirmés",
      gameLog: "Journal",
      gameLogTitle: "Ce qui s'est passé",
      gameLogClose: "Fermer",
      gameLogEmpty: "Rien pour l'instant.",

      howToTitleTag: "Comment jouer — The Kitsune's Tea House",
      howToHeading: "Comment jouer",
      howToIntro: "C'est une nuit de brouillard et vous avez trouvé refuge dans une maison de thé au bord de la route. Votre hôtesse est aimable. Elle n'est pas humaine non plus. Trouvez la preuve avant que la bougie ne s'éteigne, puis choisissez la porte qui mène chez vous.",
      howToCandleHeading: "La bougie",
      howToCandleText: "La bougie compte six marques. Examiner quelque chose en brûle une. Quand la dernière marque brûle, il est minuit.",
      howToTalkHeading: "Lui parler",
      howToTalkText: "Dès que vous avez remarqué quelque chose d'étrange, vous pouvez en parler à votre hôtesse. C'est gratuit — elle trouvera une explication. Vous pouvez alors laisser couler, ou <strong>insister</strong>. C'est en insistant qu'on prouve les choses, mais chaque fois, elle se méfie davantage de vous — lisez comment elle est décrite sous la bougie. Poussez trop loin, et elle cesse de faire semblant.",
      howToCluesHeading: "Indices",
      howToCluesText: "Remarquer quelque chose d'étrange n'est pas une preuve. Un indice n'est <strong>confirmé</strong> qu'une fois que vous l'avez vu <em>et</em> que vous avez insisté auprès d'elle. Les indices confirmés s'affichent à côté de la scène avec un ✓.",
      howToDoorsHeading: "Les portes",
      howToDoorsText: "À la dernière marque, il y a deux portes. Une seule ramène à la route. Plus vous avez confirmé d'indices, plus il est facile de les distinguer.",
      howToControlsHeading: "Commandes",
      howToControlsTouch: "<strong>Toucher ou souris\u202F:</strong> touchez un choix.",
      howToControlsKeyboard: "<strong>Clavier\u202F:</strong> <kbd>Tab</kbd> et <kbd>Maj</kbd>+<kbd>Tab</kbd> passent d'un choix à l'autre\u202F; <kbd>Entrée</kbd> ou <kbd>Espace</kbd> en choisit un.",
      howToEnter: "Entrer dans la maison de thé"
    },

    marks: {
      6: {
        title: "Arrivée",
        lines: [
          narrate("Le brouillard avale entièrement la route derrière vous. Devant, une lumière jaune et chaude brille à la fenêtre de papier d'une maison de thé — un accueil qui semble presque mis en scène."),
          host("Dehors, le brouillard ne pardonne à personne avant l'aube… Entrez. Le thé est déjà servi.")
        ]
      },
      5: {
        title: "S'installer",
        lines: [narrate("Les braises de l'âtre rougeoient faiblement. Le temps semble ralentir. Elle s'agenouille en silence face à vous et vous observe par-dessus le bord de sa tasse.")]
      },
      4: {
        title: "La pluie",
        lines: [
          narrate("La pluie frappe les murs d'un coup, soudaine et violente, et le monde extérieur disparaît. La lumière de la lampe se pose sur le plateau de laque noire et y reste, comme un miroir d'eau."),
          host("L'orage est là. Il n'y a plus que nous, et cette pièce.")
        ]
      },
      3: {
        title: "Elle sort",
        lines: [
          narrate("«\u202FJe vais chercher encore de l'eau\u202F», dit-elle, et elle fait glisser la porte derrière elle. Vous êtes seul… mais la flamme de la bougie ne bouge pas, comme si l'air lui-même s'était arrêté."),
          narrate("Un registre est ouvert à côté de la jarre d'eau. Vous avez tout juste le temps d'examiner deux choses avant qu'elle ne revienne.")
        ]
      },
      2: {
        title: "Sa question",
        lines: [
          narrate("Elle revient et s'agenouille lentement face à vous, les yeux rivés aux vôtres. La vapeur du thé monte entre vous."),
          host("Dites-moi, voyageur… après tout ce que vous avez vu, savez-vous vraiment avec qui vous êtes assis\u202F?")
        ]
      },
      1: {
        title: "Les portes",
        lines: [
          narrate("La bougie n'est plus qu'un dernier éclat de cire, sur le point de s'éteindre, et jette de longues ombres sur les portes de papier."),
          host("La bougie touche à sa fin… Si vous voulez revoir le jour, c'est maintenant qu'il faut choisir.")
        ]
      }
    },

    nudge: host("Le thé n'attend personne… Buvez un peu. Il est encore chaud."),
    doorsClear: narrate("Devant la porte par laquelle vous êtes entré, l'air est lourd et immobile. Par la porte de papier du fond se glisse une brise froide et humide, qui sent légèrement le pin."),
    doorsUnclear: narrate("Deux portes de papier identiques dans la pénombre. L'air est immobile devant l'une comme devant l'autre, et rien ne dit laquelle est la bonne."),
    ledgerOffer: narrate("Elle pose le registre près des portes et vous tend un pinceau imbibé d'encre fraîche, en attendant en silence."),
    stepsBack: narrate("Des pas légers dans le couloir, des pieds nus qui glissent sur le vieux bois\u202F: votre temps est écoulé, elle revient."),
    sitBackDown: narrate("Vous lissez vos vêtements et vous laissez retomber sur votre coussin avant qu'elle ne vous trouve debout."),

    hotspots: {
      hearth: {
        label: "l'âtre",
        text: "La lueur du feu projette son ombre sur la cloison de papier. Vous comptez les queues deux fois, et vous n'obtenez jamais le même nombre.",
        whileAway: "Le feu a baissé. Sur la cloison de papier, là où elle était assise, son ombre est toujours agenouillée. Vous comptez les queues, et le nombre ne cesse de changer. Puis elle s'efface."
      },
      tea: {
        label: "le service à thé",
        text: "La tasse que vous tenez porte une grue peinte, les ailes déployées. Et pourtant, vous auriez juré que c'était une branche de prunier quand elle vous a servi."
      },
      window: {
        label: "la fenêtre",
        text: "Le brouillard se presse contre les panneaux de papier, si épais que la lumière de la lampe meurt à un pas. Quelque part, dehors, se trouve la route par laquelle vous êtes venu.",
        afterRain: "La pluie bat les volets de bois. La fenêtre est devenue complètement noire\u202F; vous ne voyez plus la route."
      },
      scroll: {
        label: "le rouleau",
        text: "Un rouleau pend au mur\u202F: un seul long coup de pinceau en forme de sentier de montagne, et un poème trop effacé pour être lu. Seul le dernier vers a survécu — «\u202Fle voyageur se repose\u202F; la route attend\u202F»."
      },
      fan: {
        label: "son éventail",
        text: "Son éventail repose, replié, sur la table basse\u202F: du papier simple, usé aux brins, peint d'une unique feuille d'érable. Il sent légèrement la fumée de cèdre."
      },
      tray: {
        label: "le plateau de laque",
        text: "La pluie a assombri la fenêtre, et le plateau de laque reflète la lumière comme une eau immobile. Vous y voyez la pièce derrière vous\u202F: l'âtre, les rouleaux, votre propre épaule — mais personne assis face à vous.",
        whileAway: "Le plateau de laque reflète la lumière comme une eau immobile. Vous y voyez la pièce derrière vous — et l'hôtesse, agenouillée face à vous, qui sert le thé. Mais le vrai coussin est vide."
      },
      ledger: {
        label: "le registre",
        text: "Un registre est ouvert à côté de la jarre d'eau. Des noms dans des centaines d'écritures différentes — au pinceau, au crayon, jusqu'aux lettres appliquées d'un enfant. Chaque entrée porte la date de cette même nuit. À des décennies d'écart."
      }
    },

    topics: {
      shadow: {
        name: "Ombre",
        opener: "Votre ombre a quelque chose d'étrange, sur ce mur.",
        deflect: "Les murs sont vieux. Le papier déforme la lumière.",
        letGo: "Ce doit être le papier, oui.",
        letGoReply: "Mm. Votre thé refroidit.",
        press: "Le papier ne bouge pas. Votre ombre, si.",
        tell: "Elle lève sa tasse. Sur le mur, l'ombre a levé la sienne un instant avant elle. Le feu de l'âtre brûle bleu l'espace d'une seconde.",
        reply: "…Vous remarquez bien trop de détails pour quelqu'un de si fatigué."
      },
      teaware: {
        name: "Tasse",
        opener: "Cette tasse… n'avait-elle pas une branche de prunier peinte dessus\u202F?",
        deflect: "C'est un service de douze, toutes différentes. Et vous en êtes déjà à votre deuxième tasse.",
        letGo: "Deux tasses. Bien sûr.",
        letGoReply: "Bien sûr. Buvez à longs traits — la nuit est longue.",
        press: "Je n'ai bu qu'une tasse. Je ne l'ai même pas terminée.",
        tell: "La vapeur qui monte de votre tasse fait demi-tour et replonge dans le thé.",
        reply: "Une, alors. Les mortels sont si pointilleux avec les nombres."
      },
      reflection: {
        name: "Reflet",
        opener: "J'ai vu quelque chose dans votre plateau de laque.",
        deflect: "Une laque aussi ancienne ne reflète rien clairement. On ne peut pas lui demander de montrer tout le monde à table.",
        letGo: "Ce doit être le reflet de la pluie sur la fenêtre.",
        letGoReply: "La pluie fait toujours paraître le monde plus vide qu'il ne l'est.",
        press: "Je n'ai jamais dit qu'il manquait quelqu'un dans le reflet.",
        tell: "Un instant, elle se fige complètement — pas un souffle. Puis elle sourit, les lèvres étirées un peu trop loin.",
        reply: "Ah non\u202F? Les hôtesses apprennent à deviner ce que pensent leurs invités."
      },
      ledger: {
        name: "Registre",
        opener: "J'ai lu votre registre.",
        deflect: "Mon registre des hôtes. Chaque voyageur le signe avant de repartir.",
        letGo: "C'est un beau livre ancien.",
        letGoReply: "N'est-ce pas\u202F? Il reste toujours de la place pour un nom de plus.",
        press: "Tous les noms portent la date de ce soir. À des décennies d'écart.",
        tell: "Elle ne regarde pas le livre. Elle vous regarde, vous.",
        reply: "Le brouillard vient la même nuit chaque année, et les voyageurs égarés aussi. Est-ce si étrange que je tienne le compte\u202F?",
        after: "Étrange, oui. Mais rien de ce qu'elle a dit n'était faux."
      }
    },

    suspicion: [
      "Elle sert le thé.",
      "Elle ne cligne pas des yeux.",
      "Elle observe vos mains.",
      "Elle a cessé de faire semblant."
    ],

    afterEnding: {
      roadEarned: "Elle sert le thé au prochain voyageur.",
      roadLucky: "La maison a disparu, et elle aussi.",
      stay: "Elle est partie. Le thé est à vous.",
      midnight: "Votre nom est déjà dans le registre.",
      table: "La nuit a recommencé."
    },

    composure: [
      null,
      "Son sourire se fige une fraction de seconde. Puis elle vous ressert du thé avec un calme impeccable, comme si vos paroles n'étaient qu'une brise passagère.",
      "Elle repose la théière sur la table de bois d'un coup sec, et n'y touche plus. Toute chaleur a quitté son visage, et un lourd silence envahit la pièce."
    ],

    answers: {
      lie: {
        label: "Mentir",
        say: "Avec la maîtresse de cette maison de thé, voilà tout.",
        reply: "Bien sûr. Et il n'est nul besoin d'en dire davantage dans cette pièce."
      },
      deflect: {
        label: "Esquiver",
        say: "Je sais seulement que vous servez un thé excellent… et que la nuit serait bien plus froide sans lui.",
        reply: "Ce n'est pas une réponse, voyageur… mais c'est une politesse que j'apprécie."
      },
      honest: {
        label: "Être honnête",
        say: "Je vous ai bien regardée… et je suis sûr de ne pas parler à une humaine.",
        reply: "Les invités honnêtes sont si rares par ici… L'air de la montagne apporte d'ordinaire plus de faux-semblants."
      }
    },

    remember: {
      escaped: {
        honest: "Elle se souviendra que vous avez regardé l'esprit dans les yeux et dit la vérité.",
        lie: "Elle se souviendra que vous avez choisi le mensonge pour sauver les apparences."
      },
      kept: {
        honest: "Elle se souviendra de votre vérité… pour toujours.",
        lie: "Elle se souviendra de votre mensonge… pour toujours."
      },
      again: {
        honest: "La nuit a recommencé, mais elle se souvient encore que vous avez été honnête.",
        lie: "La nuit a recommencé, mais elle se souvient encore que vous avez menti."
      },
      inherited: {
        honest: "Derrière le masque, vous vous souviendrez d'avoir regardé l'esprit dans les yeux et dit la vérité.",
        lie: "Derrière le masque, vous vous souviendrez d'avoir tenté de mentir."
      }
    },

    endings: {
      roadEarned: {
        title: "La route",
        lines: [
          narrate("Vous ouvrez la porte de papier et sortez sur la route. Derrière vous, la première lumière froide de l'aube entre dans la pièce et atteint le registre, intact sur la table, sa page suivante encore blanche."),
          narrate("Votre nom ne fera jamais partie de cette nuit. Le chemin du retour est enfin libre de brouillard.")
        ]
      },
      roadLucky: {
        title: "La route",
        lines: [
          narrate("Vous sortez en trébuchant, droit dans la lumière du matin. Quand vous vous retournez, il n'y a que de vieux arbres là où devrait se trouver la maison de thé — et vous ne saurez jamais ce qui a failli vous faire signer ce registre."),
          narrate("Vous avez survécu par pure chance, mais le froid de la montagne ne vous quittera jamais tout à fait.")
        ]
      },
      table: {
        title: "La table",
        lines: [
          narrate("La porte s'ouvre sur le même brouillard épais. Quand vous vous retournez, la bougie est de nouveau entière, le thé fume, et le registre montre une page blanche, toute neuve, qui vous attend."),
          host("Bon retour parmi nous, voyageur. La nuit est longue… et elle vient tout juste de recommencer."),
          narrate("Vous vous êtes déjà assis ici — et vous ne savez plus combien de fois. Le brouillard ne laisse jamais la route apparaître, et le registre garde une page blanche à chaque tour. La nuit ne s'arrêtera que lorsque quelque chose de vous restera dans le registre\u202F: votre nom, ou la preuve de qui elle est.")
        ]
      },
      midnight: {
        title: "Minuit",
        lines: [
          narrate("La flamme meurt. Dans le noir complet, vous entendez le bruit mouillé d'un pinceau qui glisse tout seul sur le papier, et trace votre nom sans que vous leviez le petit doigt."),
          host("Le temps est écoulé. Puisque vous n'avez pas choisi, la maison a choisi pour vous."),
          narrate("Quand la bougie se rallume, vous êtes toujours assis à la table — et vous y resterez. Votre nom est dans le registre, daté de ce soir, sous tous les autres qui ne sont jamais repartis non plus. Elle remplit votre tasse et attend que le prochain voyageur frappe à la porte.")
        ]
      },
      maskGood: {
        title: "Le masque",
        lines: [
          narrate("Elle a un vrai sourire et soulève son masque de porcelaine. Puis elle prend le pinceau, raye d'un trait appuyé l'espace où votre nom aurait dû s'inscrire, et referme le registre d'un coup sec."),
          host("Rares sont ceux qui méritent de voir l'aube… mais vous, voyageur, vous avez gagné votre sortie.")
        ]
      },
      maskBad: {
        title: "Le masque",
        lines: [
          narrate("Son visage tombe sur la table\u202F: un masque de porcelaine, creux à l'intérieur. Vous le ramassez et le posez sur votre propre visage. Dans les premières pages du registre, vous trouvez son nom — daté d'il y a trois cents ans."),
          narrate("C'est désormais vous qui gardez l'âtre allumé et servez le thé. Pour toujours — ou jusqu'à ce que le prochain voyageur accuse sans preuve et prenne votre place.")
        ]
      },
      stay: {
        title: "Le registre",
        lines: [
          narrate("Vous prenez le pinceau dans vos propres mains et écrivez votre nom de votre plein gré, l'encre noire luisant sur la page. Elle sourit et, pour la première fois en trois cents ans, repose la théière."),
          host("Merci, voyageur. Le thé est à vous désormais… et la route, enfin, est à moi."),
          narrate("La porte de papier s'ouvre sur le brouillard, et ses pas s'éloignent jusqu'à disparaître. Vous remplissez votre propre tasse, la troisième. Dehors, le monde est froid et impitoyable. Ici, le thé ne s'épuise jamais — et il ne s'épuisera pas, jusqu'à ce qu'un autre voyageur écrive son propre nom.")
        ]
      }
    }
  },

  // 日本語 — translated from the English and Portuguese, for review by a native
  // speaker. The host speaks in an okami's keigo: her politeness is the mask.
  // The traveller calls her 女将さん; she calls the traveller 旅のお方.
  ja: {
    name: "日本語",

    ui: {
      speakerHost: "女将",
      speakerYou: "あなた",
      quoteOpen: "「",
      quoteClose: "」",
      examine: "{thing}を調べる",
      costMark: "刻みを1つ燃やす",
      costLast: "最後の刻みを燃やす",
      costFreeOne: "無料——あと1回見られる",
      costFreeMany: "無料——あと{n}回見られる",
      costSuspicion: "疑念 +1",
      ask: "尋ねる：「{line}」",
      letGo: "聞き流す：「{line}」",
      press: "問い詰める：「{line}」",
      answer: "{label}：「{line}」",
      sitBack: "席に戻る",
      doorIn: "入ってきた戸を開ける",
      doorInNote: "よどんだ空気",
      doorBack: "奥の障子戸を開ける",
      doorBackNote: "冷たいすきま風",
      signLedger: "宿帳に名を記す",
      markTitle: "刻み {n} — {title}",
      endingTitle: "結末 {n}／5 — {title}",
      confirmed: "✓ 確かな手がかり：{name}",
      clueItem: "確かな手がかり：{name}",
      cluesNone: "まだありません。",
      cluesCount: "確かめた手がかり：{n}／3",
      candle: "蝋燭：残り {n}／6 刻み",
      playAgain: "もう一度遊ぶ"
    },

    pages: {
      siteTitle: "The Kitsune's Tea House",
      skip: "本文へ移動",
      navMain: "メイン",
      navHome: "ホーム",
      navGame: "ゲーム",
      navHowTo: "遊び方",
      navLanguage: "言語",
      footer: "HTML・CSS・JavaScriptだけで作った短い物語ゲーム。",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "短いミステリーゲーム：蝋燭が燃え尽きる前に、女将が人ではないことを証明しましょう。",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "霧が道を閉ざし、見渡す限りの灯りはただ一軒の茶屋だけ。女将は優雅で、辛抱強く、そして人とは少し違います。蝋燭が燃え尽きる前にそれを証明し——家へと続く戸を選びましょう。",
      homeEnter: "茶屋に入る",
      homeHowTo: "遊び方",

      gameTitleTag: "ゲーム — The Kitsune's Tea House",
      gameHostImage: "女将のイラスト",
      gameHostNormal: "低い卓の向こうに座り、かすかに微笑みながら茶を注ぐ女将。",
      gameHostSuspicious: "もう微笑んではおらず、あなたをじっと見つめる女将。背後の壁に映る影には、尾が多すぎる。",
      gameHostMaskGood: "白い磁器の仮面を顔から外す女将。その下の顔は微笑み、琥珀色の狐の目の端に赤い隈取りがある。もう一方の手には墨を含んだ筆。卓の上では、開いた宿帳に墨の線が一本引かれている。",
      gameHostMaskBad: "身じろぎもせず正座する女将。顔があるはずの場所には闇しかない。その顔は傍らの卓の上にある——目を閉じた、ひびの入った磁器の仮面。そばには古い宿帳と、消えたばかりの蝋燭。",
      gameSceneRoadEarned: "夜明け、笠をかぶり合羽をまとって杖をついた旅人が、茶屋を背にして土の道を下ってくる。茶屋はまだ斜面で灯り、谷には霧の名残が沈んでいる。",
      gameSceneRoadLucky: "古い杉の木々のあいだに朝の光が差す。細い道は、苔むした石が一列に並ぶだけの空き地の草むらで途切れている。本来なら、そこに茶屋があるはずの場所だ。",
      gameSceneStay: "低い卓の客の側から見た場面。あなたの手が、開いた宿帳の上で筆を持ち、墨はまだ乾いていない。急須は盆に置かれ、そばで茶碗が湯気を立てている。開いた障子戸の向こうでは、女将が霧の中へ遠ざかっていく。",
      gameSceneMidnight: "ほとんど暗いままの座敷を、客の側から見た場面。低い卓の上に宿帳が開かれ、黒々とした墨で名が記されたばかりの頁に、誰の手も添えぬまま筆が置かれている。そばでは女将の手が急須を傾け、湯気の立つ茶碗を満たしている。女将の顔は画面の外にある。小さな蝋燭が二本また灯り、奥の障子は閉じられている。",
      gameChoices: "選択肢",
      gameClues: "確かな手がかり",
      gameLog: "履歴",
      gameLogTitle: "これまでのこと",
      gameLogClose: "閉じる",
      gameLogEmpty: "まだ何もありません。",

      howToTitleTag: "遊び方 — The Kitsune's Tea House",
      howToHeading: "遊び方",
      howToIntro: "霧の夜、あなたは街道沿いの茶屋に身を寄せました。女将は親切です。そして、人ではありません。蝋燭が燃え尽きる前に証拠を見つけ、家へと続く戸を選びましょう。",
      howToCandleHeading: "蝋燭",
      howToCandleText: "蝋燭には六つの刻みがあります。何かを調べると、一つ燃えます。最後の刻みが燃えると、真夜中です。",
      howToTalkHeading: "女将と話す",
      howToTalkText: "何か妙なことに気づいたら、女将に話を振ることができます。これは無料です——女将はうまく言い繕うでしょう。そのあと、聞き流すか、<strong>問い詰める</strong>かを選べます。問い詰めることで物事は証明されますが、そのたびに女将はあなたを警戒します——蝋燭の下にある女将の様子を読んでください。追い詰めすぎると、女将は取り繕うのをやめます。",
      howToCluesHeading: "手がかり",
      howToCluesText: "妙なことに気づいただけでは証拠になりません。手がかりが<strong>確か</strong>になるのは、それを見て、<em>かつ</em>女将を問い詰めたときだけです。確かな手がかりは、場面の横に ✓ 付きで表示されます。",
      howToDoorsHeading: "二つの戸",
      howToDoorsText: "最後の刻みには、戸が二つあります。道へ戻れるのは一つだけ。確かめた手がかりが多いほど、見分けやすくなります。",
      howToControlsHeading: "操作",
      howToControlsTouch: "<strong>タッチ・マウス：</strong>選択肢をタップします。",
      howToControlsKeyboard: "<strong>キーボード：</strong><kbd>Tab</kbd> と <kbd>Shift</kbd>+<kbd>Tab</kbd> で選択肢を移動し、<kbd>Enter</kbd> か <kbd>Space</kbd> で決定します。",
      howToEnter: "茶屋に入る"
    },

    marks: {
      6: {
        title: "到着",
        lines: [
          narrate("霧が背後の道をすっかり呑み込んだ。前方では、茶屋の障子窓に温かな黄色い灯りがともっている——出来すぎた、芝居のような歓迎だった。"),
          host("外の霧は、夜が明けるまで誰ひとり容赦いたしません……どうぞお上がりくださいませ。お茶はもうお淹れしてございます。")
        ]
      },
      5: {
        title: "くつろぎ",
        lines: [narrate("囲炉裏の炭火が、かすかに赤く光っている。時の流れが遅くなったように感じる。女将は黙って向かいに座り、茶碗の縁越しにあなたを見つめている。")]
      },
      4: {
        title: "雨",
        lines: [
          narrate("雨が不意に、激しく壁を打ちはじめ、外の世界がかき消える。行灯の光が黒漆の盆に落ち、そのまま水鏡のように留まっている。"),
          host("嵐がまいりました。これで、この座敷にいるのはわたくしたちだけでございます。")
        ]
      },
      3: {
        title: "女将、席を外す",
        lines: [
          narrate("「お水をもう少し汲んでまいります」と言って、女将は戸を閉めて出ていった。あなたは一人になる……だが蝋燭の炎は揺れもしない。まるで空気までもが止まったかのように。"),
          narrate("水瓶のそばに、宿帳が開いたまま置かれている。女将が戻るまでに調べられるのは、二つだけだ。")
        ]
      },
      2: {
        title: "女将の問い",
        lines: [
          narrate("女将は戻ってくると、あなたの目をまっすぐに見据えたまま、ゆっくりと向かいに座った。二人のあいだを、茶の湯気が立ちのぼる。"),
          host("お聞かせくださいませ、旅のお方……これほどのものをご覧になって、今どなたとご一緒か、本当にお分かりでございますか。")
        ]
      },
      1: {
        title: "二つの戸",
        lines: [
          narrate("蝋燭は最後のひとかけらの蝋になり、今にも消えそうに、障子戸へ長い影を投げかけている。"),
          host("蝋燭も尽きかけてございます……日の光をご覧になりたいのでしたら、今こそお選びくださいませ。")
        ]
      }
    },

    nudge: host("お茶は誰も待ってはくれません……少しお召し上がりくださいませ。まだ温こうございます。"),
    doorsClear: narrate("入ってきた戸の前では、空気がよどみ、動かない。奥の障子戸からは、冷たく湿った風がすっと入り込み、かすかに松の香りがする。"),
    doorsUnclear: narrate("薄闇に、そっくりな障子戸が二つ。どちらの前でも空気は動かず、どちらが本当の道かを告げるものは何もない。"),
    ledgerOffer: narrate("女将は宿帳を戸のそばに置き、墨をたっぷり含ませた筆を差し出して、黙って待っている。"),
    stepsBack: narrate("廊下で、古い板の上を素足がすべる、かすかな足音がする。時間切れだ——女将が戻ってくる。"),
    sitBackDown: narrate("あなたは着物の裾を整え、立っているところを見られる前に、座布団へ座り直した。"),

    hotspots: {
      hearth: {
        label: "囲炉裏",
        text: "炉の火明かりが、女将の影を障子に映している。尾の数を二度数えたが、そのたびに数が違った。",
        whileAway: "火は小さくなっている。女将が座っていた場所の障子で、影だけがまだ正座している。尾を数えるたびに、数が変わる。やがて影は消えた。"
      },
      tea: {
        label: "茶器",
        text: "手にした茶碗には、翼を広げた鶴が描かれている。けれど女将が茶を注いでくれたとき、たしかに梅の枝だったはずだ。"
      },
      window: {
        label: "窓",
        text: "霧が障子窓に押し寄せ、行灯の光は手のひら一つ分先で消えてしまうほど濃い。この外のどこかに、来た道があるはずだ。",
        afterRain: "雨が木の雨戸を叩いている。窓は真っ黒になり、もう外の道は見えない。"
      },
      scroll: {
        label: "掛け軸",
        text: "壁に掛け軸が掛かっている。山道の形をした長い一筆と、かすれて読めない一首の歌。残っているのは最後の一句だけだ——「旅人は休み、道は待つ」。"
      },
      fan: {
        label: "女将の扇",
        text: "女将の扇が、低い卓の上にたたんで置かれている。飾り気のない紙で、骨は使い込まれ、紅葉が一枚だけ描かれている。かすかに杉の煙の匂いがする。"
      },
      tray: {
        label: "漆の盆",
        text: "雨が窓を暗くし、漆の盆が静かな水面のように光を映している。そこには背後の座敷が見える。囲炉裏、掛け軸、自分の肩——けれど、向かいに座っているはずの誰の姿もない。",
        whileAway: "漆の盆が、静かな水面のように光を映している。そこには背後の座敷が見える——そして、向かいに正座して茶を注ぐ女将の姿も。だが、本物の座布団は空っぽだ。"
      },
      ledger: {
        label: "宿帳",
        text: "水瓶のそばに宿帳が開かれている。何百もの異なる筆跡の名前——筆で、鉛筆で、子どもの丁寧な字まで。どの記名にも、今夜と同じ日付がある。何十年も隔てて。"
      }
    },

    topics: {
      shadow: {
        name: "影",
        opener: "あの壁に映る女将さんの影、どこか妙ですね。",
        deflect: "古い壁でございますから。紙が灯りを歪ませるのでございましょう。",
        letGo: "ええ、きっと紙のせいですね。",
        letGoReply: "ええ。……お茶が冷めてしまいます。",
        press: "紙は動いていません。動いているのは影のほうです。",
        tell: "女将が茶碗を持ち上げる。壁の影は、女将よりほんの一瞬早く茶碗を持ち上げていた。囲炉裏の火が、一瞬だけ青く燃える。",
        reply: "……それほどお疲れのご様子で、ずいぶん細かなことにまでお気づきになるのですね。"
      },
      teaware: {
        name: "茶碗",
        opener: "この茶碗……梅の枝が描かれていませんでしたか？",
        deflect: "十二客揃いで、一つとして同じ柄はございません。それに、もう二杯目でございますよ。",
        letGo: "二杯目。そうでしたね。",
        letGoReply: "さようでございます。どうぞたっぷりお召し上がりくださいませ——夜は長うございますから。",
        press: "まだ一杯しか飲んでいません。それも飲み終えていません。",
        tell: "茶碗から立ちのぼる湯気が向きを変え、茶の中へ沈んでいく。",
        reply: "では、一杯でございますね。人の子は、数にずいぶんとこだわるものでございます。"
      },
      reflection: {
        name: "映り込み",
        opener: "漆の盆に、何かが見えました。",
        deflect: "それほど古い漆では、何もはっきりとは映りません。卓を囲む方を皆映すなど、とても。",
        letGo: "きっと窓に映った雨でしょうね。",
        letGoReply: "雨はいつも、世界を本当よりも寂しく見せるものでございます。",
        press: "誰かが映っていなかったなんて、私は一言も言っていません。",
        tell: "ほんの一瞬、女将は完全に動きを止める——息ひとつしない。それから微笑む。唇が、少しだけ横に伸びすぎている。",
        reply: "さようでございましたか？　女将というものは、お客様のお考えを察するようになるのでございます。"
      },
      ledger: {
        name: "宿帳",
        opener: "宿帳を読みました。",
        deflect: "わたくしの宿帳でございます。お客様は皆、お発ちの前にお名前を記してまいります。",
        letGo: "古くて美しい帳面ですね。",
        letGoReply: "でございましょう？　名前をもう一つ記す余白は、いつでもございます。",
        press: "どの名前にも今夜の日付があります。何十年も隔てて。",
        tell: "女将は宿帳を見ない。まっすぐにあなたを見る。",
        reply: "霧は毎年同じ夜に参ります。道に迷う旅のお方も同じでございます。数を記しておくのが、そんなに妙でございましょうか。",
        after: "妙ではある。けれど、女将の言葉に偽りは一つもなかった。"
      }
    },

    suspicion: [
      "女将が茶を注いでいる。",
      "女将がまばたきをしない。",
      "女将があなたの手元を見ている。",
      "女将が取り繕うのをやめた。"
    ],

    afterEnding: {
      roadEarned: "女将は次の旅人に茶を注ぐ。",
      roadLucky: "茶屋は消えた。女将も。",
      stay: "女将は去った。茶はあなたのものだ。",
      midnight: "あなたの名は宿帳にある。",
      table: "夜がまた始まった。茶が注がれる。"
    },

    composure: [
      null,
      "女将の笑みが、ほんの一瞬凍りつく。それから非の打ちどころのない落ち着きで、あなたの茶碗にお茶を注ぎ足した。あなたの言葉など、通り過ぎる風にすぎないとでもいうように。",
      "女将は急須を木の卓にごとりと強く置き、それきり手を触れない。顔からすっかり温かみが消え、重い沈黙が座敷を満たす。"
    ],

    answers: {
      lie: {
        label: "嘘をつく",
        say: "この茶屋の女将さんと、です。それだけですよ。",
        reply: "さようでございますね。この座敷では、それ以上申し上げることはございません。"
      },
      deflect: {
        label: "はぐらかす",
        say: "分かっているのは、女将さんのお茶が美味しくて……それがなければ、この夜はもっと冷えるということだけです。",
        reply: "それはお答えではございませんね、旅のお方……ですが、そのお心遣いはありがたく頂戴いたします。"
      },
      honest: {
        label: "正直に言う",
        say: "よく見させてもらいました……人ではない方と話しているのだと、確信しています。",
        reply: "正直なお客様は、このあたりではめったにいらっしゃいません……山の風は、たいてい偽りのほうを運んでまいりますので。"
      }
    },

    remember: {
      escaped: {
        honest: "あなたがあやかしの目をまっすぐに見て真実を告げたことを、女将は忘れないだろう。",
        lie: "あなたが体裁を保つために嘘を選んだことを、女将は忘れないだろう。"
      },
      kept: {
        honest: "あなたの真実を、女将はいつまでも……忘れないだろう。",
        lie: "あなたの嘘を、女将はいつまでも……忘れないだろう。"
      },
      again: {
        honest: "夜はまた始まった。けれど女将は、あなたが正直だったことをまだ覚えている。",
        lie: "夜はまた始まった。けれど女将は、あなたが嘘をついたことをまだ覚えている。"
      },
      inherited: {
        honest: "仮面の奥で、あなたはあやかしの目をまっすぐに見て真実を告げたことを覚えているだろう。",
        lie: "仮面の奥で、あなたは嘘をつこうとしたことを覚えているだろう。"
      }
    },

    endings: {
      roadEarned: {
        title: "街道",
        lines: [
          narrate("障子戸を開け、あなたは街道へと踏み出す。背後では、明け方の冷たい最初の光が座敷に差し込み、卓の上に手つかずのまま残された宿帳を照らす。次の頁は、まだ白いままだ。"),
          narrate("あなたの名が、この夜に加わることは決してない。帰り道は、ようやく霧から解き放たれた。")
        ]
      },
      roadLucky: {
        title: "街道",
        lines: [
          narrate("よろめきながら外へ出ると、そこは朝の光の中だった。振り返っても、茶屋があるはずの場所には古い木々が立っているだけ——何があなたにあの宿帳へ名を記させかけたのか、あなたが知ることは永遠にない。"),
          narrate("運だけで生き延びた。けれど山の冷たさが、あなたから消え去ることはないだろう。")
        ]
      },
      table: {
        title: "卓",
        lines: [
          narrate("戸を開けると、そこには同じ濃い霧があった。振り返ると、蝋燭はまた元どおりの長さに戻り、茶は湯気を立て、宿帳には真新しい白い頁が、あなたを待つように開かれている。"),
          host("お帰りなさいませ、旅のお方。夜は長うございます……そして、たった今また始まったばかりでございます。"),
          narrate("あなたは以前にもここに座っていた——それが何度目なのかは思い出せない。霧は道を見せず、宿帳は巡るたびに白い頁を一枚ずつ取っておく。この夜が終わるのは、あなたの何かが帳面に残るときだけだ。名か、あるいは女将が何者かという証か。")
        ]
      },
      midnight: {
        title: "真夜中",
        lines: [
          narrate("炎が消える。真っ暗闇の中、ひとりでに紙の上をすべる筆の、湿った音が聞こえる。あなたが指一本動かさないうちに、筆はあなたの名を書き記していく。"),
          host("刻限でございます。お選びにならなかったのですから、この家が代わりに選ばせていただきました。"),
          narrate("蝋燭にまた火が入っても、あなたは卓の前に座ったままだ——これからもずっと。あなたの名は今日の日付で宿帳に記され、同じように出て行けなかった者たちの名の下に並んでいる。女将はあなたの茶碗を満たし、次の旅人が戸を叩くのを待つ。")
        ]
      },
      maskGood: {
        title: "仮面",
        lines: [
          narrate("女将は心からの笑みを浮かべ、磁器の仮面を外した。そして筆を取ると、あなたの名が記されるはずだった場所に力強く線を引き、ぱたんと宿帳を閉じた。"),
          host("夜明けを見るに値する方は、ほんのわずかでございます……ですが旅のお方、あなた様はご自分の手で帰り道を勝ち取られました。")
        ]
      },
      maskBad: {
        title: "仮面",
        lines: [
          narrate("女将の顔が卓の上に落ちる。中が空洞の、磁器の仮面だった。あなたはそれを拾い上げ、自分の顔にあてがう。宿帳の最初の頁に、女将の名があった——三百年前の日付で。"),
          narrate("今度は、あなたが囲炉裏の火を絶やさず、茶を淹れる番だ。永遠に——あるいは、次の旅人が証拠もないまま問い詰め、あなたに取って代わるまで。")
        ]
      },
      stay: {
        title: "宿帳",
        lines: [
          narrate("あなたは自らの手で筆を取り、自分の意思で名を書き記す。黒い墨が頁の上で艶やかに光る。女将は微笑み、三百年ぶりに急須を置いた。"),
          host("ありがとうございます、旅のお方。お茶はこれからあなた様のもの……そして街道は、ようやくわたくしのものでございます。"),
          narrate("障子戸が霧へと開き、女将の足音は遠ざかって消えていった。あなたは自分の茶碗に三杯目を注ぐ。外の世界は冷たく無慈悲だ。ここでは茶が尽きることはない——次の旅人が自らの名を記すまでは。")
        ]
      }
    }
  }
};
