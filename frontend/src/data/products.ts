import tree from "@/assets/product-tree.jpg";
import flower from "@/assets/product-flower.jpg";
import grass from "@/assets/product-grass.jpg";
import soil from "@/assets/product-soil.jpg";

export type Category = "Trees" | "Flowers" | "Grass" | "Soil";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  blurb: string;
}

export const products: Product[] = [
  { id: "t1", name: "Mediterranean Olive", category: "Trees", price: 89, image: tree, blurb: "Timeless silver-leafed sapling, ready to root." },
  { id: "t2", name: "Japanese Maple", category: "Trees", price: 124, image: tree, blurb: "Crimson canopy that turns gardens into poetry." },
  { id: "f1", name: "Heirloom Peonies", category: "Flowers", price: 34, image: flower, blurb: "Lush, fragrant blooms in soft blush." },
  { id: "f2", name: "Wild Cottage Mix", category: "Flowers", price: 28, image: flower, blurb: "A meadow in a pot — daisies, asters & more." },
  { id: "g1", name: "Emerald Sod Roll", category: "Grass", price: 18, image: grass, blurb: "Premium turf, 1m² of instant lawn." },
  { id: "g2", name: "Drought-Proof Fescue", category: "Grass", price: 22, image: grass, blurb: "Soft underfoot, sips water." },
  { id: "s1", name: "Living Loam", category: "Soil", price: 14, image: soil, blurb: "Compost-rich blend bursting with microbes." },
  { id: "s2", name: "Bonsai Mineral Mix", category: "Soil", price: 19, image: soil, blurb: "Free-draining grit for fussy roots." },
];

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "design",
    title: "Garden Design",
    price: "from $480",
    description: "A bespoke planting plan crafted around your light, soil, and life.",
    features: ["Site survey", "3D mood board", "Plant palette", "Sourcing list"],
  },
  {
    id: "install",
    title: "Planting & Install",
    price: "from $1,200",
    description: "Our crew preps the ground and plants every root with care.",
    features: ["Soil amendment", "Tree & shrub planting", "Mulching", "30-day check-in"],
  },
  {
    id: "care",
    title: "Seasonal Care",
    price: "from $95 / visit",
    description: "Keep things thriving with monthly pruning, feeding, and lawn care.",
    features: ["Pruning", "Fertilising", "Lawn mowing", "Pest watch"],
  },
];
