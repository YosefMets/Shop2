import {useAppStore} from "~/stores/appStore";

export default (dir) => {
  const { db, activeGroup, scopedItems } = storeToRefs( useAppStore() );

  const items = dir?.items || scopedItems.value;
  if (!dir) dir = activeGroup.value;

  if (!dir?.X) return null;

  let allKeywords = items.flatMap( item => {
    return Object.keys(dir.X)?.map(char => dir.X[char]?.K ? char + '=' + item[char] : null).filter( a => a );
  });

  allKeywords = Array.from( new Set( allKeywords ) )?.map( val => {
    const [c, v] = val.split('=');
    return { char: c, value: v }
  });

  return allKeywords
      .filter( ({ char }) => !(allKeywords.filter( charValue => charValue.char === char ).length === 1))
      .sort( (a, b) => (db.value?.[b.value]?.U || 0) - (db.value?.[a.value]?.U || 0) );
}