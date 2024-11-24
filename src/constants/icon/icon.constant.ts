import dohod from "./assets/Dohod.svg";
import dosug from "./assets/Dosug.svg";
import kafe from "./assets/Kafe.svg";
import podarki from "./assets/Podarki.svg";
import pokupki from "./assets/Pokupki.svg";
import produkt from "./assets/Produkt.svg";
import semia from "./assets/Semia.svg";
import transport from "./assets/Transport.svg";
import zdorovie from "./assets/Zdorovie.svg";

export type RIconConstant = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
};

export const RIconConstants: RIconConstant[] = [
  { id: "dohod", image: dohod },
  { id: "dosug", image: dosug },
  { id: "kafe", image: kafe },
  { id: "podarki", image: podarki },
  { id: "pokupki", image: pokupki },
  { id: "produkt", image: produkt },
  { id: "semia", image: semia },
  { id: "transport", image: transport },
  { id: "zdorovie", image: zdorovie },
];
