// The Kitsune's Tea House — every word the game says.
//
// game.js holds the rules: the numbers, which hotspot hides which flaw, what a
// press costs. This file holds the words, once per language. Every language
// block has exactly the same keys, so adding a language never touches game.js:
// it needs only its code in LANGUAGES (js/i18n.js) and a link in each page's menu.
//
// Languages: en (default), pt, es.

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
          narrate("You open the paper door, and the first cold light of dawn comes into the room. On the table, the ledger stays behind, untouched, its next page still blank."),
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
          host("Welcome back, traveller. The night is long… and it has only just begun again.")
        ]
      },
      midnight: {
        title: "Midnight",
        lines: [
          narrate("The flame dies. In the total dark, you hear the wet sound of a brush moving on its own across the paper, tracing your name without you lifting a finger."),
          host("Time is up. Since you made no choice, the house chose for you.")
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
          narrate("Someone has to keep the hearth lit and pour the tea. At least until the next traveller knows too much.")
        ]
      },
      stay: {
        title: "The ledger",
        lines: [
          narrate("You take the brush in your own hands and write your name of your own free will, the black ink shining on the page. She smiles and pours a third cup of tea."),
          host("The world outside is so cold and unforgiving… In here, the tea never runs out.")
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
          narrate("Você abre a porta de papel e a primeira luz fria da madrugada entra na sala. Sobre a mesa, o livro de visitas fica para trás, intocado, com a página seguinte ainda em branco."),
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
          host("Bem-vindo de volta, viajante. A noite é longa… e acabou de começar outra vez.")
        ]
      },
      midnight: {
        title: "Meia-noite",
        lines: [
          narrate("A chama morre. Na escuridão absoluta, você ouve o som úmido de um pincel se movendo sozinho sobre o papel, traçando o seu nome sem que você levante um dedo."),
          host("O tempo acabou. Já que você não fez uma escolha, a casa escolheu por você.")
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
          narrate("Alguém tem que manter a lareira acesa e servir o chá. Pelo menos até que o próximo viajante saiba demais.")
        ]
      },
      stay: {
        title: "O livro de visitas",
        lines: [
          narrate("Você segura o pincel com as próprias mãos e escreve o seu nome por livre e espontânea vontade, a tinta preta brilhando na página. Ela sorri e serve uma terceira xícara de chá."),
          host("O mundo lá fora é tão frio e implacável… Aqui dentro, o chá nunca acaba.")
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
          narrate("Abres la puerta de papel y la primera luz fría del alba entra en la sala. Sobre la mesa, el libro de visitas se queda atrás, intacto, con la página siguiente aún en blanco."),
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
          host("Bienvenido de nuevo, viajero. La noche es larga… y acaba de empezar otra vez.")
        ]
      },
      midnight: {
        title: "Medianoche",
        lines: [
          narrate("La llama muere. En la oscuridad absoluta oyes el sonido húmedo de un pincel que se mueve solo sobre el papel, trazando tu nombre sin que muevas un dedo."),
          host("Se acabó el tiempo. Como no elegiste, la casa eligió por ti.")
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
          narrate("Alguien tiene que mantener el hogar encendido y servir el té. Al menos hasta que el próximo viajero sepa demasiado.")
        ]
      },
      stay: {
        title: "El libro de visitas",
        lines: [
          narrate("Tomas el pincel con tus propias manos y escribes tu nombre por voluntad propia, con la tinta negra brillando en la página. Ella sonríe y te sirve una tercera taza de té."),
          host("El mundo de fuera es tan frío e implacable… Aquí dentro, el té nunca se acaba.")
        ]
      }
    }
  }
};
