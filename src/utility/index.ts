import * as apiType from 'src/types/api';

export const getPriceRangeFromModels:(models:apiType.IProductResponse['models'])=>string = models => {
    const prices = models.map(x => x.price);
    const [max, min] = [Math.max(...prices), Math.min(...prices)];
    return `NT ${max === min ? max : `${min}~${max}`}`;
};
