export type Card = {
  front: string;
  back: string;
  memo: string;
};

export type Folder = {
  name: string;
  folders: Folder[];
  cards: Card[];
};

const initialCardsData: Folder[] = [
  {
    name: "英単語English",
    folders: [
      {
        name: "偽犬1900(青)",
        folders: [
          { name: "犬1900, 100~200", folders: [], cards: [
            { front: "kakka", back: "うんこ", memo: "" },
          ] },
        ],
        cards: []
      },
      { name: "犬1200(黄)", folders: [], cards: [] },
    ],
    cards: [
      { front: "Bráðum", back: "もうすぐ", memo: "アイスランド語単語 1900" },
      { front: "Lohikeittö", back: "サーモンスープ", memo: "フィンランド語単語 1900" },
      { front: "Ambiguous", back: "曖昧な\n二通りの解釈が\nでき\nる", memo: "" },
      { front: "ᐃᖅᑲᓇᐃᔭᖅとქართულიとεγόとДавайとՍպանախとབོད་ཀེད།と사람とမြန်မာ", back: "仕事とジョージアと私としようとほうれん草とチベット語と人とミャンマー", memo: "" },
    ]
  },
  {
    name: "仏単語Français",
    folders: [],
    cards: [
      { front: "jamais", back: "ever, never", memo: "じゃめ" },
      { front: "vouloir", back: "want", memo: "ぶろわ" },
    ]
  },
  {
    name: "長いやつWindows",
    folders: [],
    cards: [
        { front: "[Pre-Chorus]\nEr du hypp på å gjøre no\' ulovlig?\nJeg vil ha deg over meg til morgengry\nDama ville rulle i Ferrari\nSå nå ruller hun med meg\n\n[Verse 1]\nSå mange damer her, men tiden går så fort\nAlle her i byen vet hva jeg har gjort (Har gjort)\nHun liker fuckboys ha\'kke noe i mot\nAt alle her i byen vet hva jeg har gjort\nO-oh, baby jeg lover deg, i natt, i natt\nSå oh, ligger du over meg, meg, meg\n\n[Pre-Chorus]\nOg hun sa \"er du hypp på å gjøre no\' ulovlig?\"\nJeg vil ha deg over meg til morgengry\nDama ville rulle i Ferrari\nSå nå ruller hun med meg\n\n[Chorus]\nDama sa hei, jeg snudde min vei\nOg jeg har vært på deg og deg og deg og deg og deg\nJeg husker du sa da jeg måtte dra\nNå er det bare deg og meg og meg og meg og meg\n\n[Pre-Chorus]\n\n[Pre-Chorus]\n\n[Verse 2]\nSå mye penger her, men tiden går så fort\nAlle her i byen vet hva jeg har gjort (Har gjort)\nHun liker fuckboys ha\'kke noe i mot\nAt alle her i byen vet hva jeg har gjort\nO-oh, baby jeg lover deg, i natt, i natt\nSå oh, ligger du over meg, meg, meg\n\n[Pre-Chorus]\n\n[Chorus]", back: "ulovlig", memo: "" }
    ]
  }
];

let cardsData: Folder[] = initialCardsData;

export function getCardsData(): Folder[] {
  return cardsData;
}

//現在のフォルダに入っているデータを取得
export function findCurrentFoldersData(currentFolder: string[], data: Folder[]): Folder[] {
  let currentData = data;
  for (const folderName of currentFolder) {
    const folder = currentData.find((f): f is Folder => f.name === folderName);
    if (!folder) return [];
    currentData = folder.folders;
  }
  return currentData;
}

//現在のフォルダに入っているカードを取得
export function findCurrentCardsData(currentFolder: string[], data: Folder[]): Card[] {
  let currentData = data;
  let index = 0;
  for (const folderName of currentFolder) {
    const folder = currentData.find((f): f is Folder => f.name === folderName);
    if (!folder) return [];
    if (index === currentFolder.length - 1) return folder.cards;
    currentData = folder.folders;
    index++;
  }
  return [];
}

export function createFolderList(data: Folder[]): string[] {
  return data.map((item) => item.name);
}

//カードをindexで取得する
export function getCard(folderPath: string[], cardIndex: number): Card | undefined {
  const cards = findCurrentCardsData(folderPath, cardsData);
  return cards[cardIndex];
}

//カードを更新する
export function updateCard(folderPath: string[], cardIndex: number, updatedCard: Card): boolean {
  let currentData = cardsData;
  for (const folderName of folderPath) {
    const folder = currentData.find((f): f is Folder => f.name === folderName);
    if (!folder) return false;
    if (folderName === folderPath[folderPath.length - 1]) {
      if (!folder.cards[cardIndex]) return false;
      folder.cards[cardIndex] = updatedCard;
      return true;
    }
    currentData = folder.folders;
  }
  return false;
}
