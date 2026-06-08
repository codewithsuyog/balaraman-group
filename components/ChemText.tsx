'use client';

import React from 'react';

/**
 * Renders text with proper chemical subscripts/superscripts.
 * 
 * Handles:
 *   - Chemical formulas: H2, CO2, H2O, CH4, NH3, SiO2, Cu2O, Fe3O4, NaBH4, Al2O3, etc.
 *   - Orbital notation: C(sp2), C(sp3)
 *   - Roman numeral oxidation states in titles: Mn(I), Co(II), Pd(ii), Ni(ii), Ru(II), Fe(III)
 *   - Greek letters already present as unicode are left as-is (α, β, γ)
 */

// Match chemical formulas like H2, CO2, H2O, SiO2, Cu2O, Fe3O4, NaBH4, CH3OH, etc.
// Pattern: element symbols followed by digits that should be subscripted
// Also matches sp2, sp3 orbital notation for superscript
const CHEM_REGEX = /(\b(?:H|C|N|O|S|P|B|F|Li|Na|K|Mg|Ca|Al|Si|Ti|Mn|Fe|Co|Ni|Cu|Zn|Pd|Ru|Rh|Ir|Pt|Ce|Zr|Mo|Cl|Br|I)(\d+)(?=[^a-zA-Z0-9]|$))|(\bsp(\d)\b)|(C\(sp([23])\))/g;

// Match roman numeral oxidation states: (I), (II), (III), (IV), (V), (i), (ii), (iii), (iv), (v)
const ROMAN_REGEX = /\(([IVXivx]+)\)/g;

function processChemText(text: string): React.ReactNode[] {
  if (!text) return [];
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Combined regex that matches all patterns we care about
  const combined = new RegExp(
    // Chemical formula: element + digit (H2, CO2, etc.)
    '(?:(?<=^|[^a-zA-Z])(?:H|C|N|O|S|P|B|F|Li|Na|K|Mg|Ca|Al|Si|Ti|Mn|Fe|Co|Ni|Cu|Zn|Pd|Ru|Rh|Ir|Pt|Ce|Zr|Mo|Cl|Br|I))(\\d+)(?=[^a-zA-Z0-9]|$)' +
    // sp orbital notation: sp2, sp3
    '|\\b(sp)(\\d)\\b' +
    // C(sp2), C(sp3) full notation
    '|(C\\(sp)([23])(\\))' +
    // Oxidation state in parens: (II), (ii), etc. — leave as-is, just style nicely
    '',
    'g'
  );
  
  // Simpler approach: use replace with a function to build the output
  // Split text by recognized patterns and reconstruct with React elements
  
  // We'll do a multi-pass approach for clarity
  return renderWithSubs(text);
}

function renderWithSubs(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;
  
  // Pattern to find chemical numbers that should be subscripts
  // This regex looks for common chemical element symbols followed by a number
  const chemPattern = /((?:CH|CO|Cl|Br|Na|Li|Ca|Mg|Al|Si|Ti|Mn|Fe|Co|Ni|Cu|Zn|Pd|Ru|Rh|Ir|Pt|Ce|Zr|Mo|NaBH|HClO|H|C|N|O|S|P|B|F|I)(?=[0-9]))(\d+)/g;
  
  // Pattern for C(sp2), C(sp3) - the number should be superscript
  const spPattern = /(C\(sp)(\d)(\))/g;
  
  // First handle C(sp2/3) patterns
  let processedParts: { text: string; isProcessed: boolean }[] = [{ text: remaining, isProcessed: false }];
  
  // Process sp notation
  const newParts: { text: string | React.ReactNode; isProcessed: boolean }[] = [];
  for (const part of processedParts) {
    if (part.isProcessed) {
      newParts.push(part);
      continue;
    }
    
    const splits = part.text.split(/(C\(sp\d\))/g);
    for (const s of splits) {
      const spMatch = s.match(/^C\(sp(\d)\)$/);
      if (spMatch) {
        newParts.push({
          text: s, // Will be handled in final render
          isProcessed: false,
        });
      } else {
        newParts.push({ text: s, isProcessed: false });
      }
    }
  }
  
  // Now do the final render
  const finalText = remaining;
  
  // Use a single comprehensive regex approach
  // Pattern groups:
  // 1. C(sp2) or C(sp3) → superscript the digit
  // 2. Chemical formulas → subscript the digit
  const masterPattern = /C\(sp([23])\)|((?:CH|CO|Cl|Br|Na|Li|Ca|Mg|Al|Si|Ti|Mn|Fe|Co|Ni|Cu|Zn|Pd|Ru|Rh|Ir|Pt|Ce|Zr|Mo|NaBH|HClO|HZSM|H|C|N|O|S|P|B|F|I)(?=[0-9]))(\d+)/g;
  
  let match: RegExpExecArray | null;
  let lastIdx = 0;
  
  while ((match = masterPattern.exec(finalText)) !== null) {
    // Add text before this match
    if (match.index > lastIdx) {
      result.push(finalText.slice(lastIdx, match.index));
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
    
    lastIdx = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIdx < finalText.length) {
    result.push(finalText.slice(lastIdx));
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
