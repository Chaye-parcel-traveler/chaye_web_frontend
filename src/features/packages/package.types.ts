export type PackageDraft = {
  arrivingAt: string;
  departingFrom: string;
  description: string;
  id?: number;
  packageDepthCm: number;
  packageHeightCm: number;
  packageWeightKg: number;
  packageWidthCm: number;
  price: number;
  shippingLimitDate: string;
};
