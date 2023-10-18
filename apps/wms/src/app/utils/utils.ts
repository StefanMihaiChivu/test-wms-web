import { Item } from '../core/models';

export const groupItemsByCategory = (items: Item[]) => {
  return items.reduce((group: { [key: string]: Item[] }, item) => {
    if (!group[item.category]) {
      group[item.category] = [];
    }
    group[item.category].push(item);
    return group;
  }, {});
};
