import pitomci from "./assets/paw.svg";
import dosug from "./assets/Dosug.svg";
import kafe from "./assets/Kafe.svg";
import podarki from "./assets/Podarki.svg";
import pokupki from "./assets/Pokupki.svg";
import produkt from "./assets/Produkt.svg";
import semia from "./assets/Semia.svg";
import transport from "./assets/Transport.svg";
import zdorovie from "./assets/Zdorovie.svg";

export interface IconData {
  id: number;
  name: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svg: any;
}

export const icons: IconData[] = [
  {
    id: 0,
    name: "Подарки",
    color: "--color-pink",
    svg: podarki,
  },
  {
    id: 1,
    name: "Транспорт",
    color: "--color-transport",
    svg: transport,
  },
  {
    id: 2,
    name: "Продукты",
    color: "--color-receipt",
    svg: produkt,
  },
  {
    id: 3,
    name: "Семья",
    color: "--color-family",
    svg: semia,
  },
  {
    id: 4,
    name: "Здоровье",
    color: "--color-heart",
    svg: zdorovie,
  },
  {
    id: 5,
    name: "Кафе",
    color: "--color-food",
    svg: kafe,
  },
  {
    id: 6,
    name: "Досуг",
    color: "--color-puzzle",
    svg: dosug,
  },
  {
    id: 7,
    name: "Покупки",
    color: "--color-purchase",
    svg: pokupki,
  },
  {
    id: 8,
    name: "Питомцы",
    color: "--color-orange",
    svg: pitomci,
  },
];
