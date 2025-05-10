'use client';
import React, { useState } from 'react';
import styles from './BitwiseOperators.module.scss';

export default function BitwiseOperators() {
  const operations = [
    { name: 'Bitwise AND',   symbol: '&',    a: '0101', b: '0011', result: '0001' },
    { name: 'Bitwise OR',    symbol: '|',    a: '0101', b: '0011', result: '0111' },
    { name: 'Bitwise XOR',   symbol: '^',    a: '0101', b: '0011', result: '0110' },
    { name: 'Bitwise NOT',   symbol: '~',    a: '0101', b: null,   result: '1010' },
    { name: 'Left Shift',    symbol: '<< 1', a: '1011', b: null,   result: '0110' },
    { name: 'Right Shift',   symbol: '>> 1', a: '1011', b: null,   result: '0101' },
  ];

  // state for hover highlighting and for which operation is playing
  const [hover, setHover] = useState(null);
  const [playingOp, setPlayingOp] = useState(null);

  return (
    <div className={styles.bitwiseOperators}>
      {operations.map((op, opIndex) => {
        const isPlaying = playingOp === opIndex;
        // snippet text: either "x & y" or "~ x"
        const snippet = op.b !== null
          ? `x ${op.symbol} y`
          : `${op.symbol} x`;

        return (
          <div
            key={opIndex}
            className={[
              styles.bitwiseOperators__operation,
              isPlaying && styles.playing
            ].filter(Boolean).join(' ')}
            onMouseLeave={() => setHover(null)}
          >
            <div className={styles.bitwiseOperators__header}>
              <div className={styles.bitwiseOperators__title}>
                {op.name}
                {op.symbol && <span> ({op.symbol})</span>}
              </div>
              <button
                className={styles.playButton}
                onClick={() => setPlayingOp(isPlaying ? null : opIndex)}
              >
                {isPlaying ? 'Reset' : 'Play'}
              </button>
            </div>

            <pre className={styles.bitwiseOperators__snippet}>
              <code>{snippet}</code>
            </pre>

            {/* Left operand row */}
            <div className={styles.bitwiseOperators__row}>
              <span className={styles.bitwiseOperators__rowLabel}>
                {op.b !== null ? 'Input x:' : 'Input:'}
              </span>
              {op.a.split('').map((bit, i) => {
                const highlight = hover?.op === opIndex && hover.bit === i;
                return (
                  <span
                    key={i}
                    className={[
                      styles.bitwiseOperators__bit,
                      highlight && styles['bitwiseOperators__bit--highlight']
                    ].filter(Boolean).join(' ')}
                    onMouseEnter={() => setHover({ op: opIndex, bit: i })}
                  >
                    {bit}
                  </span>
                );
              })}
            </div>

            {/* Right operand row, if any */}
            {op.b !== null && (
              <div className={styles.bitwiseOperators__row}>
                <span className={styles.bitwiseOperators__rowLabel}>Input y:</span>
                {op.b.split('').map((bit, i) => {
                  const highlight = hover?.op === opIndex && hover.bit === i;
                  return (
                    <span
                      key={i}
                      className={[
                        styles.bitwiseOperators__bit,
                        highlight && styles['bitwiseOperators__bit--highlight']
                      ].filter(Boolean).join(' ')}
                      onMouseEnter={() => setHover({ op: opIndex, bit: i })}
                    >
                      {bit}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Result row */}
            <div className={[
                styles.bitwiseOperators__row,
                styles['bitwiseOperators__row--result']
              ].join(' ')}
            >
              <span className={styles.bitwiseOperators__rowLabel}>Result:</span>
              {op.result.split('').map((bit, i) => {
                const highlight = hover?.op === opIndex && hover.bit === i;
                return (
                  <span
                    key={i}
                    className={[
                      styles.bitwiseOperators__bit,
                      highlight && styles['bitwiseOperators__bit--highlight']
                    ].filter(Boolean).join(' ')}
                    onMouseEnter={() => setHover({ op: opIndex, bit: i })}
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
