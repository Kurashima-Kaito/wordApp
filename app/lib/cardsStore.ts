import AsyncStorage from '@react-native-async-storage/async-storage';

export type Card = {
  front: string;
  back: string;
  memo: string;
  lastEdited: string;
  memorizationLevel: number;
};

export type Folder = {
  name: string;
  folders: Folder[];
  cards: Card[];
};

const STORAGE_KEY = 'cards_data';

const initialCardsData: Folder[] = [
  {
    name: "英単語English",
    folders: [
      {
        name: "偽犬1900(青)",
        folders: [
          { name: "犬1900, 100~200", folders: [], cards: [
            { front: "kakka", back: "うんこ", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
          ] },
        ],
        cards: []
      },
      { name: "犬1200(黄)", folders: [], cards: [
        { front: "achieve", back: "を達成する", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
        { front: "improve", back: "を向上させる", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 1000 },
        { front: "environment", back: "環境", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 2000 },
        { front: "challenge", back: "に挑戦する", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 3000 },
        { front: "common", back: "共通の、一般的な", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 4000 },
        { front: "develop", back: "を開発する、発達する", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 5000 },
        { front: "necessary", back: "必要な", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 6000 },
        { front: "provide", back: "を提供する", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 7000 },
        { front: "respect", back: "を尊敬する", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 8000 },
        { front: "value", back: "価値", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 9000 },
      ] },
    ],
    cards: [
      { front: "Bráðum", back: "もうすぐ", memo: "アイスランド語単語 1900", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
      { front: "Lohikeittö", back: "サーモンスープ", memo: "フィンランド語単語 1900", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
      { front: "Ambiguous", back: "曖昧な\n二通りの解釈が\nでき\nる", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
      { front: "ᐃᖅᑲᓇᐃᔭᖅとქართულიとεγόとДавайとՍպانախとབོད་ཀེད།と사람とမြန်မာ", back: "仕事とジョージアと私としようとほうれん草とチベット語と人とミャンマー", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
    ]
  },
  {
    name: "仏単語Français",
    folders: [],
    cards: [
      { front: "jamais", back: "ever, never", memo: "じゃめ", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
      { front: "vouloir", back: "want", memo: "ぶろわ", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 },
    ]
  },
  {
    name: "長いやつWindows",
    folders: [],
    cards: [
        { front: "[Pre-Chorus]\nEr du hypp på å göra no\' ulovlig?\nJeg vil ha deg over meg til morgengry\nDama ville rulle i Ferrari\nSå nå ruller hun med meg\n\n[Verse 1]\nSå mange damer her, men tiden går så fort\nAlle her i byen vet hva jeg har gjort (Har gjort)\nHun liker fuckboys ha\'kke noe i mot\nAt alle her i byen vet hva jeg har gjort\nO-oh, baby jeg lover deg, i natt, i natt\nSå oh, ligger du over meg, meg, meg\n\n[Pre-Chorus]\nOg hun sa \"er du hypp på å göra no\' ulovlig?\"\nJeg vil ha deg over meg til morgengry\nDama ville rulle i Ferrari\nSå nå ruller hun med meg\n\n[Chorus]\nDama sa hei, jeg snudde min vei\nOg jeg har vært på deg og deg og deg og deg og deg\nJeg husker du sa da jeg måtte dra\nNå er det bare deg og meg og meg og meg og meg\n\n[Pre-Chorus]\n\n[Pre-Chorus]\n\n[Verse 1]\nSå mye penger her, men tiden går så fort\nAlle her i byen vet hva jeg har gjort (Har gjort)\nHun liker fuckboys ha\'kke noe i mot\nAt alle her i byen vet hva jeg har gjort\nO-oh, baby jeg lover deg, i natt, i natt\nSå oh, ligger du over meg, meg, meg\n\n[Pre-Chorus]\n\n[Chorus]", back: "ulovlig", memo: "", lastEdited: "2024-01-01T00:00:00.000Z", memorizationLevel: 0 }
      ]
  }
];

let cardsData: Folder[] = initialCardsData;

// データを保存する
export async function saveCardsData(): Promise<void> {
  try {
    const jsonValue = JSON.stringify(cardsData);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save cards data', e);
  }
}

// データを読み込む
export async function loadCardsData(): Promise<Folder[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue !== null) {
      cardsData = JSON.parse(jsonValue);
    }
    return cardsData;
  } catch (e) {
    console.error('Failed to load cards data', e);
    return cardsData;
  }
}

export function getCardsData(): Folder[] {
  return cardsData;
}

// データを初期状態にリセットする
export async function resetCardsData(): Promise<void> {
  cardsData = JSON.parse(JSON.stringify(initialCardsData));
  await saveCardsData();
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
      saveCardsData(); // 非同期で保存を開始
      return true;
    }
    currentData = folder.folders;
  }
  return false;
}
