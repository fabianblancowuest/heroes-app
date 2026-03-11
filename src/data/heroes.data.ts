import { Hero } from 'src/heroes/entities/hero.entity';
import { charactersOne } from './characters_one.data';
import { charactersTwo } from './characters_two.data';
import { moreVillains } from './more_villains.data';
import { moreAntiheroes } from './more_antiheroes.data';
import { moreHeroes } from './more_heroes.data';

export const heroesData: Hero[] = [
  ...charactersOne,
  ...charactersTwo,
  ...moreVillains,
  ...moreAntiheroes,
  ...moreHeroes,
];
