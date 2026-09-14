// The Kitsune's Tea House — every word the game says.
//
// game.js holds the rules: the numbers, which hotspot hides which flaw, what a
// press costs. This file holds the words, once per language. Every language
// block has exactly the same keys, so adding a language never touches the code.
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
      gameChoices: "Choices",
      gameClues: "Confirmed clues",

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

    // Her question at mark 2. The answer changes the ending's last line.
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

    echoHonest: "She'll remember that you looked the spirit in the eye and told the truth.",
    echoLie: "She'll remember that you chose the lie to keep up appearances.",

    // The five endings (DESIGN.md, "Five endings"). Ending 4 has two versions.
    endings: {
      road: {
        title: "The road",
        lines: [
          narrate("You slide the paper door open, and the cold night air rushes into your lungs, like waking from a strange dream. Your breath rises as mist under the moonlight. Behind you, the door slides shut on its own."),
          narrate("The air outside has never tasted so good. But don't look back.")
        ]
      },
      table: {
        title: "The table",
        lines: [
          narrate("You step through, and you're kneeling at the low table again. The candle stands tall and whole, its flame perfectly still. The tea is still steaming."),
          host("You only just sat down… Have a little more tea.")
        ]
      },
      midnight: {
        title: "Midnight",
        lines: [
          narrate("The flame goes out. A thread of black smoke rises from the wick, and in the dark, fresh ink glistens on the ledger's page: your name, in your own handwriting."),
          host("The night is over. From now on, your story belongs to the house.")
        ]
      },
      maskGood: {
        title: "The mask",
        lines: [
          narrate("She draws her porcelain mask slightly aside. Beneath it is a sly smile, as if you're both in on the joke, and eyes that shine in the half-dark."),
          host("Three centuries without a mortal unmasking me… Go on, traveller. You've won the night.")
        ]
      },
      maskBad: {
        title: "The mask",
        lines: [
          narrate("Her mask falls to the tatami with a dry clack. Behind it there's no face, only a shadow, leaning over you."),
          host("Accusations without proof are just bedtime stories. Now sit down, and pour the tea.")
        ]
      },
      stay: {
        title: "The ledger",
        lines: [
          narrate("You sign. Your own name sits on the page in flawless calligraphy, and the steam from the tea wraps the room in a golden embrace."),
          narrate("Why go back out into the fog, when here the tea never goes cold?")
        ]
      }
    }
  },

  // Português (de Portugal) — as written in the author's own notes.
  pt: {
    name: "Português",

    ui: {
      speakerHost: "Anfitriã",
      speakerYou: "Tu",
      quoteOpen: "“",
      quoteClose: "”",
      examine: "Examinar {thing}",
      costMark: "queima 1 marca",
      costLast: "queima a última marca",
      costFreeOne: "grátis — resta 1 observação",
      costFreeMany: "grátis — restam {n} observações",
      costSuspicion: "+1 de suspeita",
      ask: "Perguntar: “{line}”",
      letGo: "Deixar passar: “{line}”",
      press: "Insistir: “{line}”",
      answer: "{label}: “{line}”",
      sitBack: "Voltar a sentar-te",
      doorIn: "Abrir a porta por onde entraste",
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
      skip: "Saltar para o conteúdo",
      navMain: "Principal",
      navHome: "Início",
      navGame: "Jogo",
      navHowTo: "Como Jogar",
      navLanguage: "Idioma",
      footer: "Um pequeno jogo de história em HTML, CSS e JavaScript simples.",

      homeTitleTag: "The Kitsune's Tea House",
      homeDescription: "Um pequeno mistério: prova que a tua anfitriã não é humana antes de a vela se apagar.",
      homeHeading: "The Kitsune's Tea House",
      homePitch: "A névoa fechou a estrada e a única luz em quilómetros é uma casa de chá. A tua anfitriã é gentil, paciente e não é bem humana. Prova-o antes de a vela se apagar — e depois escolhe a porta que te leva a casa.",
      homeEnter: "Entrar na casa de chá",
      homeHowTo: "Como jogar",

      gameTitleTag: "Jogo — The Kitsune's Tea House",
      gameHostImage: "Ilustração da anfitriã",
      gameChoices: "Escolhas",
      gameClues: "Pistas confirmadas",

      howToTitleTag: "Como Jogar — The Kitsune's Tea House",
      howToHeading: "Como Jogar",
      howToIntro: "É uma noite de névoa e abrigaste-te numa casa de chá à beira da estrada. A tua anfitriã é simpática. E também não é humana. Encontra as provas antes de a vela se apagar e depois escolhe a porta que te leva a casa.",
      howToCandleHeading: "A vela",
      howToCandleText: "A vela tem seis marcas. Examinar alguma coisa queima uma. Quando a última marca arde, é meia-noite.",
      howToTalkHeading: "Falar com ela",
      howToTalkText: "Assim que reparas em algo estranho, podes falar disso com a anfitriã. Isso é grátis — ela vai arranjar uma explicação. Depois podes deixar passar ou <strong>insistir</strong>. Insistir é como se provam as coisas, mas cada insistência deixa-a mais desconfiada — lê como ela é descrita por baixo da vela. Se forçares demasiado, ela deixa de fingir.",
      howToCluesHeading: "Pistas",
      howToCluesText: "Reparar em algo estranho não é prova. Uma pista só fica <strong>confirmada</strong> depois de a teres visto <em>e</em> de teres insistido com ela. As pistas confirmadas aparecem ao lado da cena com um ✓.",
      howToDoorsHeading: "As portas",
      howToDoorsText: "Na última marca há duas portas. Só uma leva de volta à estrada. Quantas mais pistas tiveres confirmado, mais fácil é distingui-las.",
      howToControlsHeading: "Controlos",
      howToControlsTouch: "<strong>Toque ou rato:</strong> toca numa escolha.",
      howToControlsKeyboard: "<strong>Teclado:</strong> <kbd>Tab</kbd> e <kbd>Shift</kbd>+<kbd>Tab</kbd> movem entre escolhas; <kbd>Enter</kbd> ou <kbd>Espaço</kbd> escolhe.",
      howToEnter: "Entrar na casa de chá"
    },

    marks: {
      6: {
        title: "Chegada",
        lines: [
          narrate("A névoa espessa engole completamente o caminho atrás de ti, enquanto uma luz amarelada brilha na janela de papel da casa de chá — um acolhimento que parece quase encenado."),
          host("A névoa lá fora não perdoa a ninguém até ao amanhecer… Entra, o chá já está servido.")
        ]
      },
      5: {
        title: "Acomodar-se",
        lines: [narrate("As brasas da lareira brilham com um vermelho ténue. O tempo parece abrandar. Ela ajoelha-se em silêncio à tua frente, a observar-te por cima da chávena.")]
      },
      4: {
        title: "A chuva",
        lines: [
          narrate("A chuva bate nas paredes de repente, violenta, e o mundo lá fora desaparece. A luz do candeeiro pousa no tabuleiro de laca preta e fica ali, como um espelho de água."),
          host("A tempestade chegou. Agora somos só nós e esta sala.")
        ]
      },
      3: {
        title: "Ela sai",
        lines: [
          narrate("“Vou buscar mais água,” diz ela, e fecha a porta atrás de si. Ficas sozinho… mas a chama da vela não se mexe, como se até o ar tivesse parado."),
          narrate("Um livro de visitas está aberto ao lado do jarro de água. Tens tempo apenas para examinar duas coisas antes de ela voltar.")
        ]
      },
      2: {
        title: "A pergunta dela",
        lines: [
          narrate("Ela regressa e ajoelha-se lentamente à tua frente, com os olhos fixos nos teus. A névoa do chá sobe entre vocês."),
          host("Diz-me, viajante… depois de tudo o que viste, sabes realmente com quem estás a sentar-te?")
        ]
      },
      1: {
        title: "As portas",
        lines: [
          narrate("A vela está reduzida a uma última réstia de cera, prestes a apagar-se, lançando sombras longas pelas portas de papel."),
          host("A vela está no fim… Se queres ver a luz do dia, a tua escolha tem de ser feita agora.")
        ]
      }
    },

    nudge: host("O chá não espera por ninguém… Bebe um pouco, ainda está quente."),
    doorsClear: narrate("Na porta por onde entraste, o ar está parado e estagnado. Pela porta de papel ao fundo entra uma brisa fria e húmida, com um leve aroma a pinho."),
    doorsUnclear: narrate("Duas portas de papel idênticas na penumbra. O ar está imóvel em ambas e nada te diz qual é o caminho verdadeiro."),
    ledgerOffer: narrate("Ela poisa o livro de visitas perto das portas e estende-te um pincel embebido em tinta fresca, esperando em silêncio."),
    stepsBack: narrate("Passos suaves soam no corredor lá fora, pés descalços a deslizar na madeira velha: o teu tempo acabou e ela está a chegar."),
    sitBackDown: narrate("Ajeitas as roupas e deixas-te cair de volta na almofada antes que ela te encontre de pé."),

    hotspots: {
      hearth: {
        label: "a lareira",
        text: "A luz do fogo projeta a sombra dela na parede de papel. Contas as caudas duas vezes e chegas sempre a um número diferente.",
        whileAway: "O fogo baixou. Na parede de papel, onde ela estava sentada, a sua sombra continua ajoelhada. Contas as caudas e o número volta a mudar. Depois, desvanece-se."
      },
      tea: {
        label: "o serviço de chá",
        text: "A chávena nas tuas mãos tem uma garça de asas abertas pintada. No entanto, terias jurado que era um ramo de ameixeira quando ela te serviu o chá."
      },
      window: {
        label: "a janela",
        text: "A névoa pressiona os painéis de papel, tão espessa que a luz do candeeiro morre a um palmo de distância. Algures lá fora está a estrada por onde vieste.",
        afterRain: "A chuva bate nas portadas de madeira. A janela ficou completamente negra; já não consegues ver a estrada lá fora."
      },
      scroll: {
        label: "o pergaminho",
        text: "Um pergaminho pendurado na parede: uma única e longa pincelada a imitar um caminho na montanha, e um poema demasiado gasto para ser lido. Apenas a última linha sobreviveu — “o viajante descansa; o caminho espera.”"
      },
      fan: {
        label: "o leque dela",
        text: "O leque dela repousa dobrado sobre a mesa baixa: papel simples, gasto nas hastes, pintado com uma única folha de bordo. Cheira vagamente a fumo de cedro."
      },
      tray: {
        label: "o tabuleiro de laca",
        text: "A chuva escureceu a janela, e o tabuleiro de laca reflete a luz como água parada. Nele vês a sala atrás de ti: a lareira, os pergaminhos, o teu próprio ombro — mas não vês ninguém sentado à tua frente.",
        whileAway: "O tabuleiro de laca reflete a luz como água parada. Nele vês a sala atrás de ti — e vês a anfitriã, ajoelhada à tua frente a servir chá. Mas a almofada real está vazia."
      },
      ledger: {
        label: "o livro de visitas",
        text: "Um livro de visitas aberto junto ao jarro de água. Nomes em centenas de caligrafias diferentes — a pincel, a lápis, até as letras cuidadosas de uma criança. Todas as entradas têm a data desta mesma noite. Separadas por décadas."
      }
    },

    topics: {
      shadow: {
        name: "Sombra",
        opener: "A tua sombra está estranha naquela parede.",
        deflect: "As paredes são velhas. O papel deforma a luz.",
        letGo: "Deve ser apenas do papel, sim.",
        letGoReply: "Mm. O teu chá está a arrefecer.",
        press: "O papel não se está a mexer. A tua sombra sim.",
        tell: "Ela levanta a chávena. Na parede, a sombra levantou a chávena um instante antes dela. O fogo da lareira arde com uma luz azul por um segundo.",
        reply: "…Reparas em demasiados detalhes para quem está tão cansado."
      },
      teaware: {
        name: "Chávena",
        opener: "Esta chávena… não tinha um ramo de ameixeira pintado?",
        deflect: "É um conjunto de doze, todas diferentes. E tu já vais na segunda chávena.",
        letGo: "Duas chávenas. Claro.",
        letGoReply: "Claro. Bebe fundo — a noite é longa.",
        press: "Eu só bebi uma chávena. Ainda nem a acabei.",
        tell: "O vapor que sobe da tua chávena inverte o sentido e afunda-se de volta no chá.",
        reply: "Uma, então. Os mortais são tão picuinhas com os números."
      },
      reflection: {
        name: "Reflexo",
        opener: "Eu vi uma coisa no teu tabuleiro de laca.",
        deflect: "Laca tão antiga não reflete nada com clareza. Não podes esperar que mostre toda a gente à mesa.",
        letGo: "Deve ser apenas o reflexo da chuva na janela.",
        letGoReply: "A chuva faz sempre o mundo parecer mais vazio do que realmente é.",
        press: "Eu nunca disse que faltava alguém no reflexo.",
        tell: "Por um momento, ela fica completamente imóvel — nem um fôlego. Depois sorri, com os lábios a esticarem-se um pouco demais.",
        reply: "Não disseste? Os anfitriões aprendem a adivinhar o que os convidados estão a pensar."
      },
      ledger: {
        name: "Livro de visitas",
        opener: "Eu li o teu livro de visitas.",
        deflect: "O meu registo de hóspedes. Todos os viajantes assinam antes de partir.",
        letGo: "É um livro antigo e bonito.",
        letGoReply: "Não é? Há sempre espaço para mais um nome.",
        press: "Todos os nomes têm a data de hoje. Separados por décadas.",
        tell: "Ela não olha para o livro. Olha diretamente para ti.",
        reply: "A névoa chega na mesma noite todos os anos, e os viajantes perdidos também. É assim tão estranho que eu mantenha as contas?",
        after: "Estranho, sim. Mas nada do que ela disse estava errado."
      }
    },

    suspicion: [
      "Ela está a servir o chá.",
      "Ela não pestaneja.",
      "Ela está a observar as tuas mãos.",
      "Ela deixou de fingir."
    ],

    composure: [
      null,
      "O sorriso dela congela por uma fração de segundo. Depois volta a encher a tua chávena com uma calma impecável, como se as tuas palavras fossem apenas uma brisa passageira.",
      "Ela poisa o bule na madeira da mesa com uma pancada forte e não volta a tocar-lhe. O calor no seu rosto desapareceu por completo e um silêncio pesado toma conta da sala."
    ],

    answers: {
      lie: {
        label: "Mentir",
        say: "Apenas com a dona desta casa de chá. Nada mais.",
        reply: "Com certeza. E nada mais do que isso precisa de ser dito nesta sala."
      },
      deflect: {
        label: "Desviar",
        say: "Sei apenas que serves um chá excelente… e que a noite seria muito mais fria sem ele.",
        reply: "Isso não é uma resposta, viajante… mas é uma cortesia que aprecio."
      },
      honest: {
        label: "Ser honesto",
        say: "Olhei bem para ti… e tenho a certeza de que não estou a falar com uma humana.",
        reply: "Convidados honestos são tão raros por estes lados… O ar da montanha costuma trazer mais fingimento."
      }
    },

    echoHonest: "Ela vai lembrar-se de que olhaste nos olhos do espírito e disseste a verdade.",
    echoLie: "Ela vai lembrar-se de que escolheste a mentira para manter as aparências.",

    endings: {
      road: {
        title: "A estrada",
        lines: [
          narrate("Abres a porta de papel e o ar frio da noite entra-te nos pulmões, como quem acorda de um sonho estranho. O vapor da tua respiração sobe sob a luz da lua. Atrás de ti, a porta fecha-se sozinha."),
          narrate("O ar lá fora nunca soube tão bem, mas não olhes para trás.")
        ]
      },
      table: {
        title: "A mesa",
        lines: [
          narrate("Atravessas a porta — e estás outra vez ajoelhado à mesa baixa. A vela está alta e intacta, com a chama perfeitamente imóvel. O chá ainda deita fumo."),
          host("Ainda agora aqui te sentaste… Toma mais um pouco de chá.")
        ]
      },
      midnight: {
        title: "Meia-noite",
        lines: [
          narrate("A chama apaga-se. Um rasto de fumo preto sobe do pavio e, no escuro, tinta fresca brilha na página do livro de visitas: o teu nome, com a tua própria caligrafia."),
          host("A noite acabou. A partir de agora, a tua história pertence à casa.")
        ]
      },
      maskGood: {
        title: "A máscara",
        lines: [
          narrate("Ela afasta ligeiramente a máscara de porcelana. Por baixo há um sorriso astuto, como se estivessem os dois na mesma brincadeira, e olhos que brilham na penumbra."),
          host("Três séculos sem que um mortal me desmascarasse… Passa, viajante. Ganhaste a noite.")
        ]
      },
      maskBad: {
        title: "A máscara",
        lines: [
          narrate("A máscara cai no chão de tatami com um som seco. Por trás dela não há rosto, apenas uma sombra que se inclina sobre ti."),
          host("Acusações sem provas são apenas histórias de embalar. Agora senta-te e serve o chá.")
        ]
      },
      stay: {
        title: "O livro de visitas",
        lines: [
          narrate("Assinas. O teu próprio nome fica na página com uma caligrafia impecável, enquanto o fumo do chá envolve a sala num abraço dourado."),
          narrate("Para quê voltar para a névoa lá fora, quando aqui o chá nunca arrefece?")
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
      costFreeOne: "gratis — queda 1 observación",
      costFreeMany: "gratis — quedan {n} observaciones",
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
      gameChoices: "Opciones",
      gameClues: "Pistas confirmadas",

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

    echoHonest: "Recordará que miraste al espíritu a los ojos y dijiste la verdad.",
    echoLie: "Recordará que elegiste la mentira para guardar las apariencias.",

    endings: {
      road: {
        title: "El camino",
        lines: [
          narrate("Abres la puerta de papel y el aire frío de la noche te entra en los pulmones, como quien despierta de un sueño extraño. Tu aliento sube como vaho bajo la luz de la luna. A tus espaldas, la puerta se cierra sola."),
          narrate("El aire de fuera nunca supo tan bien. Pero no mires atrás.")
        ]
      },
      table: {
        title: "La mesa",
        lines: [
          narrate("Cruzas la puerta… y estás otra vez arrodillado a la mesa baja. La vela está alta y entera, con la llama perfectamente quieta. El té sigue humeando."),
          host("Si acabas de sentarte… Toma un poco más de té.")
        ]
      },
      midnight: {
        title: "Medianoche",
        lines: [
          narrate("La llama se apaga. Un hilo de humo negro sube del pabilo y, en la oscuridad, la tinta fresca brilla en la página del libro de visitas: tu nombre, con tu propia letra."),
          host("La noche ha terminado. A partir de ahora, tu historia pertenece a la casa.")
        ]
      },
      maskGood: {
        title: "La máscara",
        lines: [
          narrate("Aparta ligeramente su máscara de porcelana. Debajo hay una sonrisa astuta, como si los dos estuvierais en el mismo chiste, y unos ojos que brillan en la penumbra."),
          host("Tres siglos sin que un mortal me desenmascarara… Pasa, viajero. Te has ganado la noche.")
        ]
      },
      maskBad: {
        title: "La máscara",
        lines: [
          narrate("Su máscara cae sobre el tatami con un chasquido seco. Detrás no hay rostro, solo una sombra que se inclina sobre ti."),
          host("Las acusaciones sin pruebas son solo cuentos para dormir. Ahora siéntate y sirve el té.")
        ]
      },
      stay: {
        title: "El libro de visitas",
        lines: [
          narrate("Firmas. Tu propio nombre queda en la página con una caligrafía impecable, mientras el vapor del té envuelve la sala en un abrazo dorado."),
          narrate("¿Para qué volver a la niebla de fuera, si aquí el té nunca se enfría?")
        ]
      }
    }
  }
};
