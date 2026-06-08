'use client';

import React from 'react';

/**
 * Renders text with proper chemical subscripts/superscripts.
 * 
 * Handles:
 *   - Chemical formulas: H2, CO2, H2O, CH4, NH3, SiO2, Cu2O, Fe3O4, NaBH4, Al2O3, etc.
 *   - Orbital notation: C(sp2), C(sp3)
 *   - Variable groups: R1, R2, R3, etc.
 *   - Chemical group abbreviations: tBu2, Me2, Et2, etc.
 *   - Roman numeral oxidation states: Mn(I), Co(II)
 */

function processChemText(text: string): React.ReactNode[] {
  if (!text) return [];

  // 1. Separate the DOI/URL section to avoid formatting digits in URLs/DOIs
  const textLower = text.toLowerCase();
  let doiIdx = -1;
  const markers = ["doi:", "https://doi.org/", "http://doi.org/", "doi.org/"];
  for (const marker of markers) {
    const idx = textLower.indexOf(marker);
    if (idx !== -1) {
      doiIdx = idx;
      break;
    }
  }

  let mainText = text;
  let doiPart = "";
  if (doiIdx !== -1) {
    mainText = text.substring(0, doiIdx);
    doiPart = text.substring(doiIdx);
  }

  const result: React.ReactNode[] = [];
  let keyIdx = 0;

  // Master pattern - case sensitive
  const masterPattern = /C\(sp([23])\)|((?:tBu|Me|Et|Pr|Ph|Bu|Ac|Cp|Ar|NaBH|HClO|HZSM|CH|CO|Cl|Br|Na|Li|Ca|Mg|Al|Si|Ti|Mn|Fe|Co|Ni|Cu|Zn|Pd|Ru|Rh|Ir|Pt|Ce|Zr|Mo|H|C|N|O|S|P|B|F|I|R)(?=[0-9]))(\d+)/g;

  // Element letters set for checking next characters to identify chemical formulas
  const elementLetters = new Set("HCNOsSPBFIiAlMgCaTiMnFeCoNiCuZnPdRuRhIrPtCeZrMo");

  let match: RegExpExecArray | null;
  let lastIdx = 0;

  while ((match = masterPattern.exec(mainText)) !== null) {
    const matchIndex = match.index;
    const matchLength = match[0].length;

    let skip = false;

    if (match[1] !== undefined) {
      // C(sp2) or C(sp3) — always format
    } else if (match[2] !== undefined && match[3] !== undefined) {
      const sym = match[2];
      const numStr = match[3];

      // Rule A: Do not subscript a single '1' unless it's a variable R group
      if (sym !== 'R' && numStr === '1') {
        skip = true;
      }

      // Rule B: If symbol is 'C' and it is followed by a single digit
      if (sym === 'C' && numStr.length === 1) {
        const nextCharIdx = matchIndex + matchLength;
        const nextChar = nextCharIdx < mainText.length ? mainText[nextCharIdx] : "";
        if (nextChar && elementLetters.has(nextChar)) {
          // Valid chemical formula prefix (e.g. C2H2)
        } else {
          skip = true; // Likely carbon position (e.g. C2-symmetric, C5-alkynylation)
        }
      }

      // Rule C: If symbol is 'N' and it is followed by a single digit
      if (sym === 'N' && numStr.length === 1) {
        const nextCharIdx = matchIndex + matchLength;
        const nextChar = nextCharIdx < mainText.length ? mainText[nextCharIdx] : "";
        const isFollowedByElem = nextChar && elementLetters.has(nextChar);
        if (numStr === '2' || isFollowedByElem) {
          // Valid (e.g. N2 gas)
        } else {
          skip = true; // Likely nitrogen position (e.g. N9, N1)
        }
      }
    }

    if (skip) {
      continue;
    }

    // Add text before this match
    if (matchIndex > lastIdx) {
      result.push(mainText.slice(lastIdx, matchIndex));
    }

    if (match[1] !== undefined) {
      // C(sp2) or C(sp3) — superscript the number
      result.push(
        <span key={keyIdx++}>C(sp<sup>{match[1]}</sup>)</span>
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      // Chemical formula — subscript the number
      result.push(
        <span key={keyIdx++}>{match[2]}<sub>{match[3]}</sub></span>
      );
    }

    lastIdx = matchIndex + matchLength;
  }

  // Add remaining text of mainText
  if (lastIdx < mainText.length) {
    result.push(mainText.slice(lastIdx));
  }

  // Append DOI part as plain text
  if (doiPart) {
    result.push(doiPart);
  }

  return result.length > 0 ? result : [text];
}

interface ChemTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ChemText({ text, className, as: Tag = 'span' }: ChemTextProps) {
  const rendered = processChemText(text);
  return <Tag className={className}>{rendered}</Tag>;
}
