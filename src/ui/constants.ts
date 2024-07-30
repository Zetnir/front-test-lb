import { Province } from '../app/models/Province';

export const ROUTES = {
  ROUTER_PATH: `/:dataSet?/:viewType?/:date?`,
};

type ProvinceName = {
  name: string;
  sort: string;
};

export const PROVINCES_NAMES: Record<Province['code'], ProvinceName> = {
  AB: { name: 'Alberta', sort: 'alberta' },
  BC: { name: 'Colombie-Britannique', sort: 'colombie-britannique' },
  MB: { name: 'Manitoba', sort: 'manitoba' },
  NB: { name: 'Nouveau-Brunswick', sort: 'nouveau-brunswick' },
  NL: { name: 'Terre-Neuve-et-Labrador', sort: 'terre-neuve-et-labrador' },
  NS: { name: 'Nouvelle-Écosse', sort: 'nouvelle-ecosse' },
  NU: { name: 'Nunavut', sort: 'nunavut' },
  NT: { name: 'Territoires du Nord-Ouest', sort: 'territoires du nord-ouest' },
  ON: { name: 'Ontario', sort: 'ontario' },
  PE: { name: 'Île-du-Prince-Édouard', sort: 'ile-du-prince-edouard' },
  QC: { name: 'Québec', sort: 'quebec' },
  RP: { name: 'Citoyens à l’étranger', sort: 'z' },
  SK: { name: 'Saskatchewan', sort: 'saskatchewan' },
  YT: { name: 'Yukon', sort: 'yukon' },
};

export type textData = {
  x: string;
  y: string;
  fontSize: string;
  fontWeight: string;
  textAnchor: string;
}

export type lineData = {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  style: string;
}

export type ProvinceMapData = {
  code: string;
  text: textData;
  value: textData;
  fill: string;
  line?: lineData;
}

export const PROVINCES_MAP_DATA: Array<ProvinceMapData> = [
  {
    code: 'AB',
    text: {
      x: '-12000',
      y: '4000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-12000',
      y: '5500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'BC',
    text: {
      x: '-18000',
      y: '2000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-18000',
      y: '3500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'MB',
    text: {
      x: '-1500',
      y: '4500',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-1500',
      y: '6000',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'NB',
    text: {
      x: '20000',
      y: '13500',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '20000',
      y: '15000',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    line: {
      x1: '21500',
      x2: '20500',
      y1: '11000',
      y2: '12000',
      style: 'stroke:rgb(80, 80, 100);stroke-width:100',
    },
    fill: 'rgb(80,80,100)',
  },
  {
    code: 'NL',
    text: {
      x: '25500',
      y: '-2000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '25500',
      y: '-500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    line: {
      x1: '22000',
      x2: '24000',
      y1: '0',
      y2: '-2000',
      style: 'stroke:rgb(80, 80, 100);stroke-width:100',
    },
    fill: 'rgb(80,80,100)',
  },
  {
    code: 'NS',
    text: {
      x: '26000',
      y: '14000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '26000',
      y: '15500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    line: {
      x1: '23500',
      x2: '24500',
      y1: '12000',
      y2: '13000',
      style: 'stroke:rgb(80, 80, 100);stroke-width:100',
    },
    fill: 'rgb(80,80,100)',
  },
  {
    code: 'NU',
    text: {
      x: '-1000',
      y: '-4000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-1000',
      y: '-2500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'NT',
    text: {
      x: '-12000',
      y: '-6000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-12000',
      y: '-4500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'ON',
    text: {
      x: '5000',
      y: '8500',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '5000',
      y: '10000',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'PE',
    text: {
      x: '27000',
      y: '7000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '27000',
      y: '8500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    line: {
      x1: '23500',
      x2: '25500',
      y1: '9000',
      y2: '7000',
      style: 'stroke:rgb(80, 80, 100);stroke-width:100',
    },
    fill: 'rgb(80,80,100)',
  },
  {
    code: 'QC',
    text: {
      x: '14000',
      y: '6000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '14000',
      y: '7500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'SK',
    text: {
      x: '-7000',
      y: '5000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-7000',
      y: '6500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
  {
    code: 'YT',
    text: {
      x: '-19000',
      y: '-9000',
      fontSize: '1200',
      fontWeight: '600',
      textAnchor: 'middle',
    },
    value: {
      x: '-19000',
      y: '-7500',
      fontSize: '1200',
      fontWeight: '300',
      textAnchor: 'middle',
    },
    fill: 'rgb(255,255,255)',
  },
];

export const API_BASE_URL: string = 'https://api.opencovid.ca/';
