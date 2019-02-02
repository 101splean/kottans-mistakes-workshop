let peoples = [];
let drawResult = null;

const FILTER_INPUT_NAME = 'gender';
const SORT_INPUT_NAME = 'order';

let state = {
  sortMassBy: 'descending',
  filterGenderBy: 'all',
};

const getDatasetValue = (elements, key) => {
  const checked = Array.from(elements).find(({ checked }) => checked);

  return checked.dataset[key];
};

export const sortPeoples = peoples => {
  const sliced = peoples.slice();
  const runSorting = (a, b) => a.mass - b.mass;

  if (state.sortMassBy === 'descending') {
    sliced.sort(runSorting);
  } else {
    sliced.sort((a, b) => runSorting(b, a));
  }

  return sliced;
};

export const filterPeoples = peoples =>
  state.filterGenderBy !== 'all'
    ? peoples.filter(({ gender }) => gender === state.filterGenderBy)
    : peoples;

const formListener = ({ currentTarget }) => {
  const { elements } = currentTarget;

  state = {
    sortMassBy: getDatasetValue(elements.mass, SORT_INPUT_NAME),
    filterGenderBy: getDatasetValue(elements.gender, FILTER_INPUT_NAME),
  };

  const sorted = sortPeoples(peoples);
  const filtered = filterPeoples(sorted);

  drawResult(filtered);
};

export default (initData, drawer) => {
  peoples = initData;
  drawResult = drawer;

  return formListener;
};
