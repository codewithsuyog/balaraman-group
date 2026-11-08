// Research themes for /research, grouped by chemistry. Every independent-career paper that fits a theme
// is listed once (IDs from publications_master.ts). Paragraphs only claim what these papers' titles show.
// Left out on purpose: Tau/Alzheimer's (64, 66, 67), drug syntheses (101, 119), and 30, 70, 87 (fit no theme).
// [48] duplicates [47], so only 47 is listed.
import type { MoleculeName } from '@/components/Molecule';

export type Tile = { sym: string; num?: number };

export type ResearchTheme = {
  id: string;
  title: string;
  summary: string; // one line for the home page
  text: string;
  molecule: MoleculeName;
  tiles: Tile[];
  selected: number[];
  papers: number[];
};

const Mn = { sym: 'Mn', num: 25 }, Fe = { sym: 'Fe', num: 26 }, Co = { sym: 'Co', num: 27 }, Ni = { sym: 'Ni', num: 28 };
const Cu = { sym: 'Cu', num: 29 }, Ru = { sym: 'Ru', num: 44 }, Rh = { sym: 'Rh', num: 45 }, Pd = { sym: 'Pd', num: 46 };

export const researchThemes: ResearchTheme[] = [
  {
    id: 'dehydrogenation',
    title: 'Acceptorless dehydrogenative coupling',
    summary: 'Alcohols coupled into amides, imines, olefins and N-heterocycles, releasing H₂.',
    text: 'Acceptorless dehydrogenation removes hydrogen from alcohols and amines and releases it as H₂, so no oxidant is needed. With manganese, iron, cobalt and nickel catalysts, many of them pincer complexes, we couple alcohols into amides, imines, olefins and branched ketones, and build N-heterocycles such as indoles, quinoxalines and quinazolines, releasing hydrogen gas instead of stoichiometric waste.',
    molecule: 'benzylAlcohol',
    tiles: [Mn, Fe, Co, Ni],
    selected: [118, 107, 69, 55],
    papers: [118, 112, 111, 107, 105, 99, 97, 91, 90, 86, 84, 82, 80, 71, 69, 68, 62, 61, 55, 54, 51, 39, 34],
  },
  {
    id: 'borrowing-hydrogen',
    title: 'Borrowing hydrogen',
    summary: 'Alcohols as alkylating agents for amines and C–H bonds, with water as the by-product.',
    text: 'In borrowing hydrogen, the catalyst takes hydrogen from an alcohol, lets the carbonyl it forms react, then returns the hydrogen, so alcohols act as alkylating agents and water is the by-product. We use it for N-alkylation of amines and anilines, mono-amination of 1,2-diols to amino alcohols, and C-alkylation of amides, esters, oxindoles, indoles and secondary alcohols.',
    molecule: 'propanediol',
    tiles: [Mn, Co, Ni],
    selected: [117, 65, 81, 102],
    papers: [117, 110, 104, 103, 102, 95, 81, 79, 78, 65, 59, 57, 52, 40, 29],
  },
  {
    id: 'hydrogen-methanol',
    title: 'Hydrogenation, methanol and hydrogen storage',
    summary: 'Methanol as a C1 and hydrogen source, selective hydrogenation, and hydrogen storage.',
    text: 'Methanol can be a fuel, a hydrogen carrier and a one-carbon building block. We use it for N-methylation and methoxymethylation of amides, transfer hydrogenation and deuteration, and to make dimethoxymethane and other acetals. We also carry out selective hydrogenations (Z-selective semihydrogenation of alkynes, hydrogenation of amides, and semihydrogenation of azoarenes with H₂), and study hydrogen storage and release, from paraformaldehyde–methanol mixtures to methane.',
    molecule: 'methanol',
    tiles: [Mn, Co, Ni, Ru],
    selected: [98, 114, 113, 47],
    papers: [116, 114, 113, 108, 100, 98, 94, 92, 89, 83, 75, 74, 63, 47, 37],
  },
  {
    id: 'heterogeneous',
    title: 'Heterogeneous catalysis and upcycling',
    summary: 'Reusable nanocatalysts, and co-pyrolysis of biomass with plastics.',
    text: 'Solid catalysts can be separated and reused. We make iron, cobalt and manganese nanocatalysts, nitrogen-modified cobalt nanoparticles on graphene, palladium nanoparticles inside covalent organic frameworks, and polyoxometalate catalysts for dehydrogenation, hydrogenation, amination and coupling reactions. We also turn waste into value: catalytic co-pyrolysis of biomass with plastics gives aromatics, light olefins and linear α-olefins.',
    molecule: 'tetrahydroquinoline',
    tiles: [Fe, Co, Pd],
    selected: [44, 106, 60, 72],
    papers: [115, 106, 96, 93, 85, 77, 76, 73, 72, 60, 46, 44],
  },
  {
    id: 'light',
    title: 'Light-driven catalysis',
    summary: 'Photoredox catalysts and photoactive frameworks for dehydrogenation, isomerization and solar H₂.',
    text: 'Visible light can drive reactions at room temperature. We use photocatalysis for the oxidative dehydrogenation of N-heterocycles, the acceptorless dehydrogenation of diaryl hydrazines and the trifluoromethylation of β-nitroalkenes, and build photoactive materials: a triazine covalent organic framework for E–Z isomerization of olefins, metal–organic frameworks for solar hydrogen production, and a carbonaceous polymeric photocatalyst.',
    molecule: 'stilbene',
    tiles: [{ sym: 'hν' }, Cu],
    selected: [58, 53, 43, 50],
    papers: [58, 53, 50, 49, 45, 43, 41],
  },
  {
    id: 'ch-activation',
    title: 'C–H activation',
    summary: 'Co, Ni, Pd and Rh catalysts that turn C–H bonds directly into new bonds.',
    text: 'Turning C–H bonds directly into new bonds avoids pre-functionalized starting materials. We have developed cobalt-, nickel-, palladium- and rhodium-catalysed C(sp²)–H alkynylation, arylation, N-vinylation and carbonylation, and C(sp³)–H alkynylation and arylation, including the functionalization of fluorene with alcohols.',
    molecule: 'allylbenzene',
    tiles: [Co, Ni, Pd, Rh],
    selected: [31, 35, 109, 42],
    papers: [109, 88, 56, 42, 38, 36, 35, 33, 31, 28],
  },
];
